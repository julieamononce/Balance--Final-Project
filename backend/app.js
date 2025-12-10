import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route imports
import reflectRoutes from "./src/routes/reflect.js";
import focusRoutes from "./src/routes/focus.js";
import chatRoutes from "./src/routes/chat.js";
import calendarRoutes from "./src/routes/calendar.js";





// Mount routes
app.use("/api/reflect", reflectRoutes);
app.use("/api/focus", focusRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/calendar", calendarRoutes)
// Export app for server.js
export default app;
