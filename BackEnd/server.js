import { app } from "./app.js";
import connectDB from "./data/database.js";
import { configDotenv } from "dotenv";
configDotenv({path: "./data/config.env"})
connectDB()

app.listen(5000, () => {
    console.log("serverStarted");
})
  