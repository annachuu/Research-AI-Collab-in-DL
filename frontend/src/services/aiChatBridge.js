import { PuterLLMProvider } from "./puterLLMProvider";
import { AIOrchestrator } from "./aiOrchestrator";

const llmProvider = new PuterLLMProvider();
const orchestrator = new AIOrchestrator(llmProvider, {
    confidenceThreshold: 0.7
});

function buildArtifactsFromWorkspaceHistory(workspaceHistory) {
    if (!workspaceHistory || !Array.isArray(workspaceHistory.queries)) {
        return [];
    }
    const out = [];
    const seen = new Set();
    for (const q of workspaceHistory.queries) {
        for (const doc of q.documents || []) {
            if (doc.doc_isRemoved || doc.isRemoved) {
                continue;
            }
            const id = (doc.id || doc._id || "").toString();
            const key = id || `${doc.title}-${(doc.doc_abstract || "").slice(0, 40)}`;
            if (seen.has(key)) {
                continue;
            }
            seen.add(key);
            out.push({
                id: id || key,
                title: doc.title || "Untitled",
                abstract: doc.doc_abstract || ""
            });
        }
    }
    return out;
}

function buildPageArtifactsFromDocuments(documents) {
    if (!documents || !Array.isArray(documents)) {
        return [];
    }
    return documents.map((doc, index) => {
        const title =
            doc.pnx?.display?.title?.[0] || doc.pnx?.display?.title || "Untitled";
        const abstract = doc.pnx?.addata?.abstract?.[0] || doc.pnx?.addata?.abstract || "";
        return {
            id: `page-${index}`,
            title,
            abstract
        };
    });
}

function buildHistory(workspaceHistory, recentMessages, workspaceId, queryId) {
    return {
        workspace: {
            id: workspaceId || null,
            name: workspaceHistory?.workspaceName || workspaceHistory?.name || null
        },
        queries: workspaceHistory?.queries || [],
        chats: (recentMessages || []).slice(-20).map((m) => ({
            username: m.username,
            text: m.text,
            createdAt: m.createdAt
        })),
        queryId: queryId || null
    };
}

/**
 * Puter AI path: Manager–Worker orchestration (hybrid routing, clarification loop, polish step).
 */
class ResearchAIChatBridge {
    /**
     * @param {object} p
     * @param {string} p.message - Full user message (include @ai / @gapDetector etc.)
     * @param {Array} [p.documents] - Current search results (page)
     * @param {object} [p.workspaceHistory]
     * @param {string} [p.workspaceId]
     * @param {string} [p.queryId]
     * @param {string} [p.explicitAgentKey] - From UI dropdown when not "manager"
     * @param {Array} [p.recentMessages] - Recent chat messages for workspace context
     */
    async sendResearchRequest({
        message,
        documents,
        workspaceHistory,
        workspaceId,
        queryId,
        explicitAgentKey,
        recentMessages
    }) {
        const safeDocuments = Array.isArray(documents) ? documents : [];
        const artifacts = buildArtifactsFromWorkspaceHistory(workspaceHistory);
        const pageArtifacts = buildPageArtifactsFromDocuments(safeDocuments);

        const context = {
            history: buildHistory(workspaceHistory, recentMessages, workspaceId, queryId),
            artifacts,
            pageArtifacts,
            workspace: {
                id: workspaceId || null,
                name: workspaceHistory?.workspaceName || workspaceHistory?.name || null,
                queryId: queryId || null
            },
            registry: orchestrator.getAgentsMetadata()
        };

        const options = {};
        if (explicitAgentKey && explicitAgentKey !== "manager") {
            options.explicitAgentKey = explicitAgentKey;
        }

        return orchestrator.process(message, context, options);
    }
}

export { ResearchAIChatBridge };
