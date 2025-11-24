const express = require('express');
const router = express.Router();
const {saveMessage, getMessagesByUsername, getAllMessages, deleteMessage} = require("../controllers/chatController");

router.get('/', getAllMessages);
router.get('/:username', getMessagesByUsername);
router.post('/', saveMessage);
router.delete('/:messageId', deleteMessage);

module.exports = router;