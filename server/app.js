
import express from "express";
import morgan from "morgan";
// 몽구스 불러오기
import mongoose from "mongoose";
import cors from "cors";
//라우터 불러오기
import account from "./router/account.js"
import diary from "./router/diary.js"

import dotenv from "dotenv";
dotenv.config();

const app = express();

//몽고
const uri = process.env.MONGODB_URI
mongoose.connect(uri,{dbName:"Diary"});


app.use(morgan("[server] :method :url : status (:response-time ms)"));

//바디설정
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//코스 오류방지
app.use(cors());


app.use("/storage",express.static("storage"));

//경로 불러오기
app.use("/api/account", account)
app.use("/api/diary", diary)

app.listen(8080,()=>{
    console.log("ServerStart--!")
})