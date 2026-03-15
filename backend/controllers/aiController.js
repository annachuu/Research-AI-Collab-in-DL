const Workspace = require('../models/workspaceModel');
const Query = require('../models/queryModel');
const Document = require('../models/documentModel');
const ChatMessage = require('../models/chatMessageModel');

const AIOrchestrator = require('../ai/AIOrchestrator');
const MockLLMProvider = require('../ai/MockLLMProvider');

// Single shared orchestrator instance for the process
const llmProvider = new MockLLMProvider();
const orchestrator = new AIOrchestrator(llmProvider, {
  confidenceThreshold: 0.7
});

async function buildWorkspaceContext({ workspaceId, userId, username }) 
{
  if (!workspaceId) 
  {
    return {
      workspace: null,
      history: [],
      artifacts: []
    };
  }

  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) 
  {
    return {
      workspace: null,
      history: [],
      artifacts: []
    };
  }

  // Queries for this workspace
  const queries = await Query.find({ workspaceId }).sort({ createdAt: 1 });
  const queryIds = queries.map((q) => q._id);

  // All documents linked to these queries
  const documents = await Document.find({ queryId: { $in: queryIds } }).sort({ createdAt: 1 });

  const docsByQuery = {};
  documents.forEach((doc) => {
    const key = doc.queryId ? doc.queryId.toString() : 'unknown';
    if (!docsByQuery[key]) 
    {
      docsByQuery[key] = [];
    }
    docsByQuery[key].push(doc);
  });

  const historyQueries = queries.map((query) => {
    const qId = query._id.toString();
    const docsForQuery = docsByQuery[qId] || [];

    return {
      id: qId,
      query: query.query,
      createdAt: query.createdAt,
      documents: docsForQuery.map((d) => ({
        id: d._id.toString(),
        title: d.title,
        authors: d.doc_authors || [],
        abstract: d.doc_abstract || '',
        isRemoved: !!d.doc_isRemoved,
        createdAt: d.createdAt
      }))
    };
  });

  // Recent chat messages for this username (if provided)
  let chatHistory = [];
  if (username) 
  {
    // Find the chat history for the username
    chatHistory = await ChatMessage.find({ username })
      .sort({ createdAt: -1 })
      .limit(20);
  }

  const history = {
    workspace: {
      id: workspace._id.toString(),
      name: workspace.name
    },
    queries: historyQueries,
    chats: chatHistory.map((m) => ({
      username: m.username,
      text: m.text,
      createdAt: m.createdAt
    }))
  };

  const artifacts = documents
    .filter((d) => !d.doc_isRemoved)
    .map((d) => ({
      id: d._id.toString(),
      title: d.title,
      abstract: d.doc_abstract || ''
    }));

  return {
    workspace,
    history,
    artifacts
  };
}


/**
 * POST /api/ai/chat
 * Body: { message, workspaceId?, queryId?, userId?, username?, agentKey? }
 */
const handleAIChat = async (req, res) => {
  const { message, workspaceId, queryId, userId, username, agentKey } = req.body || {};

  if (!message || typeof message !== 'string') 
  {
    return res.status(400).json({ success: false, error: 'message is required' });
  }

  let context = {
    history: [],
    artifacts: [],
    workspace: {},
    registry: orchestrator.getAgentsMetadata()
  };

  try 
  {
    const workspaceContext = await buildWorkspaceContext({
      workspaceId,
      userId,
      username
    });

    context = {
      history: workspaceContext.history,
      artifacts: workspaceContext.artifacts,
      workspace: {
        id: workspaceContext.workspace ? workspaceContext.workspace._id.toString() : null,
        name: workspaceContext.workspace ? workspaceContext.workspace.name : null,
        queryId: queryId || null
      },
      registry: orchestrator.getAgentsMetadata()
    };
  } 
  catch (error) 
  {
    // If context building fails, log but still allow the orchestrator to run without context
    console.error('Error building workspace context for AI:', error);
  }

  try 
  {
    const result = await orchestrator.process(message, context, {
      explicitAgentKey: agentKey
    });

    return res.status(200).json({
      success: true,
      result
    });
  } 
  catch (error) 
  {
    console.error('AI orchestrator error:', error);
    return res.status(500).json({
      success: false,
      error: 'AI Orchestrator failed to process the request.'
    });
  }
};

/**
 * GET /api/ai/agents
 * Returns lightweight registry of available agents for UI selection.
 */
const getAgents = (req, res) => {
  const agents = orchestrator.getAgentsMetadata();
  return res.status(200).json({
    success: true,
    agents
  });
};

module.exports = {
  handleAIChat,
  getAgents
};

