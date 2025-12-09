import focusPrompt from "../prompts/focusPrompts.js";
import { sendToOpenAI } from "../services/openAIService.js";

export const handleFocusChat = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: "Missing messages array" });
    }

    // Insert system prompt at top
    const formattedMessages = [
      { role: "system", content: focusPrompt },
      ...messages
    ];

    const reply = await sendToOpenAI(formattedMessages);

    return res.json({ reply });

  } catch (err) {
    console.error("Focus Mode Error:", err);
    return res.status(500).json({ error: "Focus mode failed" });
  }
};
