const ChatMessage = require("../models/chatMessageModel");

// Getting All Messages for all Users
const getAllMessages = async (req, res) =>
{
    try
    {
        const msgs = await ChatMessage.find().sort({createdAt: 1});
        res.status(200).json(msgs);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({message: "Unable to fetch all messages"});
    }
};

// Getting Messages for a User
const getMessagesByUsername = async (req, res) =>
{
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

// Save Message
const saveMessage = async (req, res) =>
{
    try
    {
        const {username, userIndex, text, createdAt} = req.body;
        if (!username || !text || userIndex === undefined)
        {
            return res.status(400).json({message: "Missing required fields"});
        }
        const msg = await ChatMessage.create
        ({
            username,
            userIndex,
            text,
            createdAt: createdAt || new Date()
        });
        res.status(201).json(msg);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({message: "Unable to save message"});
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