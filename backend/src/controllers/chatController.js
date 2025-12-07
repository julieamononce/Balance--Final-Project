import { getSystemPrompt } from "../utils/modeRouter.js";
import { sendToOpenAI } from "../services/openAIService.js";

export const sendChatReply = async (req, res) => {
  try {
    const { message, mode } = req.body;

    if (!message || !mode) {
      return res.status(400).json({ error: "Missing message or mode" });
    }

    // Prepare system prompt
    const systemPrompt = getSystemPrompt(mode);

    const fullPrompt = `${systemPrompt}\n\nUser: ${message}\nAI:`;

    const reply = await sendToOpenAI(fullPrompt);

    return res.json({ reply });

  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to process chat" });
  }
};

