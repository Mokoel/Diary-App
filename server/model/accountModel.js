import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    email : {type : String , unique : true, trim:true},
    password : String,
    nickname : {type : String, unique : true },
});

export default mongoose.model("account", accountSchema);