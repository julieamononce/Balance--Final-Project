import ChatMessage from "./ChatMessage";

export default function MessageList({ messages }: { messages: any[] }) {
    return (
    <div className="flex flex-col h-full overflow-y-auto pr-2">
        {messages.map((msg, index) => (
        <ChatMessage
        key={index}
        sender={msg.sender}
        text={msg.text}
        />
        ))}
    </div>
    );
}
