import { useState } from "react";

export default function ChatInput({
  onSend,
  placeholderText,
  mode
}: {
  onSend: (msg: string) => void;
  placeholderText: string;
  mode: "reflect" | "focus";
}) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-gray-200">

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholderText}   // ⭐ DYNAMIC PLACEHOLDER
        className="flex-1 bg-transparent outline-none text-white-700 placeholder-gray-400"

        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
          }
        }}
      />

      <button
        onClick={handleSend}
        className={`p-3 rounded-xl transition ${
          mode === "reflect" 
            ? "bg-blue-400 hover:bg-blue-500" 
            : "bg-purple-400 hover:bg-purple-500"
            
        }`}
      >
        Send
      </button>

    </div>
  );
}
