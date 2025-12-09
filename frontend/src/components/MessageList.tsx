import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

export default function MessageList({ messages, mode }: { messages: any[], mode: "reflect" | "focus" }) {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
    <div ref={containerRef} className="flex flex-col h-full overflow-y-auto pr-2">
        {messages.map((msg, index) => (
        <ChatMessage
        key={index}
        sender={msg.sender}
        text={msg.text}
        mode={mode}
        canvasData={msg.canvasData}
        />
        ))}
        <div ref={messagesEndRef} />
    </div>
    );
}
