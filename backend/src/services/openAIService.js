import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();


const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const sendToOpenAI = async (prompt) => {
  console.log('Sending prompt to OpenAI:', prompt.substring(0, 100) + '...');
  
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  const reply = response.choices[0].message.content;
  console.log('OpenAI reply:', reply);
  
  return reply;
};