const { getSystemPrompt } = require("./utils/modeRouter");
const OpenAI = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
