import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    email : {type : String , unique : true},
    password : String,
    nickname : {type : String },
});

export default mongoose.model("account", accountSchema);