import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reflectiveRoutes from "./routes/reflect.js";
import focusRoutes from "./routes/focus.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "*", methods: ["GET","POST","PUT","DELETE"] }));
app.use(express.json());

// Load your new route files
app.use("/api/reflective", reflectiveRoutes);
app.use("/api/focus", focusRoutes);

export default app;
