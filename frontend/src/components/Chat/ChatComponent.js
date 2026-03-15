import React, { useState, useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
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

const chat_backend_url = "http://localhost:5006/api/chat";

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

// function to normalize query text
function normalizeQueryText(str) {
    if (str == null || typeof str !== 'string') return '';
    return str.trim().toLowerCase();
}

const chatService = {
    fetchMessages: async (workspaceId, queryText) => {
        if (!workspaceId || queryText === undefined || queryText === null) 
            return [];

        const normalized = normalizeQueryText(queryText);
        if (!normalized) 
            return [];

        const res = await axios.get(chat_backend_url, {
            params: { workspaceId, queryText: normalized }
        });
        return res.data;
    },
    sendMessage: async (message) => {
        const res = await axios.post(chat_backend_url, message);
        return res.data;
    },
    deleteMessage: async (messageId, username) => {
        const res = await axios.delete(`${chat_backend_url}/${messageId}`, { data: { username } });
        return res.data;
    }
};

// Check if Puter AI is available in the browser
const isPuterAIAvailable = typeof window !== 'undefined' && window.puter?.ai;

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

// Helper function to format workspace history (queries and documents) for context for the AI
const formatWorkspaceHistoryForAI = (workspaceHistory) => {
    if (!workspaceHistory || !Array.isArray(workspaceHistory.queries) || workspaceHistory.queries.length === 0) 
    {
        return "No workspace history available.";
    }

    try 
    {
        // for the workspace history
        const workspaceName = workspaceHistory.workspaceName || workspaceHistory.name || 'Unknown Workspace';
        let historyText = `WORKSPACE HISTORY: "${workspaceName}"\n`;
        historyText += `Total Queries: ${workspaceHistory.queries.length}\n\n`;

        // for the queries in the workspace history
        return workspaceHistory.queries.map((query, queryIndex) => {
            const queryText = query.query || query.queryName || 'Untitled Query';
            const queryDate = query.createdAt ? new Date(query.createdAt).toLocaleDateString() : 'Unknown date';
            const documents = Array.isArray(query.documents) ? query.documents : [];
            
            // Separate saved and deleted documents
            const savedDocs = documents.filter(doc => !doc.doc_isRemoved && !doc.isRemoved);
            const deletedDocs = documents.filter(doc => doc.doc_isRemoved || doc.isRemoved);
            
            let queryHistory = `Query ${queryIndex + 1}: "${queryText}" (Created: ${queryDate})\n`;
            queryHistory += `  - Saved Documents: ${savedDocs.length}\n`;
            queryHistory += `  - Deleted/Removed Documents: ${deletedDocs.length}\n`;
            
            // Include details of saved documents
            if (savedDocs.length > 0) 
            {
                queryHistory += `  Saved Documents Details:\n`;
                savedDocs.forEach((doc, docIndex) => {
                    const title = doc.title || 'Untitled';
                    const authors = Array.isArray(doc.doc_authors) 
                        ? doc.doc_authors.join(', ') 
                        : (doc.doc_authors || 'Unknown authors');
                    const abstract = doc.doc_abstract || 'No abstract available';
                    queryHistory += `    ${docIndex + 1}. "${title}" by ${authors}\n`;
                    queryHistory += `       Abstract: ${abstract.substring(0, 150)}${abstract.length > 150 ? '...' : ''}\n`;
                });
            }
            
            // Include details of deleted documents (for context on what was removed)
            if (deletedDocs.length > 0) 
            {
                queryHistory += `  Deleted Documents (for reference):\n`;
                deletedDocs.forEach((doc, docIndex) => {
                    const title = doc.title || 'Untitled';
                    const authors = Array.isArray(doc.doc_authors) 
                        ? doc.doc_authors.join(', ') 
                        : (doc.doc_authors || 'Unknown authors');
                    queryHistory += `    ${docIndex + 1}. "${title}" by ${authors} [DELETED]\n`;
                });
            }
            
            return queryHistory;
        }).join('\n\n');
    } 
    catch (error) 
    {
        console.error("Error formatting workspace history for AI:", error);
        return "Error formatting workspace history.";
    }
};

function ChatComponent ({ currentUsername, currentUserIndex = 0, documents = [], workspaceHistory = null, workspaceId = null, queryId = null, queryText = null, currentUserId = null })
{
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isAIMode, setIsAIMode] = useState(false);
    const [isAILoading, setIsAILoading] = useState(false);
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [isDragOverDropZone, setIsDragOverDropZone] = useState(false);
    const [availableAgents, setAvailableAgents] = useState([
        { key: 'manager', name: 'Manager (auto)' },
        { key: 'reformulator', name: 'Query Reformulator' },
        { key: 'gapDetector', name: 'Knowledge Gap Detector' },
        { key: 'summarizer', name: 'Result Summarizer' }
    ]);
    const [selectedAgentKey, setSelectedAgentKey] = useState('manager');
    const messagesEndRef = useRef(null);
    const messagesBoxRef = useRef(null);
    const previousMessagesLengthRef = useRef(0);
    const isUserScrolledUpRef = useRef(false);

    // Check if user is near the bottom of the chat
    const isNearBottom = () => {
        if (!messagesBoxRef.current) 
            return true;
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

    // Fetch messages for this search topic (workspace + queryText). Same topic = same chat; poll so others see messages.
    useEffect(() => {
        const normalized = normalizeQueryText(queryText);
        if (!workspaceId || !normalized) 
        {
            setMessages([]);
            return;
        }

        setMessages([]); // clear when switching to another search topic
        let previousLength = 0;

        async function fetchMessages() {
            try 
            {
                const res = await chatService.fetchMessages(workspaceId, queryText);
                const currentLength = Array.isArray(res) ? res.length : 0;

                if (currentLength !== previousLength) 
                {
                    const wasNearBottom = isNearBottom();
                    setMessages(Array.isArray(res) ? res : []);

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
                console.error("Failed to fetch chat messages:", error);
            }
        }
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, [workspaceId, queryText]);

    // Handling @-agent detection and AI mode
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);
        
        // Check if input starts with any supported agent tag (case-insensitive)
        const trimmedValue = value.trim().toLowerCase();
        if (trimmedValue.startsWith('@ai') || trimmedValue.startsWith('@reformulator') || trimmedValue.startsWith('@gapdetector') || trimmedValue.startsWith('@summarizer')) 
        {
            setIsAIMode(true);
        } 
        else if (trimmedValue === '' || !trimmedValue.startsWith('@ai')) 
        {
            setIsAIMode(false);
            // to clear any selected documents when leaving AI mode
            setSelectedDocuments([]);
        }
    };

    const findDocumentByRecordId = (recordId) => 
    {
        if (!recordId || !Array.isArray(documents)) 
            return null;

        return documents.find((doc) => 
        {
            const id = doc?.pnx?.control?.recordid;             // note: chaining is used here to access the recordid property of the document
            if (Array.isArray(id)) 
            {
                return id[0] === recordId;
            }
            return id === recordId;
        });
    };

    const addSelectedDocument = (doc) => 
    {
        if (!doc) 
            return;

        const recordId = Array.isArray(doc?.pnx?.control?.recordid) 
            ? doc.pnx.control.recordid[0] 
            : doc?.pnx?.control?.recordid;
        
        if (!recordId) 
            return;

        setSelectedDocuments((prev) => 
        {
            // Avoid duplicates
            const alreadyExists = prev.some((item) => 
            {
                const existingId = Array.isArray(item?.pnx?.control?.recordid) 
                    ? item.pnx.control.recordid[0] 
                    : item?.pnx?.control?.recordid;
                return existingId === recordId;
            });
            if (alreadyExists) 
                return prev;

            return [...prev, doc];
        });
    };

    const removeSelectedDocument = (indexToRemove) => {
        setSelectedDocuments((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleDragOver = (event) => 
    {
        // drag & drop only when in AI mode
        if (!isAIMode) 
            return;
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
        setIsDragOverDropZone(true);
    };

    const handleDragLeave = (event) => 
    {
        event.preventDefault();
        setIsDragOverDropZone(false);
    };

    const handleDrop = (event) => 
    {
        if (!isAIMode) 
            return;
        event.preventDefault();
        event.stopPropagation();
        setIsDragOverDropZone(false);

        try 
        {
            const recordId = event.dataTransfer.getData('application/x-search-doc-recordid');
            if (recordId) 
            {
                const doc = findDocumentByRecordId(recordId);
                if (doc) 
                {
                    addSelectedDocument(doc);
                    return;
                }
            }

            const jsonPayload = event.dataTransfer.getData('application/json');     // note: payload of the document that is being dragged
            if (jsonPayload) 
            {
                try 
                {
                    const parsed = JSON.parse(jsonPayload);
                    if (parsed && parsed.type === 'search-doc' && parsed.payload?.recordId) 
                    {
                        const doc = findDocumentByRecordId(parsed.payload.recordId);
                        if (doc) 
                        {
                            addSelectedDocument(doc);
                        }
                    }
                } 
                catch (jsonError) 
                {
                    console.error("Failed to parse dropped document JSON:", jsonError);
                }
            }
        } 
        catch (error) 
        {
            console.error("Error handling document drop:", error);
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
        const lowerInput = inputText.toLowerCase();
        const isAIMessage =
            lowerInput.startsWith('@ai') ||
            lowerInput.startsWith('@reformulator') ||
            lowerInput.startsWith('@gapdetector') ||
            lowerInput.startsWith('@summarizer') ||
            // Also treat as AI if a specific agent is selected
            (selectedAgentKey && selectedAgentKey !== 'manager');

        // If AI is requested, handle with Puter AI (browser-side)
        if (isAIMessage) 
        {
            const isPuterAIAvailable =
                typeof window !== 'undefined' &&
                window.puter &&
                window.puter.ai;

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
                // Determine which agent should be used for this request
                let explicitAgent = null;
                if (lowerInput.startsWith('@reformulator')) explicitAgent = 'reformulator';
                else if (lowerInput.startsWith('@gapdetector')) explicitAgent = 'gapDetector';
                else if (lowerInput.startsWith('@summarizer')) explicitAgent = 'summarizer';
                else if (lowerInput.startsWith('@ai')) explicitAgent = 'manager';

                let agentKeyToUse = selectedAgentKey && selectedAgentKey !== 'manager'
                    ? selectedAgentKey
                    : (explicitAgent || 'manager');

                // Strip any leading @tag from the user text to get the actual request
                let aiPrompt = inputText;
                if (lowerInput.startsWith('@ai')) 
                {
                    aiPrompt = inputText.substring(3).trim();
                } 
                else if (lowerInput.startsWith('@reformulator')) 
                {
                    aiPrompt = inputText.substring('@reformulator'.length).trim();
                } 
                else if (lowerInput.startsWith('@gapdetector')) 
                {
                    aiPrompt = inputText.substring('@gapdetector'.length).trim();
                } 
                else if (lowerInput.startsWith('@summarizer')) 
                {
                    aiPrompt = inputText.substring('@summarizer'.length).trim();
                }

                if (!aiPrompt) 
                {
                    setIsAILoading(false);
                    setInput("");
                    setIsAIMode(false);
                    return;
                }

                // Ensure documents is an array
                const safeDocuments = Array.isArray(documents) ? documents : [];

                // Prefer explicitly selected documents (from drag-and-drop) when available
                const docsForAI = Array.isArray(selectedDocuments) && selectedDocuments.length > 0
                    ? selectedDocuments
                    : safeDocuments;
                
                // Format documents for context
                const documentsContext = formatDocumentsForAI(docsForAI);
                
                // Format workspace history if available
                const workspaceHistoryContext = workspaceHistory 
                    ? formatWorkspaceHistoryForAI(workspaceHistory)
                    : '';
                
                // Base prompt with shared context
                let fullPrompt = `You are an AI assistant helping users with research and document analysis.\n\n`;

                if (agentKeyToUse === 'reformulator') 
                {
                    fullPrompt += `ROLE: Query Reformulator.\n`;
                    fullPrompt += `You are an IIR expert. Based on the history and saved documents, suggest 3-5 improved search queries or keyword sets.\n\n`;
                } 
                else if (agentKeyToUse === 'gapDetector') 
                {
                    fullPrompt += `ROLE: Knowledge Gap Detector.\n`;
                    fullPrompt += `Compare the user's request with the titles and abstracts of saved documents. Identify missing or underrepresented themes, methods, or perspectives.\n\n`;
                } 
                else if (agentKeyToUse === 'summarizer') 
                {
                    fullPrompt += `ROLE: Result Summarizer.\n`;
                    fullPrompt += `Synthesize the provided document titles and abstracts into a concise, comparative summary of main themes.\n\n`;
                } 
                else 
                {
                    // Manager-style behavior
                    fullPrompt += `ROLE: Research Manager.\n`;
                    fullPrompt += `You can behave as a Query Reformulator, Knowledge Gap Detector, or Result Summarizer.\n`;
                    fullPrompt += `Choose the most helpful perspective for the user. If the request is vague, ask 1 clarifying question instead of giving a full answer.\n\n`;
                }

                // Add workspace history if available
                if (workspaceHistoryContext) 
                {
                    fullPrompt += `WORKSPACE AND QUERY HISTORY:\n`;
                    fullPrompt += `This workspace contains a history of previous search queries and documents (both saved and deleted).\n`;
                    fullPrompt += `${workspaceHistoryContext}\n\n`;
                }
                
                // Add current search results
                fullPrompt += `CURRENT SEARCH RESULTS (documents from this page):\n`;
                fullPrompt += `${documentsContext}\n\n`;
                
                // Add user request
                fullPrompt += `USER REQUEST: ${aiPrompt}\n\n`;

                // Call Puter AI - using the existing integration
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

                // Choose display name based on agent
                let aiUsername = "AI Assistant";
                if (agentKeyToUse === 'reformulator') aiUsername = "Query Reformulator";
                else if (agentKeyToUse === 'gapDetector') aiUsername = "Knowledge Gap Detector";
                else if (agentKeyToUse === 'summarizer') aiUsername = "Result Summarizer";


                // Add AI response to chat
                const aiMsg = {
                    username: aiUsername,
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
                
                // Persist AI exchange to this topic's chat so others searching the same topic see it
                const normalizedTopic = normalizeQueryText(queryText);
                if (workspaceId && normalizedTopic) 
                {
                    try 
                    {
                        await chatService.sendMessage({
                            workspaceId,
                            queryText: normalizedTopic,
                            queryId: queryId || undefined,
                            username: userMsg.username,
                            userIndex: userMsg.userIndex,
                            text: userMsg.text,
                            createdAt: userMsg.createdAt
                        });
                        await chatService.sendMessage({
                            workspaceId,
                            queryText: normalizedTopic,
                            queryId: queryId || undefined,
                            username: aiMsg.username,
                            userIndex: aiMsg.userIndex,
                            text: aiMsg.text,
                            createdAt: aiMsg.createdAt
                        });
                    } 
                    catch (backendError) 
                    {
                        console.warn("Failed to save AI messages to backend:", backendError);
                    }
                }
            } 
            catch (error) 
            {
                console.error("Puter AI error:", error);
                console.error("Error details:", {
                    message: error?.message,
                    error: error?.error,
                    success: error?.success
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
                
                setSelectedDocuments([]);       // Clear selected documents after  AI interaction completes
            }
            return;
        }

        // Regular chat message handling
        // Calculate userIndex based on username to ensure consistent color assignment
        // Get all unique usernames from current messages, add current user if needed, and sort
        const allUsernames = messages.map(msg => msg.username).filter(Boolean);
        if (!allUsernames.includes(currentUsername)) 
        {
            allUsernames.push(currentUsername);
        }
        const uniqueUsernamesSorted = [...new Set(allUsernames)].sort();
        const calculatedUserIndex = getColorIndexForUsername(currentUsername, uniqueUsernamesSorted);

        const normalizedTopic = normalizeQueryText(queryText);
        const newMsg = {
            workspaceId: workspaceId || '',
            queryText: normalizedTopic || '',
            queryId: queryId || undefined,
            username: currentUsername,
            userIndex: calculatedUserIndex,
            text: inputText,
            createdAt: new Date().toISOString(),
            isAIMessage: false
        };

        if (!workspaceId || !normalizedTopic) 
        {
            console.warn("Chat is scoped to this search topic. workspaceId and queryText are required.");
            return;
        }

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

    const isPageScoped = Boolean(workspaceId && normalizeQueryText(queryText));

    return (
        <div className={styles.chatContainer}>
            <h3 className={styles.title}>Chat</h3>
            {!isPageScoped && (
                <p className={styles.hint} style={{ fontSize: '0.85rem', color: '#666', margin: '0.5rem 0' }}>
                    Chat is tied to each search topic. Open a search result page to talk with others on that topic.
                </p>
            )}

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
            
            <div 
                className={styles.inputRow}
                onDragOver={handleDragOver}
                onDragEnter={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {isAIMode && (
                    <div 
                        className={`${styles.dropZone} ${isDragOverDropZone ? styles.dropZoneActive : ''}`}
                    >
                        <div className={styles.dropZoneSymbol}>
                            
                        </div>
                        <span className={styles.dropZoneText}>
                            Drag documents here
                        </span>
                    </div>
                )}

                <input
                    type="text"
                    className={styles.input}
                    placeholder={isAIMode ? "Ask AI about the search results..." : "Type your message... (use @ai for AI assistance)"}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === "Enter" && !isAILoading && isPageScoped && sendMessage()}
                    disabled={isAILoading || !isPageScoped}
                />

                <button
                    className={styles.sendBtn}
                    onClick={sendMessage}
                    disabled={isAILoading || !isPageScoped}
                >
                    {isAILoading ? 'Thinking...' : isAIMode ? 'Ask AI' : 'Send'}
                </button>
            </div>
            {isAIMode && selectedDocuments.length > 0 && (
                <div className={styles.selectedDocsRow}>
                    {/* loop through the selected documents and display */}
                    {selectedDocuments.map((doc, index) => {
                        const title = doc?.pnx?.display?.title?.[0] || doc?.pnx?.display?.title || 'Untitled';
                        // IF au exists, if is array, join with commas ELSE use it directly. ELSE IF addau exists, do  same thing. ELSE use "Unknown authors"
                        // IF array, then join, IF string, then use it directly
                        const authors = doc?.pnx?.addata?.au 
                            ? (Array.isArray(doc.pnx.addata.au) ? doc.pnx.addata.au.join(', ') : doc.pnx.addata.au)
                            : (doc?.pnx?.addata?.addau 
                                ? (Array.isArray(doc.pnx.addata.addau) ? doc.pnx.addata.addau.join(', ') : doc.pnx.addata.addau)
                                : 'Unknown authors');

                        return (
                            <div key={index} className={styles.selectedDocChip}>
                                <div className={styles.selectedDocAvatar}>
                                    
                                </div>
                                <div className={styles.selectedDocInfo}>
                                    <div className={styles.selectedDocTitle}>{title}</div>
                                    <div className={styles.selectedDocAuthors}>{authors}</div>
                                </div>
                                <button
                                    type="button"
                                    className={styles.selectedDocRemoveBtn}
                                    onClick={() => removeSelectedDocument(index)}
                                    title="Remove document"
                                    aria-label="Remove document"
                                >
                                    <CloseIcon fontSize="small" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
            {isAIMode && (
                <div style={{ padding: '0.5rem', fontSize: '0.75rem' }}>
                    <label style={{ marginRight: '0.5rem', fontSize: '0.75rem' }}>
                        Agent:
                    </label>
                    <select
                        value={selectedAgentKey}
                        onChange={(e) => setSelectedAgentKey(e.target.value)}
                        style={{ fontSize: '0.75rem', padding: '0.25rem' }}
                        disabled={isAILoading}
                    >
                        {availableAgents.map((agent) => (
                            <option key={agent.key} value={agent.key}>
                                {agent.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}

export default ChatComponent;
