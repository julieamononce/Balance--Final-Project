import { useState, useRef, useEffect } from "react";

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex items-centered gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-200">

      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholderText}
        className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 resize-none min-h-[20px] max-h-[120px] overflow-y-auto"
        rows={1}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />

      {mode === "focus" && (
        <button
          onClick={() => {/* Handle file upload */}}
          className="p-3 rounded-xl bg-white-100 hover:bg-purple-300 transition"
          title="Upload file"
        >
          <img src="/linkicon.png" alt="Upload" className="w-9 h-9" />
        </button>
      )}

      <button
        onClick={handleSend}
        className={`p-3 rounded-xl transition ${
          mode === "reflect" 
            ? "bg-white-400 hover:bg-blue-400" 
            : "bg-white-400 hover:bg-purple-400"
            
        }`}
      >
        {mode === "focus" ? (
          <img src="/focussend.png" alt="Send" className="w-9 h-9" />
        ) : (
          <img src="/reflectsend.png" alt="Send" className="w-9 h-9" />
        )}
      </button>

    </div>
  );
}
