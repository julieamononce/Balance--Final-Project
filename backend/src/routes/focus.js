import express from "express";
import { processFocusMessage } from "../controllers/focusController.js";

const router = express.Router();

router.post("/", processFocusMessage);

export default router;
