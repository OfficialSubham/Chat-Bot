import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017", {
      dbName: "chat-bot",
    })
    .then(() => {
      console.log("connected to DataBase");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectDB;
