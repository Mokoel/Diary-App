//삭제
//수정
//등록

//넣어줘야하는거.



import express from "express";
import diarySchema from "../model/diaryModel.js";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();


//1. 이미지 등록 -> 테스트 해보기.
router.post("/:fileName", (req, resp) => {
    console.log(req.headers["content-type"]);
    const base = path.resolve();

    const wsStream = fs.createWriteStream(path.join(base, "storage", "img", req.params.fileName ));

    req.pipe(wsStream);

    resp.json({result:true, path:"http://192.168.4.25:8080/storage/img/" + req.params.fileName});

})




//2. (다이어리) find해서 리스트로 보이게.
router.post("/find", async (req, resp) => {
    //받아올 바디값 : 태그값(아직 안 정함), 등록날짜 , 이메일
    let { chooseDate, email, tag } = req.body;

    //tag array로 들어오니까 set함수로 중복값 없애고, 그 갯수가 length가 10이 넘어가면 false. 그럼 글 등록 실패.

    try {
        let findDiaryData = await diarySchema.find({ email }).sort({ chooseDate }).lean();
        resp.status(200).json({ result: true, data: findDiaryData });

    } catch (err) {
        resp.status(400).json({ result: false, message: "작성된 글을 찾아올 수 없습니다." });
    }
})



//3. tagArray find(태그 찾아오기)
router.post("/tagFind", async (req, resp) => {

    let { tag, email } = req.body;

    try {
        let findTag = await diarySchema.find({ email }).where("tag").in([tag]);
        resp.status(200).json({ result: true, data: findTag })

    } catch (err) {
        console.log(err)
    }
})




//글등록
//경로:/api/diary/create
router.post("/create", async (req, resp) => {
    console.log(req.body.image,"<==createBody>")
    let recordData = {
        email: req.body.email,
        content: req.body.content,
        nickname: req.body.nickname,
        image: req.body.image,
        emoji: req.body.emoji,
        chooseDate: req.body.chooseDate,
        createdAt: req.body.createdAt,
        tag: req.body.tag
    }

    try {
        let createData = await diarySchema.create(recordData);
        resp.status(200).json({ result: true, message: "등록에 성공하였습니다.", data: createData });

    } catch (err) {
        resp.status(400).json({ result: false, message: "등록에 실패하였습니다." });
        console.log(err)
    }
});



router.post("/update", async (req, resp) => {
    // 키값으로 _id
    let { _id } = req.body;

    try {

        let update = await diarySchema.findOneAndUpdate(_id, { content: req.body.content, image: req.body.image, emoji: req.body.emoji, chooseDate: req.body.chooseDate, tag: req.body.tag }, { returnDocument: "after" })
        resp.status(200).json({ result: true, message: "수정에 성공하셨습니다.", data: update })

    } catch (err) {
        resp.status(400).json({ result: false, message: "수정에 실패하셨습니다.", })
        console.log(err)
    }

})


//삭제
//경로:/api/diary/delete
router.post("/delete", async (req, resp) => {
    let { _id } = req.body;

    try {
        let deleteData = await diarySchema.deleteOne({ _id });
        resp.status(200).json({ result: true, message: "삭제에 성공하였습니다.", data: deleteData })

    } catch (err) {
        resp.status(400).json({ result: false, message: "삭제에 실패하였습니다." })
        console.log(err)
    }
})


export default router;
