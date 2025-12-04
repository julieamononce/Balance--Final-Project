import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
console.log("Loaded key:", process.env.OPENAI_API_KEY ? "YES" : "NO");

const app = express();
app.use(cors({
  origin: '*', // <--- This allows requests from all origins (safe for local dev)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
   
});


// ---- SIMPLE CHAT ROUTE ----
app.post("/api/chat", async (req, res) => {
  try {
    console.log(`[ROUTE HIT] Processing chat message...`);
    const userMessage = req.body.message;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userMessage }]
    });

    res.json({
      reply: response.choices[0].message.content
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI request failed" });
  }
});

// ---- START SERVER ----
const PORT = 5001;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
