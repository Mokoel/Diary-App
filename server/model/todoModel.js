import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    email: {type:String, lowercase: true },
    todoContent: { type: String, required: true},
    nickname: { type: String, required: true },
    date: Date,
    chk : Boolean
});

export default mongoose.model("todo", todoSchema);