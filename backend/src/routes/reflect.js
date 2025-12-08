import express from "express";
import { handleReflectChat } from "../controllers/reflectController.js";

const router = express.Router();

router.post("/chat", handleReflectChat);

export default router;
