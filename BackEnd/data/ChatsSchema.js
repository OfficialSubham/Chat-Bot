import mongoose, { Schema } from "mongoose";

const ChatSchema = new Schema({
    "user": mongoose.Schema.Types.ObjectId,
    "User-Message": String,
    "AI-Message": String,
    Date: {type: Date, default: Date.now}
}) 

const ChatModel = mongoose.model("usermessage", ChatSchema);

export default ChatModel;