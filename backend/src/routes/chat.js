const { getSystemPrompt } = require("./utils/modeRouter");
const OpenAI = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
import express from "express";
import { sendChatReply } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", sendChatReply);

export default router;
