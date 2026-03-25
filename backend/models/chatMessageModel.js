const mongoose = require('mongoose');

// Normalize search topic for channel key: same topic = same chat across users
function normalizeQueryText(str) {
    if (str == null || typeof str !== 'string') return '';
    return str.trim().toLowerCase();
}

// Schema for chat box - scoped by workspace + search topic (queryText) so everyone searching the same topic sees the same thread
const ChatMessageSchema = new mongoose.Schema(
    {
        workspaceId: {
            type: String,
            required: true,
            index: true
        },
        // Normalized search keyword (e.g. "design") — channel key so same topic = same chat
        queryText: {
            type: String,
            required: true,
            index: true
        },
        queryId: {
            type: String,
            default: null,
            index: true
        },
        username: {
            type: String,
            required: true
        },
        userIndex: {
            type: Number,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        // structured references for any documents the user drops
        // before sending their chat message.
        docRefs: {
            type: [
                {
                    title: { type: String, default: '' },
                    authors: { type: String, default: '' }
                }
            ],
            default: undefined
        }
    },
    { timestamps: true }
);

ChatMessageSchema.index({ workspaceId: 1, queryText: 1, createdAt: 1 });

module.exports = mongoose.model("ChatMessage", ChatMessageSchema);
module.exports.normalizeQueryText = normalizeQueryText;