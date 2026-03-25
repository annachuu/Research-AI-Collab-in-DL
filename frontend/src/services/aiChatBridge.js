import axios from 'axios';

// Base abstraction for an AI model
class AIModel {
    // eslint-disable-next-line class-methods-use-this, no-unused-vars
    async chat(prompt, options = {}) 
    {
        throw new Error("AIModel.chat() must be implemented by subclasses");
    }
}

// Concrete implementation that talks to Puter AI in the browser
class PuterAIModel extends AIModel {
    async chat(prompt, options = {}) {
        if (typeof window === "undefined" || !window.puter || !window.puter.ai || !window.puter.ai.chat) 
        {
            throw new Error("Puter AI is not available. Please ensure the script is loaded.");
        }
        const aiResponse = await window.puter.ai.chat(prompt, options);

        // Puter returns either a plain string or an object; normalize to string
        if (typeof aiResponse === "string") 
        {
            return aiResponse;
        }
        if (aiResponse && typeof aiResponse === "object" && aiResponse.success === false)
        {
            throw new Error(aiResponse.error || "AI request failed");
        }
        return aiResponse?.message?.content || aiResponse?.content || "I'm sorry, I couldn't generate a response.";
    }
}

// Proxy that sits between callers and the underlying AI model
// it applies prompt engg logic: decides if a question is
// clear or unclear, and adjusts the system prompt accordingly
class AIModelProxy extends AIModel 
{
    constructor(realModel) {
        super();        // call the parent class constructor
        this.realModel = realModel;
    }

    isQuestionClear(userPrompt) {
        const text = (userPrompt || "").trim();
        if (!text) return false;

        // very short inputs are usually unclear
        if (text.length < 15) return false;

        const hasQuestionMark = text.includes("?");
        const hasQuestionWord = /(^|\s)(who|what|when|where|why|how|which|explain|describe)(\s|$)/i.test(text);

        // treat it as clear if it looks like a proper question
        return hasQuestionMark || hasQuestionWord;
    }

    // Build the final prompt shown to the model, injecting
    // behavior depending on whether the user's request is clear.
    buildProxyPrompt({
        baseSystemPrompt,
        agentRoleText,
        workspaceHistoryContext,
        documentsContext,
        userPrompt,
        agentKeyToUse
    }) {
        // For summarizer we usually don't want extra clarification,
        // we just summarize what is given.
        const clear =
            agentKeyToUse === "summarizer"
                ? true
                : this.isQuestionClear(userPrompt);

        const clarityInstruction = clear
            ? "The user's question is clear. Answer it directly, concretely, and concisely."
            : "The user's question is vague or underspecified. Ask exactly ONE short clarifying question and DO NOT attempt a full answer yet.";

        let fullPrompt = `${baseSystemPrompt}\n\n${agentRoleText}\n\n${clarityInstruction}\n\n`;

        if (workspaceHistoryContext) 
        {
            fullPrompt += `WORKSPACE AND QUERY HISTORY:\n`;
            fullPrompt += `This workspace contains a history of previous search queries and documents (both saved and deleted).\n`;
            fullPrompt += `${workspaceHistoryContext}\n\n`;
        }

        if (documentsContext) 
        {
            fullPrompt += `CURRENT SEARCH RESULTS (documents from this page):\n`;
            fullPrompt += `${documentsContext}\n\n`;
        }

        fullPrompt += `USER REQUEST: ${userPrompt}\n\n`;

        return fullPrompt;
    }

    async chat(structuredPrompt, options = {}) 
    {
        const prompt = this.buildProxyPrompt(structuredPrompt);
        return this.realModel.chat(prompt, options);
    }
}

// Helper function to format documents for AI context
const formatDocumentsForAI = (documents) => {
    if (!documents || !Array.isArray(documents) || documents.length === 0) 
    {
        return "No documents available.";
    }

    try 
    {
        return documents
            .map((doc, index) => {
                if (!doc || typeof doc !== "object") 
                {
                    return `Document ${index + 1}: Invalid document data`;
                }

                const title = doc.pnx?.display?.title?.[0] || doc.pnx?.display?.title || "Untitled";

                const authors = doc.pnx?.addata?.au
                    ? Array.isArray(doc.pnx.addata.au)
                        ? doc.pnx.addata.au.join(", ")
                        : doc.pnx.addata.au
                    : doc.pnx?.addata?.addau
                        ? Array.isArray(doc.pnx.addata.addau)
                            ? doc.pnx.addata.addau.join(", ")
                            : doc.pnx.addata.addau
                        : "Unknown authors";

                const abstract = doc.pnx?.addata?.abstract?.[0] || doc.pnx?.addata?.abstract || "No abstract available";
                const type = doc.pnx?.display?.type || "Unknown type";
                const date = doc.pnx?.display?.creationdate || doc.pnx?.facets?.creationdate || "Unknown date";

                return `Document ${index + 1}:
                Title: ${title}
                Authors: ${authors}
                Type: ${type}
                Date: ${date}
                Abstract: ${abstract}`;
            })
            .join("\n\n");
    } 
    catch (error) 
    {
        // eslint-disable-next-line no-console
        console.error("Error formatting documents for AI:", error);
        return "Error formatting documents.";
    }
};

// Helper function to format workspace history (queries and documents) for context for the AI
const formatWorkspaceHistoryForAI = (workspaceHistory) => {
    if (!workspaceHistory || !Array.isArray(workspaceHistory.queries) || workspaceHistory.queries.length === 0) 
    {
        return "No workspace history available.";
    }

    try 
    {
        const workspaceName = workspaceHistory.workspaceName || workspaceHistory.name || "Unknown Workspace";
        let historyText = `WORKSPACE HISTORY: "${workspaceName}"\n`;
        historyText += `Total Queries: ${workspaceHistory.queries.length}\n\n`;

        return workspaceHistory.queries
            .map((query, queryIndex) => {
                const queryText = query.query || query.queryName || "Untitled Query";
                const queryDate = query.createdAt ? new Date(query.createdAt).toLocaleDateString() : "Unknown date";
                const documents = Array.isArray(query.documents) ? query.documents : [];

                const savedDocs = documents.filter((doc) => !doc.doc_isRemoved && !doc.isRemoved);
                const deletedDocs = documents.filter((doc) => doc.doc_isRemoved || doc.isRemoved);

                let queryHistory = `Query ${queryIndex + 1}: "${queryText}" (Created: ${queryDate})\n`;
                queryHistory += `  - Saved Documents: ${savedDocs.length}\n`;
                queryHistory += `  - Deleted/Removed Documents: ${deletedDocs.length}\n`;

                if (savedDocs.length > 0) 
                {
                    queryHistory += `  Saved Documents Details:\n`;
                    savedDocs.forEach((doc, docIndex) => {
                        const title = doc.title || "Untitled";
                        const authors = Array.isArray(doc.doc_authors)
                            ? doc.doc_authors.join(", ")
                            : doc.doc_authors || "Unknown authors";
                        const abstract = doc.doc_abstract || "No abstract available";
                        queryHistory += `    ${docIndex + 1}. "${title}" by ${authors}\n`;
                        queryHistory += `       Abstract: ${abstract.substring(0, 150)}${
                            abstract.length > 150 ? "..." : ""
                        }\n`;
                    });
                }

                if (deletedDocs.length > 0) 
                {
                    queryHistory += `  Deleted Documents (for reference):\n`;
                    deletedDocs.forEach((doc, docIndex) => {
                        const title = doc.title || "Untitled";
                        const authors = Array.isArray(doc.doc_authors)
                            ? doc.doc_authors.join(", ")
                            : doc.doc_authors || "Unknown authors";
                        queryHistory += `    ${docIndex + 1}. "${title}" by ${authors} [DELETED]\n`;
                    });
                }

                return queryHistory;
            })
            .join("\n\n");
    } 
    catch (error) 
    {
        // eslint-disable-next-line no-console
        console.error("Error formatting workspace history for AI:", error);
        return "Error formatting workspace history.";
    }
};

// Bridge: separates the chat UI (abstraction) from the AI implementation.
// Chat components call this class instead of talking directly to Puter AI.
class ResearchAIChatBridge 
{
    constructor() 
    {
        const realModel = new PuterAIModel();
        this.model = new AIModelProxy(realModel);
    }

    // High-level entry point used by the chat UI.
    // Decides which agent role text to use, prepares context,
    // and forwards a structured prompt to the proxy/model.
    async sendResearchRequest({ agentKeyToUse, aiPrompt, documents, workspaceHistory }) 
    {
        const safeDocuments = Array.isArray(documents) ? documents : [];
        const docsForAI = safeDocuments;

        const documentsContext = formatDocumentsForAI(docsForAI);
        const workspaceHistoryContext = workspaceHistory ? formatWorkspaceHistoryForAI(workspaceHistory) : "";

        const baseSystemPrompt =
            "You are an AI assistant helping users with research and document analysis.";

        let agentRoleText = "";
        if (agentKeyToUse === "reformulator") 
        {
            agentRoleText =
                "ROLE: Query Reformulator.\n" +
                "You are an IIR expert. Based on the history and saved documents, " +
                "suggest 3-5 improved search queries or keyword sets.";
        } 
        else if (agentKeyToUse === "gapDetector") 
        {
            agentRoleText =
                "ROLE: Knowledge Gap Detector.\n" +
                "Compare the user's request with the titles and abstracts of saved documents. " +
                "Identify missing or underrepresented themes, methods, or perspectives.";
        } 
        else if (agentKeyToUse === "summarizer") 
        {
            agentRoleText =
                "ROLE: Result Summarizer.\n" +
                "Synthesize the provided document titles and abstracts into a concise, comparative summary of main themes.";
        } 
        else 
        {
            agentRoleText =
                "ROLE: Research Manager.\n" +
                "You can behave as a Query Reformulator, Knowledge Gap Detector, or Result Summarizer. " +
                "Choose the most helpful perspective for the user.";
        }

        const structuredPrompt = {
            baseSystemPrompt,
            agentRoleText,
            workspaceHistoryContext,
            documentsContext,
            userPrompt: aiPrompt,
            agentKeyToUse
        };

        return this.model.chat(structuredPrompt, { model: "gpt-5-nano" });
    }
}

export { ResearchAIChatBridge };

