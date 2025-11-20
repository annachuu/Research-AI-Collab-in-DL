import React, { useState } from "react";
import styles from "./Chat.module.css";

const User_Colours = 
[
    "#a6cee3",  // 1st user
    "#1f78b4",  // 2nd user
    "#b2df8a",  // 3rd user
    "#33a02c",  // 4th user
    "#fb9a99",  // 5th user
    "#e31a1c",  // 6th user
    "#fdbf6f",  // 7th user
    "#ff7f00",  // 8th user
    "#cab2d6",  // 9th user
    "#6a3d9a"   // 10th user
];

function ChatComponent ({ currentUserIndex = 0 })
{
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const sendMessage = () =>
    {
        if (input.trim() === "")
            return;

        const newMsg = 
        {
            userIndex: currentUserIndex,
            text: input,
            timestamp: new Date().toLocateTimeString()
        };

        setMessages(prev => [...prev, newMsg]);
        setInput("");
    };

    return (
        <div className={styles.chatContainer}>
            <h3 className={styles.title}>Chat</h3>

            <div className={styles.messagesBox}>
                {messages.map((msg, i) => 
                (
                    <div
                        key={i}
                        className={styles.message}
                        style={{borderLeftColor: User_Colours[msg.currentUserIndex]}}
                    >
                        <span className={styles.text}>{msg.text}/</span>
                        <span className={styles.text}>{msg.timestamp}/</span>
                    </div>
                ))}
            </div>

            <div className={styles.inputRow}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />

                <button className={styles.sendBtn} onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatComponent;
