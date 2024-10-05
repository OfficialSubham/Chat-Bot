import mongoose from "mongoose";


const connectDB = () => {
  mongoose
    .connect(process.env.DB_URL, {
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
