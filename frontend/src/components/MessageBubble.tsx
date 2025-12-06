import React from "react";

interface MessageBubbleProps{
    sender:"user" | "ai";
    text:string;
    mode: "reflect" | "focus";
}

export default function MessageBubbles({sender, text, mode}: MessageBubbleProps){
    const isUser = sender === "user";

    const userMessageColor = 
        mode === "reflect"
            ? "bg-gradient-to-r from-blue-300 to-blue-200 text-white"
            : "bg-gradient-to-r from-purple-300 to-purple-200 text-white";

    return(
        <div className={`max-w-[80%] px-5 py-3 rounded-2xl shadow-sm
        ${isUser ?
            `ml-auto ${userMessageColor} shadow-md` :
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
