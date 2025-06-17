const mongoose = require('mongoose')

/**
 * Schema for a Query.
**/

const querySchema = mongoose.Schema(
  {
    query: { type: String, required: [true, 'Please add query']},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },    
    workspaceId: {type: mongoose.Schema.Types.ObjectId, default: null, required: [true, 'Please add workspaceId']},
    workspaceName: { type: String}, 
    documents: {type: Array}   
  },
  {
    timestamps: true,
  }
)


module.exports = mongoose.model('Query', querySchema)
