const express = require('express');
const router = express.Router();
const {saveMessage, getMessagesByUsername, getAllMessages} = require("../controllers/chatController");

router.get('/', getAllMessages);
router.get('/:username', getMessagesByUsername);
router.post('/', saveMessage);

module.exports = router;