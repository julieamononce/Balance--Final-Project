import React, { useState } from 'react';
import ChatInterface from "../components/ChatInterface.tsx";
export default function FocusChat() {
    return (
    <div>
        <ChatInterface
            mode="focus"
            title="Focus Mode"
            description="Study assistance and academic organization."
            
        />
        </div>
    );
}