export default function ChatMessage({
    sender,
    text,
    mode
}: {
    sender: "user" | "ai";
    text:string;
    mode: "reflect" | "focus";
}) {
    const isUser = sender === "user";

    const userMessageColor = 
        mode === "reflect"
            ? "bg-blue-500 text-white"
            : "bg-purple-500 text-white";

    return(
        <div className= {`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
            <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                isUser 
                    ? `${userMessageColor} rounded-br-none` 
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
            }`}>
            {text}
            </div>

        </div>
    );
}
