import express from "express";
import { sendChatReply } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", sendChatReply);

export default router;
