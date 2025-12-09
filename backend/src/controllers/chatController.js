//backend/src/controllers/chatController.ts

import { getSystemPrompt } from "../utils/modeRouter.js";
import { sendToOpenAI } from "../services/openAIService.js";

export const sendChatReply = async (req, res) => {
  try {
    const { messages, mode } = req.body;

    if (!messages || !mode) {
      return res.status(400).json({ error: "Missing messages or mode" });
    }

    const systemPrompt = getSystemPrompt(mode);

    // Insert system prompt at start (required by OpenAI)
    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages
    ];

    const reply = await sendToOpenAI(formattedMessages);

    return res.json({ reply });

  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({ error: "Failed to process chat" });
  }
};


