import focusPrompt from "../prompts/focusPrompts.js";
import { sendToOpenAI } from "../services/openAIService.js";

export const handleFocusChat = async (req, res) => {
  try {
    const { message } = req.body;

    const prompt = `${focusPrompt}\n\nUser: ${message}\nAI:`;
    const reply = await sendToOpenAI(prompt);

    return res.json({ reply });

  } catch (err) {
    console.error("Focus Mode Error:", err);
    return res.status(500).json({ error: "Focus mode failed" });
  }
};
