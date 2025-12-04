import MessageBubble from "../components/MessageBubble.tsx";
import MessageList from "../components/MessageList.tsx";
import ChatInput from "../components/ChatInput.tsx";

export default function ComponentSandbox(){
    const fakeMessages = [
    { sender: "user", text: "Hey there!" },
    { sender: "ai", text: "Hello! How can I help you today?" },
];

return (
    <div className="p-6 space-y-6">
        <h2 className="font-bold text-xl">MessageBubblePreview</h2>
        <MessageBubble sender="user" text="This is a user bubble." />
        <MessageBubble sender="ai" text="This is an AI bubble." />
        <h2 className="font-bold text-xl pt-6">MessageList Preview</h2>
        <div className="border rounded-lg h-64">
            <MessageList messages={fakeMessages} />
        </div>

        <h2 className="font-bold text-xl">MessageList Preview</h2>
        <div className="border rounded-lg h-64">
            <MessageList messages={fakeMessages} />
        </div>

        <h2 className="font-bold text-xl pt-6">ChatInput Preview</h2>
        <ChatInput onSend={(msg) => console.log("sent:", msg)}/>
    </div>

    
)

}