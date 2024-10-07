import express from "express";
const router = express.Router();
//importing google AI got from their docs
import { isLoggedIn } from "../controllers/UserData.js";
import { connectGemini, getAllChats } from "../controllers/UserChats.js";

//wrapping it with try-catch to handle the error if occur

router.get("/gemini", isLoggedIn, connectGemini);

router.get("/getallchats", isLoggedIn, getAllChats)

export default router;
