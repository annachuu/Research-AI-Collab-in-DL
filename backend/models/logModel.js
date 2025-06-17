const mongoose = require('mongoose');
const { Schema } = mongoose;

// Log sub-schema (adjust types as needed)
const LogSchema = new Schema({
    applicationSpecificData: {
        type: Schema.Types.Mixed,
        default: {}
    },
    eventType: {
        type: String,
        required: true
    },
    eventDetails: {
        type: Schema.Types.Mixed,
        default: {}
    },
    timestamps: {
        type: Schema.Types.Mixed,
        default: {}
    },
    metadata: {
        type: Schema.Types.Mixed,
        default: {}
    }
}, { _id: false, timestamps: true });

// Main schema for a user's logs
const UserLogSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    logs: {
        type: [LogSchema],
        default: []
    }
}, { timestamps: true });

// Export the model
module.exports = mongoose.model('UserLog', UserLogSchema);
