import express from "express";
import { handleJournalEntry, generateInsight } from "../controllers/focusController.js";

const router = express.Router();

router.post("/entry", handleJournalEntry);
router.post("/insight", generateInsight);

export default router;
