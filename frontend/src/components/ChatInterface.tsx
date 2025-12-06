import { useState, useEffect, useRef } from "react";
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
  
  const iconmode =
    mode === "reflect"
      ? "/reflecticon.png"
      : "/focusicon.png";


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
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Entrance animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const greetingText =
    mode === "reflect"
      ? "Hi! I'm here to listen. How are you feeling today?"
      : "Hi! Ready to study? Share your notes or ask me anything.";  

  const handleSend = (text: string) => {
    if (messages.length === 0) {
      // Trigger animation
      setIsAnimating(true);
      // Add message after animation delay
      setTimeout(() => {
        const newMessage = { sender: "user", text };
        setMessages((prev) => [...prev, newMessage]);
      }, 500);
    } else {
      const newMessage = { sender: "user", text };
      setMessages((prev) => [...prev, newMessage]);
    }
  };
;


  return (
    <div className={`min-h-screen ${backgroundGradient} p-6 flex flex-col`}>
      
      {/*  Top Bar  */}
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

      {/* Chat Layout  */}
      <div className="flex h-full gap-6 p-6">
        <div className="flex flex-col flex-1 bg-white/90 rounded-3xl shadow-xl p-6">
          {/* Greeting */}
          {messages.length === 0 ? (
            <div className={`h-full flex items-start justify-center animate-scale-in transition-all duration-500 ${
              isAnimating 
                ? '-translate-y-8 opacity-0' // Exit animation
                : hasEntered 
                  ? 'pt-8' // Final position after entrance
                  : '-translate-y-4 opacity-0 pt-8' // Initial position for entrance
            }`}>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <img src={iconmode} alt="mode icon" className="w-13 h-13" />
                </div>
                <p className="text-foreground/80 text-lg px-6">
                  {greetingText}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto mb-4 max-h-[60vh]">
              <MessageList messages={messages} />
              <div ref={messagesEndRef} />
            </div>
          )}

          <ChatInput onSend={handleSend} placeholderText={placeholderText} mode={mode} />

        </div>

        <HistoryList mode={mode} />
      </div>

    </div>
  );
}
