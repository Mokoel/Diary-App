

import express from "express";
import todoSchema from "../model/todoModel.js";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();



//2. (투두) find해서 리스트로 보이게.
router.post("/find", async (req, resp) => {
    //받아올 바디값 :  등록날짜 , 이메일
    let { date, email, tag } = req.body;

    try {
        let findDiaryData = await todoSchema.find({ email }).sort({ date }).lean();
        
        resp.status(200).json({ result: true, data: findDiaryData });

    } catch (err) {
        resp.status(400).json({ result: false, message: "작성된 글을 찾아올 수 없습니다." });
    }
})



//4.날짜별로 find
router.post("/date", async (req, resp) => {
    console.log(req.body)
    let { date, email } = req.body;
    let newDate = new Date(date)
    try {
        let date = await todoSchema.find({ email : email }).where("date").in(newDate);
        resp.status(200).json({ result: true, data: date });

    } catch (err) {
        resp.status(400).json({ result: false });
    }
})



//글등록
//경로:/api/todo/create
router.post("/create", async (req, resp) => {
    console.log(req.body, "<==")
    console.log(req.body.image, "<==createBody")
    let recordData = {
        email: req.body.email,
        todoContent: req.body.todoContent,
        nickname: req.body.nickname,
        date: req.body.date,
        chk: req.body.chk
    }

    try {
        let createData = await todoSchema.create(recordData);
        resp.status(200).json({ result: true, message: "등록에 성공하였습니다.", data: createData });

    } catch (err) {
        resp.status(400).json({ result: false, message: "등록에 실패하였습니다." });
        console.log(err)
    }
});


//삭제
//경로:/api/todo/delete
router.post("/delete", async (req, resp) => {
    console.log(req.body)
    let { _id } = req.body;
    try {
        let deleteData = await todoSchema.deleteOne({ _id });
        resp.status(200).json({ result: true,  message: "삭제에 성공하였습니다.", data: deleteData })
    } catch (err) {
        resp.status(400).json({ result: false, message: "삭제에 실패하였습니다." })
        console.log(err)
    }
})



export default router;
