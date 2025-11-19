import React, { useState } from "react";

export default function FocusChat() {
//Welcome container and fade out behavior
    const [showWelcome, setShowWelcome] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

//Messages (user and ai) and input
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{ sender: string; text:string} []>([]);

    const sendMessage = () =>{
        if (!input.trim())return;

        //Adding user message to the chat list
        setMessages((prev) => [...prev, {sender: "user", text: input}]);

        //clear the input box once we have sent the message
        setInput("")

        //Fade out the welcome container on the first message
        if (showWelcome) {
            setFadeOut(true);
            setTimeout(() => {
                setShowWelcome(false);
            }, 400);
        }

        //AI Response
        setTimeout(() => {
    setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "This is a test AI reply!" }
    ]);
}, 600);
    };

    //Uploading stuff from computer
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleUploadClick = () => {
    if (fileInputRef.current) {
        fileInputRef.current.click();
    }
};
    //History Button Stuff
    const [showHistory, setShowHistory] =useState(false);

    return (
    <div style={pageStyle}>

        {/* Title*/}
        <h1 style={titleStyle}>FOCUS MODE</h1>
        <div style = {historyButton} onClick={()=> setShowHistory(!showHistory)}>
            🕓
        </div>

        {showHistory && (
            <div style = {historyPanel}>
                <h2 style={{ color: "black"}}> History</h2>

                {/*Example items for now!!!*/}
                <div style = {historyItem}>Convo 1</div>
                <div style = {historyItem}>Convo 2</div>
                <div style = {historyItem}>Convo 3</div>
                </div>
        )}


        {/* chat area*/}
        <div style = {chatBoxStyle}>        
            {/*Welcome box */}
        {showWelcome && (
            <div 
                style={{
                    ...welcomeWrapper,
                    opacity: fadeOut ? 0 : 1,
                    transition: "opacity 0.4s ease"
                }}
                >
                <div style={welcomeContainer}>
                    <div style={icon}>📘</div>
                    <h2 style={welcomeTitle}>Hi, what would you like to work on?</h2>
                    <p style={welcomeText}>
                        Share your notes, assignments, or study goals. Let's organize your work together.
                    </p>
                </div>
            </div>
        )}

            {/* User and AI messages */}
            {messages.map((msg, index) => (
                <div key={index} style = {msg.sender=="user" ? userBubbleStyle : aiBubbleStyle}>
                    {msg.text}
                </div>
            ))}
            
        </div>


        {/*Input row (not functional yet) */}
        <div style={inputRowStyle}>
            <div style ={uploadButtonStyle} onClick={handleUploadClick}>
                📎
                </div>

                {/*Hidden file input? */}
                <input
                type = "file"
                style={{display: "none"}}
                ref={fileInputRef}
                />
            <input
                style={inputStyle}
                placeholder="Type a message..."
                value = {input}  //shows current input
                onChange={(e) => setInput(e.target.value)} //updates input
                onKeyDown={(e) => {
                    if(e.key === "Enter"){
                        sendMessage();
                    }
                }}
            />

            <button style ={buttonStyle}
            onClick={sendMessage}>
                Send!
                </button>

        </div>

    </div>
    );
}


const pageStyle ={
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    background: "#F5F6F9",
    color: "white",
    margin: 0,
    padding: 0,
    overflow: "hidden",
} as React.CSSProperties;

const titleStyle = {
    padding: "12px 16px",
    margin:0,
    fontSize: "22px",
    color:"black",
} as React.CSSProperties;

const chatBoxStyle ={
    flex:1,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    gap: "10px",
    padding:"10px",
    background:"#D5D5E5",
    borderRadius: "8px",

} as React.CSSProperties;

const userBubbleStyle = {
    alignSelf: "flex-end",
    background: "#DCF8C6",
    padding: "10px 14px",
    borderRadius: "10px",
    maxWidth: "10%",
    color: "black",
} as React.CSSProperties;


const aiBubbleStyle = {
    alignSelf: "flex-start",
    background: "rgba(164, 151, 233, 0.54)",
    padding: "10px 14px",
    borderRadius: "10px", 
    maxWidth: "70%",
    color: "black",
} as React.CSSProperties;

const inputRowStyle = {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
} as React.CSSProperties;

const inputStyle ={
    flex:1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
} as React.CSSProperties;

const buttonStyle = {
    background: "#4A90E2",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
} as React.CSSProperties;


const welcomeContainer = {
    width: "70%",
    maxWidth: "700px",
    margin: "10px auto",
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
} as React.CSSProperties;

const icon = {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "#E6F0FF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "30px",
    margin: "0 auto 20px auto",
} as React.CSSProperties;

const welcomeTitle = {
    margin: "0 0 12px 0",
    fontSize: "22px",
    fontWeight: 600,
    color: "#333",
} as React.CSSProperties;

const welcomeText = {
    margin: 0,
    fontSize: "15px",
    color: "#555",
} as React.CSSProperties;

const welcomeWrapper = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: "30px",     // pushes the card down
    paddingBottom: "20px",
} as React.CSSProperties;


const uploadButtonStyle = {
    width: "40px",
    height:"40px",
    borderRadius: "50%",
    background: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #ccc",
    cursor: "pointer",
    fontSize: "20px",
    color: "#4A90E2",
} as React.CSSProperties;


const historyButton = {
    position: "absolute",
    top: "7px",
    right: "16px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "white",
    border: "1px solid #ccc",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    color: "#4A90E2",
    zIndex: 20,
} as React.CSSProperties;

const historyPanel = {
    position: "absolute",
    top:0,
    right:0,
    width: "260px",
    height: "100vh",
    background: "white",
    boxShadow: "-2px 0 8px rgba(0,0,0,0.1)",
    padding: "20px",
    zIndex: 15,
    overflowY: "auto",
    transition: "transform 0.5s ease",
} as React.CSSProperties;

const historyItem = {
    padding: "10px",
    background: "#F0F0F0",
    borderRadius: "8px",
    marginBottom: "10px",
    color: "black",
    cursor: "pointer",
} as React.CSSProperties;


