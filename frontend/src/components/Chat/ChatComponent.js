import React, { useState, useEffect } from "react";
import styles from "./Chat.module.css";
import axios from 'axios'

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

const backend_url = "http://localhost:5006/api/chat";

// Ensuring each username gets a unique colour, cycling through the 10 colors
const getColorIndexForUsername = (username) =>
{
    if (!username) return 0;
    
    // Hash function to convert username to a colour number
    let hash = 0;
    for (let i = 0; i < username.length; i++)
    {
        const char = username.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Cycle through the 10 colors
    return Math.abs(hash) % User_Colours.length;
};

const chatService = 
{
    fetchMessages: async () =>
    {
        const res = await axios.get(backend_url);
        return res.data;
    },
    sendMessage: async (message) =>
    {
        const res = await axios.post(backend_url, message);
        return res.data;
    }
};

function ChatComponent ({ currentUsername, currentUserIndex = 0 })
{
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    // Getting new message every second
    useEffect(() =>
    {
        async function fetchMessages()
        {
            try
            {
                const res = await chatService.fetchMessages();
                setMessages(res);
            }
            catch (error)
            {
                console.error("Failed to fetch chat messages: ", error);
            }
        }
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, []);

    const sendMessage = async () =>
    {
        if (input.trim() === "")
            return;

        if (!currentUsername || currentUsername.trim() === "")
        {
            console.error("Cannot send message: username is missing");
            return;
        }

        // Calculate userIndex based on username to ensure consistent color assignment
        const calculatedUserIndex = getColorIndexForUsername(currentUsername);

        const newMsg = 
        {
            username: currentUsername,
            userIndex: calculatedUserIndex,
            text: input,
            createdAt: new Date().toISOString()
        };
        
        // Debug logging
        console.log("Sending message:", newMsg);
        console.log("currentUsername:", currentUsername);
        console.log("calculatedUserIndex:", calculatedUserIndex);
        
        try
        {
            await chatService.sendMessage(newMsg);
            setMessages(prev => [...prev, newMsg]);
            setInput("");
        }
        catch (error)
        {
            console.error("Failed to send message: ", error);
            if (error.response)
            {
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
            }
        }
    };

    return (
        <div className={styles.chatContainer}>
            <h3 className={styles.title}>Chat</h3>

            <div className={styles.messagesBox}>
                {messages.map((msg, i) => 
                {
                    // Get color index based on username (fallback to userIndex if username-based calculation fails)
                    const colorIndex = msg.username 
                        ? getColorIndexForUsername(msg.username) 
                        : (msg.userIndex || 0);
                    const userColor = User_Colours[colorIndex];
                    
                    return (
                        <div
                            key={i}
                            className={styles.message}
                            style={{borderLeftColor: userColor}}
                        >
                            <span className={styles.user} style={{color: userColor}}>
                                {msg.username}
                            </span>
                            <span className={styles.text}>{msg.text}</span>
                            <span className={styles.time}>{new Date(msg.createdAt).toLocaleTimeString()}</span>
                        </div>
                    );
                })}
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
