const mongoose = require('mongoose')
const Workspace = require('../models/workspaceModel')

const workspaceSchema = mongoose.Schema({
    name: { type: String, required: [true, 'Please add a name value']},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    archive: {type: Boolean, required: true, default: true}
}, {
    timestamps: true,
})

module.exports = mongoose.model('Workspace', workspaceSchema)