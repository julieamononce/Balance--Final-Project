import express from "express";
import { createTask, generatePlan } from "../controllers/focusController.js";

const router = express.Router();

router.post("/task", createTask);
router.post("/plan", generatePlan);

export default router;
