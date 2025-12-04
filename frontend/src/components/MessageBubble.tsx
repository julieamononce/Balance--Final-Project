import React from "react";

interface MessageBubbleProps{
    sender:"user" | "ai";
    text:string;
}

export default function MessageBubbles({sender, text}: MessageBubbleProps){
    const isUser = sender === "user";

    return(
        <div className={`max-w-[80%] px-5 py-3 rounded-2xl shadow-sm
        ${isUser ?
            "ml-auto bg-gradient-to-r from-purple-400 to-purple-300 text-white shadow-md" :
            "mr-auto bg-white border border-gray-200 text-gray-700 shadow-sm"
        }
        `}
        style={{
        whiteSpace: "pre-line" // preserves line breaks for AI messages
        }}
    >
        {text}

        </div>
    );
}
