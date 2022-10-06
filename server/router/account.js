import express from "express";
import accountSchema from "../model/accountModel.js";


import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
//어카운트에서 해야할 일
//!!이메일 정규식체크

//2.로그인 -> jsonWebtoken 생성 
//그 다음 유효성... 코드 복사할꺼얌

//로그인 경로 => /api/account/auth
router.post("/auth", async (req, resp) => {
    let { email, password } = req.body;

    //아이디 찾아오기.
    let findUserEmail = await accountSchema.findOne({ email });

    //(찾아온 데이터가 있으면)찾아온거에서 비밀번호 맞는지 체크(암호화된거 확인)
    if (findUserEmail) {

        //암호화된거 비교하기
        let pswdChk = bcrypt.compareSync(password, findUserEmail.password);
        
        //비밀번호가 맞으면 -> 토큰생성(암호화키는 lastpass에서 받아옴)
        if (pswdChk) {
            //토큰생성 -> 페이로드는 이메일, 시크릿키
            let token = jwt.sign({ email: findUserEmail }, process.env.SECRET_KEY);

            //[로그인 성공 시]client쪽으로 토큰 보내주기.
            resp.status(200).json({ result: true, message: "로그인에 성공하셨습니다.", token })


            //비밀번호가 틀리면
        } else if (!pswdChk) {
            resp.status(400).json({ result: false, message: "비밀번호를 확인해주세요." })
        }


        //디비에서 이메일 찾기 실패
    } else if (!findUserEmail) {
        resp.status(401).json({ result: false, message: "이메일을 확인하세요" })
    }

});



//3.토큰 유효성 검사 경로 => /api/account/valid 
//앱 실행할 때(useEffect로 해주면 될 듯) 토큰이 훼손되지 않았는지 확인
router.post("/valid", async (req, resp) => {
    try {
        const data = jwt.verify(req.body.token, process.env.SECRET_KEY);
        resp.status(200).json({ result: true, email: data.email });
    } catch (err) {
        resp.status(401).json({ result: false, message: err.message });
    }
});



//1. 회원가입
//(비밀번호 암호화 후 몽고에 저장)
//회원가입 경로 => /api/account/register
router.post("/register", async (req, resp) => {
    let pswd = req.body.password;
    //bcrypt로 비밀번호 암호화
    const hashingPassword = bcrypt.hashSync(pswd, 10);

    const userInfo = {
        email: req.body.email,
        password: hashingPassword,
        nickname: req.body.nickname
    }

    try {
        let createUserInfo = await accountSchema.create(userInfo);
        resp.json({ result: true, message: createUserInfo });

    } catch (err) {
        resp.json({ result: false, message: "회원가입에 실패하였습니다." })
        console.log(err)
    }
});



//4.탈퇴하기 => /api/account/delete
router.post("/delete", async (req, resp) => {
    //1. email, password 받아오기.
    let { email, password } = req.body;

    //2. email로 어카운트 데이터 가져와주기.
    let findData = await accountSchema.findOne({ email });
    console.log(findData)
    //3. password 체크해주기.
    let pswdChk = bcrypt.compareSync(password, findData.password);
    //4. (패스워드 맞으면)account DB에서 delete 해주기.
    if (pswdChk) {
        let accountDel = await accountSchema.deleteOne({ email });
        resp.status(200).json({ result: true, message: "탈퇴에 성공했습니다." })
    } else {
        resp.status(400).json({ result: false, message: "탈퇴에 실패했습니다." })
    }

})


export default router;
