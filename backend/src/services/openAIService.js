//backend/src/services/openAIService.js
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();


const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const sendToOpenAI = async (messages) => {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages
  });

  return response.choices[0].message.content;
};