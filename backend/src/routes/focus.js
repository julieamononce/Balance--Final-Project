import express from "express";
import { handleFocusChat } from "../controllers/focusController.js";

const router = express.Router();

router.post("/chat", handleFocusChat);

export default router;
