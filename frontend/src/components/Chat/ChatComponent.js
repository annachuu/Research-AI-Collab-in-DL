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

// Helper function to format documents for AI context
const formatDocumentsForAI = (documents) => {
    if (!documents || !Array.isArray(documents) || documents.length === 0) 
    {
        return "No documents available.";
    }

    try 
    {
        return documents.map((doc, index) => {
            if (!doc || typeof doc !== 'object') 
            {
                return `Document ${index + 1}: Invalid document data`;
            }
            
            const title = doc.pnx?.display?.title?.[0] || doc.pnx?.display?.title || 'Untitled';

            // IF au exists, if is array, join with commas ELSE use it directly. ELSE IF addau exists, do  same thing. ELSE use "Unknown"
            const authors = doc.pnx?.addata?.au 
                ? (Array.isArray(doc.pnx.addata.au) ? doc.pnx.addata.au.join(', ') : doc.pnx.addata.au)
                : (doc.pnx?.addata?.addau 
                    ? (Array.isArray(doc.pnx.addata.addau) ? doc.pnx.addata.addau.join(', ') : doc.pnx.addata.addau)
                    : 'Unknown authors');
            const abstract = doc.pnx?.addata?.abstract?.[0] || doc.pnx?.addata?.abstract || 'No abstract available';
            const type = doc.pnx?.display?.type || 'Unknown type';
            const date = doc.pnx?.display?.creationdate || doc.pnx?.facets?.creationdate || 'Unknown date';
            
            return `Document ${index + 1}:
                Title: ${title}
                Authors: ${authors}
                Type: ${type}
                Date: ${date}
                Abstract: ${abstract}`;
        }).join('\n\n');
    } 
    catch (error) 
    {
        console.error("Error formatting documents for AI:", error);
        return "Error formatting documents.";
    }
};

function ChatComponent ({ currentUsername, currentUserIndex = 0, documents = [] })
{
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isAIMode, setIsAIMode] = useState(false);
    const [isAILoading, setIsAILoading] = useState(false);
    const messagesEndRef = useRef(null);
    const messagesBoxRef = useRef(null);
    const previousMessagesLengthRef = useRef(0);
    const isUserScrolledUpRef = useRef(false);

    // Check if user is near the bottom of the chat
    const isNearBottom = () => {
        if (!messagesBoxRef.current) return true;
        const { scrollTop, scrollHeight, clientHeight } = messagesBoxRef.current;
        // Consider "near bottom" if within 100px of the bottom
        const threshold = 100;
        return scrollHeight - scrollTop - clientHeight < threshold;
    };

    // Scroll to bottom function
    const scrollToBottom = (smooth = true) => {
        if (messagesEndRef.current) 
        {
            messagesEndRef.current.scrollIntoView({ 
                behavior: smooth ? "smooth" : "auto",
                block: "end"
            });
        }
    };

    // Handle scroll events to track if user manually scrolled up
    const handleScroll = () => {
        if (messagesBoxRef.current) 
        {
            isUserScrolledUpRef.current = !isNearBottom();
        }
    };

    // Scroll to bottom on initial load
    useEffect(() => {
        if (messages.length > 0 && previousMessagesLengthRef.current === 0) 
        {
            // Initial load - scroll to bottom immediately without smooth animation
            setTimeout(() => {
                scrollToBottom(false);
            }, 100);
        }
        previousMessagesLengthRef.current = messages.length;
    }, [messages.length]);

    // Auto-scroll when new messages arrive (only if user is at bottom)
    useEffect(() => {
        const currentLength = messages.length;
        const previousLength = previousMessagesLengthRef.current;
        
        // If new messages were added
        if (currentLength > previousLength) 
        {
            // Check if user is near bottom or if it's a new message from current user
            const isNewMessageFromCurrentUser = currentLength > previousLength && 
                messages[currentLength - 1]?.username === currentUsername;
            
            // Auto-scroll if:
            // 1. User is near bottom, OR
            // 2. It's a message from the current user (they just sent it)
            if (isNearBottom() || isNewMessageFromCurrentUser || !isUserScrolledUpRef.current) 
            {
                setTimeout(() => {
                    scrollToBottom(true);
                    isUserScrolledUpRef.current = false;
                }, 100);
            }
        }
    }, [messages, currentUsername]);

    // Getting new message every 3 seconds
    useEffect(() =>
    {
        let previousLength = messages.length;
        
        async function fetchMessages()
        {
            try
            {
                const res = await chatService.fetchMessages();
                const currentLength = res.length;
                
                // Only update if messages actually changed
                if (currentLength !== previousLength) 
                {
                    const wasNearBottom = isNearBottom();
                    setMessages(res);
                    
                    // If new messages arrived from server and user was at bottom, then scroll down
                    if (currentLength > previousLength && wasNearBottom && !isUserScrolledUpRef.current) 
                    {
                        setTimeout(() => {
                            scrollToBottom(true);
                            isUserScrolledUpRef.current = false;
                        }, 100);
                    }
                    
                    previousLength = currentLength;
                }
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

    // Check if Puter AI is available
    const isPuterAIAvailable = typeof window !== 'undefined' && window.puter?.ai;

    // Handling @ai detection and AI mode
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);
        
        // Check if input starts with @ai (case-insensitive)
        const trimmedValue = value.trim().toLowerCase();
        if (trimmedValue.startsWith('@ai')) {
            setIsAIMode(true);
        } else if (trimmedValue === '' || !trimmedValue.startsWith('@ai')) {
            setIsAIMode(false);
        }
    };

    const sendMessage = async () =>
    {
        if (input.trim() === "")
            return;

        if (!currentUsername || currentUsername.trim() === "")
        {
            console.error("Cannot send message: username is missing");
            return;
        }

        const inputText = input.trim();
        const isAIMessage = inputText.toLowerCase().startsWith('@ai');

        // If @ai is detected, handle with Puter AI
        if (isAIMessage) 
        {
            if (!isPuterAIAvailable) 
            {
                const errorMsg = {
                    username: "AI Assistant",
                    userIndex: -1,
                    text: "Puter AI is not available. Please ensure the script is loaded.",
                    createdAt: new Date().toISOString(),
                    isAIMessage: true,
                    isError: true
                };
                setMessages(prev => [...prev, errorMsg]);
                setInput("");
                setIsAIMode(false);
                return;
            }
            
            setIsAILoading(true);
            
            // Extract the prompt after @ai
            const aiPrompt = inputText.substring(3).trim(); // Remove '@ai' prefix
            
            if (!aiPrompt) 
            {
                setIsAILoading(false);
                setInput("");
                setIsAIMode(false);
                return;
            }
            
            // Add user message to chat
            const userMsg = 
            {
                username: currentUsername,
                userIndex: 0,
                text: inputText,
                createdAt: new Date().toISOString(),
                isAIMessage: false
            };
            
            // Add user message immediately
            setMessages(prev => [...prev, userMsg]);
            
            try 
            {
                // Ensure documents is an array
                const safeDocuments = Array.isArray(documents) ? documents : [];
                
                // Format documents for context
                const documentsContext = formatDocumentsForAI(safeDocuments);
                
                // the full prompt with context
                const fullPrompt = `You are an AI assistant helping users. Below are the search results (documents) from this current page:
                    ${documentsContext}
                    User request: ${aiPrompt}`;

                // Calling Puter AI - using the API format from tutorial
                // puter.ai.chat() takes message as first param, options as second param
                const aiResponse = await window.puter.ai.chat(
                    fullPrompt,
                    { model: "gpt-5-nano" }
                );

                // Check if response is an error object
                if (aiResponse && typeof aiResponse === 'object' && aiResponse.success === false) 
                {
                    throw new Error(aiResponse.error || "AI request failed");
                }

                // The response is a string directly, not an object
                const responseText = typeof aiResponse === 'string' 
                    ? aiResponse 
                    : (aiResponse?.message?.content || aiResponse?.content || "I'm sorry, I couldn't generate a response.");

                // Add AI response to chat
                const aiMsg = {
                    username: "AI Assistant",
                    userIndex: -1, // Special index for AI
                    text: responseText,
                    createdAt: new Date().toISOString(),
                    isAIMessage: true
                };

                setMessages(prev => [...prev, aiMsg]);
                
                // Always scroll to bottom when AI responds
                setTimeout(() => {
                    scrollToBottom(true);
                    isUserScrolledUpRef.current = false;
                }, 100);
                
                // Optionally save to backend (if you want AI messages persisted)
                try 
                {
                    await chatService.sendMessage(userMsg);
                    await chatService.sendMessage(aiMsg);
                } 
                catch (backendError) 
                {
                    console.warn("Failed to save AI messages to backend:", backendError);
                }
            } 
            catch (error) 
            {
                console.error("Puter AI error:", error);
                console.error("Error details:", {
                    message: error?.message,
                    error: error?.error,
                    success: error?.success,
                    documents: documents,
                    documentsType: typeof documents,
                    isArray: Array.isArray(documents)
                });
                
                const errorMessage = error?.error || error?.message || "Sorry, I encountered an error. Please try again.";
                const errorMsg = {
                    username: "AI Assistant",
                    userIndex: -1,
                    text: `Error: ${errorMessage}`,
                    createdAt: new Date().toISOString(),
                    isAIMessage: true,
                    isError: true
                };
                setMessages(prev => [...prev, errorMsg]);
            } 
            finally 
            {
                setIsAILoading(false);
                setInput("");
                setIsAIMode(false);
            }
            return;
        }

        // Regular chat message handling
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
            text: inputText,
            createdAt: new Date().toISOString(),
            isAIMessage: false
        };
        
        // Debug logging
        console.log("Sending message:", newMsg);
        console.log("currentUsername:", currentUsername);
        console.log("calculatedUserIndex:", calculatedUserIndex);
        
        try
        {
            await chatService.sendMessage(newMsg);
            setMessages(prev => [...prev, newMsg]);
            // Always scroll to bottom when user sends their own message
            setTimeout(() => {
                scrollToBottom(true);
                isUserScrolledUpRef.current = false;
            }, 100);
            setInput("");
            setIsAIMode(false);
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

            <div 
                className={styles.messagesBox} 
                ref={messagesBoxRef}
                onScroll={handleScroll}
            >
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
                        // Handle AI messages with special color
                        let colorIndex;
                        if (msg.isAIMessage || msg.username === "AI Assistant") 
                        {
                            colorIndex = User_Colours.length - 1; // Use last color for AI
                        } 
                        else 
                        {
                            colorIndex = msg.username 
                                ? getColorIndexForUsername(msg.username, uniqueUsernamesSorted) 
                                : (msg.userIndex || 0);
                            colorIndex = Math.max(0, Math.min(colorIndex, User_Colours.length - 1));
                        }
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
                    placeholder={isAIMode ? "Ask AI about the search results..." : "Type your message... (use @ai for AI assistance)"}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === "Enter" && !isAILoading && sendMessage()}
                    disabled={isAILoading}
                />

                <button 
                    className={styles.sendBtn} 
                    onClick={sendMessage}
                    disabled={isAILoading}
                >
                    {isAILoading ? 'Thinking...' : isAIMode ? 'Ask AI' : 'Send'}
                </button>
            </div>
            {isAIMode && !isPuterAIAvailable && (
                <div style={{ padding: '0.5rem', fontSize: '0.75rem', color: '#e31a1c' }}>
                    AI is not available. Please ensure Puter AI is loaded.
                </div>
            )}
        </div>
    );
}

export default ChatComponent;
