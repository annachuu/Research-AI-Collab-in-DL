const ChatMessage = require("../models/chatMessageModel");
const { normalizeQueryText } = require("../models/chatMessageModel");

// Get messages for this search topic (workspace + queryText), Same topic = same chat so other users see messages.
const getAllMessages = async (req, res) => {
    try 
    {
        const { workspaceId, queryText } = req.query;
        if (!workspaceId || queryText === undefined || queryText === null)
        {
            return res.status(400).json({
                message: "workspaceId and queryText (search topic) are required to load chat"
            });
        }
        const normalized = normalizeQueryText(queryText);
        if (!normalized) 
        {
            return res.status(400).json({ message: "queryText (search topic) cannot be empty" });
        }
        const msgs = await ChatMessage.find({ workspaceId, queryText: normalized }).sort({ createdAt: 1 });
        res.status(200).json(msgs);
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ message: "Unable to fetch messages" });
    }
};

// Getting Messages for a User
const getMessagesByUsername = async (req, res) => {
    try
    {
        const {username} = req.params;
        if (!username)
        {
            return res.status(400).json({message: "Username is required"});
        }
        const msgs = await ChatMessage.find({username}).sort({createdAt: 1});
        res.status(200).json(msgs);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({message: "Unable to fetch messages"});
    }
};

// Save message to this search topic's chat (workspace + normalized queryText). Stored in the chat for that topic.
const saveMessage = async (req, res) => {
    try 
    {
        const { workspaceId, queryText, queryId, username, userIndex, text, createdAt, docRefs } = req.body;
        if (!workspaceId || queryText === undefined || queryText === null)
        {
            return res.status(400).json({ message: "workspaceId and queryText (search topic) are required" });
        }
        if (!username || !text || userIndex === undefined)
        {
            return res.status(400).json({ message: "Missing required fields: username, text, userIndex" });
        }
        const normalized = normalizeQueryText(queryText);
        if (!normalized) 
        {
            return res.status(400).json({ message: "queryText (search topic) cannot be empty" });
        }
        const msg = await ChatMessage.create({
            workspaceId,
            queryText: normalized,
            queryId: queryId || null,
            username,
            userIndex,
            text,
            docRefs,
            createdAt: createdAt || new Date()
        });
        res.status(201).json(msg);
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ message: "Unable to save message" });
    }
};

// Delete Message
const deleteMessage = async (req, res) =>
{
    try
    {
        const {messageId} = req.params;
        const {username} = req.body;
        
        if (!messageId)
        {
            return res.status(400).json({message: "Message ID is required"});
        }
        
        if (!username)
        {
            return res.status(400).json({message: "Username is required"});
        }
        
        const msg = await ChatMessage.findById(messageId);
        
        if (!msg)
        {
            return res.status(404).json({message: "Message not found"});
        }
        
        if (msg.username !== username)
        {
            return res.status(403).json({message: "You can only delete your own messages"});
        }
        
        await ChatMessage.findByIdAndDelete(messageId);
        res.status(200).json({message: "Message deleted successfully"});
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({message: "Unable to delete message"});
    }
};

module.exports = 
{
    saveMessage, 
    getMessagesByUsername, 
    getAllMessages,
    deleteMessage
};