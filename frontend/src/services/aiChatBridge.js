import { PuterLLMProvider } from "./puterLLMProvider";
import { AIOrchestrator } from "./aiOrchestrator";

const llmProvider = new PuterLLMProvider();
const orchestrator = new AIOrchestrator(llmProvider, {
    confidenceThreshold: 0.7
});

/**
 * Active saved documents for the AI: merge (1) documents on the current query row
 * from workspace history and (2) the timeline payload from GET /document/query/:queryId,
 * which aggregates the same search topic across users/workspaces. Dedupe by catalog
 * record id (documentId) when present so the same paper saved twice stays one artifact
 */
function buildMergedActiveArtifacts(workspaceHistory, queryId) 
{
    const seenKeys = new Set();
    const out = [];

    const push = (doc) => {
        if (!doc || doc.doc_isRemoved || doc.isRemoved) return;
        
        const recordId = (doc.documentId || "").toString();
        const mongoId = (doc._id || doc.id || "").toString();
        const dedupeKey = recordId ? `rec:${recordId}` : mongoId ? `id:${mongoId}` : null;

        if (!dedupeKey) return;
        if (seenKeys.has(dedupeKey)) return;

        seenKeys.add(dedupeKey);
        out.push({
            id: mongoId || recordId || dedupeKey,
            title: doc.title || "Untitled",
            abstract: doc.doc_abstract || ""
        });
    };

    const normalizedQueryId = (queryId || "").toString();
    const queries = workspaceHistory?.queries;
    if (Array.isArray(queries)) 
    {
        for (const q of queries) 
        {
            if (normalizedQueryId) 
            {
                const qid = (q?._id || q?.id || "").toString();
                if (qid !== normalizedQueryId) continue;
            }
            for (const doc of q.documents || []) 
            {
                push(doc);
            }
        }
    }

    const rawTimeline = workspaceHistory?.timeline?.documents;
    if (Array.isArray(rawTimeline)) 
    {
        for (const doc of rawTimeline) 
        {
            push(doc);
        }
    }

    return out;
}

function buildTimelineFromWorkspaceHistory(workspaceHistory) {
    const docs = workspaceHistory?.timeline?.documents;
    if (!Array.isArray(docs)) return [];

    // Keep the context bounded to avoid overloading the model
    const MAX = 250;
    const sorted = [...docs].sort((a, b) => {
        const ta = new Date(a.updatedAt || a.createdAt || 0).getTime();
        const tb = new Date(b.updatedAt || b.createdAt || 0).getTime();
        return tb - ta;
    });

    return sorted.slice(0, MAX).map((d) => ({
        id: (d.documentId || d._id || d.id || "").toString() || null,
        title: d.title || d.docdata?.Title || "Untitled",
        abstract: d.doc_abstract || d.abstract || d.docdata?.Abstract || "",
        type: d.doc_type || d.docdata?.Format || d.docdata?.doc_type || null,
        isRemoved: Boolean(d.doc_isRemoved ?? d.isRemoved ?? false),
        // createdAt usually = "saved at" time; updatedAt often tracks removal toggles
        createdAt: d.createdAt || null,
        updatedAt: d.updatedAt || null,
        user: {
            id: (d.userId?._id || d.userId || "").toString() || null,
            username: d.userId?.username || d.username || null
        }
    }));
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

function buildHistory(workspaceHistory, recentMessages, workspaceId, queryId, queryText) 
{
    const chats = (recentMessages || []).slice(-20).map((m) => ({
        username: m.username,
        text: m.text,
        createdAt: m.createdAt
    }));

    return {
        workspace: {
            id: workspaceId || null,
            name: workspaceHistory?.workspaceName || workspaceHistory?.name || null
        },
        queries: workspaceHistory?.queries || [],
        chats,
        // shorter ordered conversation memory optimized for any follow-up questions
        recentTurns: chats.map((m) => ({
            role: String(m.username || "").toLowerCase().includes("manager") ||
                  String(m.username || "").toLowerCase().includes("detector") ||
                  String(m.username || "").toLowerCase().includes("summarizer") ||
                  String(m.username || "").toLowerCase().includes("reformulator")
                ? "assistant"
                : "user",
            speaker: m.username || "Unknown",
            text: m.text || "",
            createdAt: m.createdAt || null
        })),
        queryId: queryId || null,
        queryText: queryText || null
    };
}

/**
 * Puter AI path: Manager–Worker orchestration (hybrid routing, clarification loop, polish step)
 */
class ResearchAIChatBridge {
    /**
     * @param {object} p
     * @param {string} p.message - Full user message (include @ai / @gapDetector etc.)
     * @param {Array} [p.documents] - Current search results (page)
     * @param {object} [p.workspaceHistory]
     * @param {string} [p.workspaceId]
     * @param {string} [p.queryId]
     * @param {string} [p.queryText] - Current search topic (aligns with chat channel key)
     * @param {string} [p.explicitAgentKey] - From UI dropdown when not "manager"
     * @param {Array} [p.recentMessages] - Recent chat messages for workspace context
     */

    async sendResearchRequest({
        message,
        documents,
        workspaceHistory,
        workspaceId,
        queryId,
        queryText,
        explicitAgentKey,
        recentMessages
    }) {
        const safeDocuments = Array.isArray(documents) ? documents : [];
        const artifacts = buildMergedActiveArtifacts(workspaceHistory, queryId);
        const pageArtifacts = buildPageArtifactsFromDocuments(safeDocuments);
        const timeline = buildTimelineFromWorkspaceHistory(workspaceHistory);

        const context = {
            history: buildHistory(workspaceHistory, recentMessages, workspaceId, queryId, queryText),
            artifacts,
            pageArtifacts,
            timeline,
            workspace: {
                id: workspaceId || null,
                name: workspaceHistory?.workspaceName || workspaceHistory?.name || null,
                queryId: queryId || null,
                queryText: queryText || null
            },
            registry: orchestrator.getAgentsMetadata()
        };

        const options = {};
        if (explicitAgentKey && explicitAgentKey !== "manager") 
        {
            options.explicitAgentKey = explicitAgentKey;
        }

        return orchestrator.process(message, context, options);
    }
}

export { ResearchAIChatBridge };
