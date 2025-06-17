const mongoose = require('mongoose')

/**
 * Schema for a User document.
 */

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },    
    password: { type: String, required: true },    
  },
  {
    timestamps: true,
  }
)


module.exports = mongoose.model('User', userSchema)
