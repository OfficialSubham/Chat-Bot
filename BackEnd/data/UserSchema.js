import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: String,
    username: String,
    auth:{
        type: Boolean, default: false
    },
    email: String,
    date: {type: Date, default: Date.now}
})

const UserData = mongoose.model("chatUsers", UserSchema);

export default UserData;