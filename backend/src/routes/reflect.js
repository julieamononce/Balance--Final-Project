import express from "express";
import { handleJournalEntry } from "../controllers/reflectController.js";

const router = express.Router();

router.post("/", handleJournalEntry);

export default router;
