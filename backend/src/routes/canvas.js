import express from "express";
import { 
    saveCanvasToken, 
    saveCanvasCredentials,
    checkCanvasStatus 
} from "../controllers/canvasController.js";

const router = express.Router();

// Test endpoint to verify routing works
router.get("/test", (req, res) => {
    console.log("Canvas route test hit!");
    res.json({ message: "Canvas routes working!" });
});

// POST /api/canvas/credentials - Save user's Canvas API token and course ID (new simplified approach)
router.post("/credentials", saveCanvasCredentials);

// POST /api/canvas/token - Save user's Canvas API token (legacy)
router.post("/token", saveCanvasToken);

// POST /api/canvas/status - Check if user has Canvas token configured
router.post("/status", checkCanvasStatus);

export default router;