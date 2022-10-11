import mongoose from "mongoose";

const diarySchema = new mongoose.Schema({
    email: {type:String, lowercase: true },
    content: { type: String, required: true},
    nickname: { type: String, required: true },
    image: String, 
    emoji: String,
    chooseDate: Date,
    createdAt: Date,
    tag: {type:Array, trim:true}
});

export default mongoose.model("diary", diarySchema);