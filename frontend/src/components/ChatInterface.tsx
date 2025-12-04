import { useState } from "react";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import HistoryList from "./HistoryList";
import { useNavigate } from "react-router-dom";

interface ChatInterfaceProps {
  mode: "reflect" | "focus";
  title: string;
  description: string;
}

export default function ChatInterface({ mode, title, description }: ChatInterfaceProps) {
  const navigate = useNavigate();


  const placeholderText =
  mode === "focus"
    ? "How can I help you with your academic success?"
    : "What's on your mind?";

  // ⭐ Tailwind-only gradients — NO custom CSS needed
  const backgroundGradient =
    mode === "reflect"
      ? "bg-gradient-to-br from-blue-50 via-blue-100 to-white"
      : "bg-gradient-to-br from-purple-100 via-purple-50 to-white";

  // Start with no messages so greeting shows
  const [messages, setMessages] = useState<any[]>([]);

  const greetingText =
    mode === "reflect"
      ? "Hi! I'm here to listen. How are you feeling today?"
      : "Hi! Ready to study? Share your notes or ask me anything.";  

  const handleSend = (text: string) => {
    const newMessage = { sender: "user", text };
    setMessages((prev) => [...prev, newMessage]);
  };
;


  return (
    <div className={`min-h-screen ${backgroundGradient} p-6 flex flex-col`}>
      
      {/* ───────────── Top Bar ───────────── */}
      <div className="flex justify-between items-center mb-6 animate-fade-in">
        
        <div className="flex gap-2">
          <button
            className="border rounded-md px-3 py-2 text-sm hover:shadow-glow transition-all duration-300"
            onClick={() => navigate("/dashboard")}
          >
            Back
          </button>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gradient">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="w-20" />
      </div>

      {/* ───────────── Chat Layout ───────────── */}
      <div className="flex h-full gap-6 p-6">
        <div className="flex flex-col flex-1 bg-white/90 rounded-3xl shadow-xl p-6">

          {/* Greeting */}
          {messages.length === 0 ? (
            <div className="h-full flex items-start justify-center pt-24 animate-scale-in">
              <p className="text-foreground/80 text-lg text-center px-6">
                {greetingText}
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto mb-4">
              <MessageList messages={messages} />
            </div>
          )}

          <ChatInput onSend={handleSend} placeholderText={placeholderText} />

        </div>

        <HistoryList />
      </div>

    </div>
  );
}
