import express from "express";
const router = express.Router();
//importing google AI got from their docs
import { GoogleGenerativeAI } from "@google/generative-ai";
import { isLoggedIn } from "../controllers/UserData.js";
import ChatModel from "../data/ChatsSchema.js";

router.get("/", function (req, res, next) {
  res.send("hello");
});

//wrapping it with try-catch to handle the error if occur

router.get("/gemini", isLoggedIn, async (req, res) => {
  try {
    //assigning gen ai for ai related access the ai
    const genAI = new GoogleGenerativeAI(req.headers.apikey);
    //Giving the api key from header
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-002",
    });
    //defining the model of ai

    const generationConfig = {
      temperature: 1.2,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    //generationConfig got from GEMINI docs

    const chatSession = model.startChat({
      generationConfig
    });
    //defining chatsession to start the chat
    //it gives us response from gemini

    const result = await chatSession.sendMessage(req.body.message);

    //--giving database the messages to save

    const chatData = await ChatModel.create({
      "user": req.userID,
      "User-Message": req.body.message,
      "AI-Message": result.response.candidates[0].content.parts[0].text,
    })

    res.send(chatData);

    //result.response.candidates[0].content.parts[0].text
    //above is the path of the response got from AI


  } catch (error) {
    res.status(500).json({ error });
    //500 for internal error and message of the error
  }
});

export default router;
