import reflectivePrompt from "../prompts/reflectPrompts.js";
import { sendToOpenAI } from "../services/openAIService.js";

export const handleReflectChat = async (req, res) => {
  try {
    const { message } = req.body;

    const prompt = `${reflectivePrompt}\n\nUser: ${message}\nAI:`;
    const reply = await sendToOpenAI(prompt);

    return res.json({ reply });

  } catch (err) {
    console.error("Reflect Mode Error:", err);
    return res.status(500).json({ error: "Reflect mode failed" });
  }
};
