const reflectivePrompt = require("../../prompts/reflective");
const focusPrompt = require("../../prompts/focus");

function getSystemPrompt(mode) {
  if (mode === "reflective") return reflectivePrompt;
  if (mode === "focus") return focusPrompt;
  throw new Error("Invalid mode chosen.");
}

module.exports = { getSystemPrompt };
