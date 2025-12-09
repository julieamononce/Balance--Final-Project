import reflectivePrompt from "../prompts/reflectPrompts.js";
import { sendToOpenAI } from "../services/openAIService.js";

export const handleReflectChat = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: "Missing messages array" });
    }

    // Insert system prompt as the first message
    const formattedMessages = [
      { role: "system", content: reflectivePrompt },
      ...messages
    ];

    const reply = await sendToOpenAI(formattedMessages);

    return res.json({ reply });

  } catch (err) {
    console.error("Reflect Mode Error:", err);
    return res.status(500).json({ error: "Reflect mode failed" });
  }
};
