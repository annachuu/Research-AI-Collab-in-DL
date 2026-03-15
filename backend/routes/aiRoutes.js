const express = require('express');
const router = express.Router();

const { handleAIChat, getAgents } = require('../controllers/aiController');

// List available agents for interactive selection
router.get('/agents', getAgents);

// Main AI chat endpoint (Manager–Worker orchestration)
router.post('/chat', handleAIChat);

module.exports = router;

