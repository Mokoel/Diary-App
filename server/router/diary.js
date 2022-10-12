

import express from "express";
import diarySchema from "../model/diaryModel.js";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();



//1. 이미지 등록
router.post("/img/:fileName", (req, resp) => {
    console.log(req.headers["content-type"]);
    const base = path.resolve();

    const wsStream = fs.createWriteStream(path.join(base, "storage", "img", req.params.fileName ));

    req.pipe(wsStream);
    
    try{

        resp.json({result:true, path:"http://192.168.4.93:8080/storage/img/" + req.params.fileName});

    }catch(err){
        resp.json({result:false , msg:"사진 등록에 실패했습니다."})
    }

})




//2. (다이어리) find해서 리스트로 보이게.
router.post("/find", async (req, resp) => {
    //받아올 바디값 :  등록날짜 , 이메일
    let { chooseDate, email, tag } = req.body;


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

//4.날짜별로 find
router.post("/date",async (req,resp)=>{
    let {date,email} = req.body;

    try{
        let date = await diarySchema.find({email}).where("date").in({date});
        resp.status(200).json({result: true, data: date});

    }catch(err){
        resp.status(400).json({result: false});
    }
    
})



//글등록
//경로:/api/diary/create
router.post("/create", async (req, resp) => {
console.log(req.body,"<==")
    console.log(req.body.image,"<==createBody")
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


//수정하기
router.post("/update", async (req, resp) => {
    // 키값으로 _id
    let { _id } = req.body;
    console.log(req.body)
    console.log(_id)
    try {

        let update = await diarySchema.findByIdAndUpdate(_id, { content: req.body.content, image: req.body.image, emoji: req.body.emoji, chooseDate: req.body.chooseDate, tag: req.body.tag }, { returnDocument: "after" })
        console.log(update)
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
