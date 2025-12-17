import React, { useState, useEffect, useRef } from "react";
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

// Ensuring each username gets a unique colour that never repeats
// Colors are assigned based on alphabetical order of usernames to ensure consistency
const getColorIndexForUsername = (username, uniqueUsernamesSorted = []) =>
{
    if (!username) return 0;
    
    // Find the position of this username in the sorted unique usernames list
    const usernameIndex = uniqueUsernamesSorted.indexOf(username);
    
    // If username is found, assign color based on its position
    // This ensures each username always gets the same color and no duplicates
    if (usernameIndex !== -1) {
        return usernameIndex % User_Colours.length;
    }
    
    // Fallback: if username not in list, use first color
    return 0;
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
    },
    deleteMessage: async (messageId, username) =>
    {
        const res = await axios.delete(`${backend_url}/${messageId}`, {data: {username}});
        return res.data;
    }
};

function ChatComponent ({ currentUsername, currentUserIndex = 0 })
{
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);
    const messagesBoxRef = useRef(null);

    // Auto-scroll to bottom when messages change
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
        // Get all unique usernames from current messages, add current user if needed, and sort
        const allUsernames = messages.map(msg => msg.username).filter(Boolean);
        if (!allUsernames.includes(currentUsername)) {
            allUsernames.push(currentUsername);
        }
        const uniqueUsernamesSorted = [...new Set(allUsernames)].sort();
        const calculatedUserIndex = getColorIndexForUsername(currentUsername, uniqueUsernamesSorted);

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

    const deleteMessage = async (messageId) =>
    {
        if (!currentUsername || currentUsername.trim() === "")
        {
            console.error("Cannot delete message: username is missing");
            return;
        }

        try
        {
            await chatService.deleteMessage(messageId, currentUsername);
            setMessages(prev => prev.filter(msg => msg._id !== messageId));
        }
        catch (error)
        {
            console.error("Failed to delete message: ", error);
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

            <div className={styles.messagesBox} ref={messagesBoxRef}>
                {(() => {
                    // Extract all unique usernames from messages and sort them alphabetically
                    // This ensures consistent color assignment: first user gets color 0, second gets color 1, etc.
                    // No two users will have the same color as long as we have <= 10 unique users
                    const allUsernames = messages.map(msg => msg.username).filter(Boolean);
                    const uniqueUsernamesSorted = [...new Set(allUsernames)].sort();
                    
                    return messages.map((msg, i) => 
                    {
                        // Get color index based on username's position in sorted unique usernames
                        // This ensures no color repeats and each username always gets the same color
                        let colorIndex = msg.username 
                            ? getColorIndexForUsername(msg.username, uniqueUsernamesSorted) 
                            : (msg.userIndex || 0);
                        colorIndex = Math.max(0, Math.min(colorIndex, User_Colours.length - 1));
                        const userColor = User_Colours[colorIndex];
                        const isOwnMessage = msg.username === currentUsername;
                    
                    return (
                        <div
                            key={msg._id || i}
                            className={styles.message}
                            style={{borderLeftColor: userColor}}
                        >
                            <div className={styles.messageHeader}>
                                <div className={styles.messageContent}>
                                    <span className={styles.user} style={{color: userColor}}>
                                        {msg.username}:
                                    </span>
                                    <span className={styles.text}>{msg.text}</span>
                                </div>
                                {isOwnMessage && msg._id && (
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => deleteMessage(msg._id)}
                                        title="Delete message"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                            <div className={styles.messageFooter}>
                                <span className={styles.time}>
                                    {new Date(msg.createdAt).toLocaleString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: true
                                    })}
                                </span>
                            </div>
                        </div>
                    );
                })})()}
                <div ref={messagesEndRef} />
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
