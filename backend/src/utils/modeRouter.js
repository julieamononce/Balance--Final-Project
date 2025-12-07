import reflectivePrompt from "../prompts/reflectPrompts.js";
import focusPrompt from "../prompts/focusPrompts.js";

export function getSystemPrompt(mode) {
  if (mode === "reflect") return reflectivePrompt;
  if (mode === "focus") return focusPrompt;
  throw new Error("Invalid mode");
}
