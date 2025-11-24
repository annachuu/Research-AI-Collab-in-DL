const mongoose = require('mongoose');

// Schema for Chat
const ChatMessageSchema = new mongoose.Schema
(
    {
        username:
        {
            type: String,
            required: true
        },
        userIndex:
        {
            type: Number,
            required: true,
        },
        text:
        {
            type: String,
            required: true
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("ChatMessage", ChatMessageSchema);