export default function ChatMessage({
    sender,
    text,
}: {
    sender: "user" | "ai";
    text:string;
}) {
    const isUser = sender === "user";

    return(
        <div className= {`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
            <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${isUser ? "bg-purple-500 text-white rounded-br-none" : "bg-gray-100 text-gray-800 rounded-bl-none"}`}>
            {text}
            </div>

        </div>
    );
}
