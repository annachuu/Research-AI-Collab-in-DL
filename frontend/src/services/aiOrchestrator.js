/**
 * Client-side AIOrchestrator — mirrors backend/ai/AIOrchestrator.js (Manager–Worker, hybrid routing).
 */

function extractJsonObject(text) {
    if (text == null) return null;
    const s = String(text).trim();
    if (!s) return null;
    const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
    const candidate = fence ? fence[1].trim() : s;
    const start = candidate.indexOf("{");
    const end = candidate.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) {
        try {
            return JSON.parse(candidate);
        } catch {
            return null;
        }
    }
    try {
        return JSON.parse(candidate.slice(start, end + 1));
    } catch {
        try {
            return JSON.parse(candidate);
        } catch {
            return null;
        }
    }
}

function stripLeadingAgentMention(prompt) {
    return String(prompt || "").replace(/^\s*@\w+\s*/i, "").trim();
}

class AIOrchestrator {
    constructor(llmProvider, options = {}) {
        this.llm = llmProvider;
        this.CONFIDENCE_THRESHOLD = options.confidenceThreshold || 0.7;

        this.agents = {
            reformulator: {
                key: "reformulator",
                name: "Query Reformulator",
                description:
                    "Helps reformulate and expand search queries using IIR-inspired query expansion strategies.",
                instruction:
                    "You are an IIR Expert acting as a Query Reformulator in a prompt-enforced multi-agent simulation. " +
                    "You operate strictly within a Manager–Worker architecture where you are a Worker. " +
                    "Based on the provided WORKSPACE HISTORY (prior queries and chats) and SAVED DOCUMENT ARTIFACTS (titles and abstracts only), " +
                    "and optional PAGE ARTIFACTS (current on-screen search results), " +
                    "suggest 3–5 concrete keyword sets or reformulated queries using query expansion theories from IIR/HCI. " +
                    "Return a response that is directly usable for academic search (e.g., Google Scholar, ACM DL, IEEE Xplore)."
            },

            gapDetector: {
                key: "gapDetector",
                name: "Knowledge Gap Detector",
                description:
                    "Compares user queries against saved documents to highlight missing themes and gaps.",
                instruction:
                    "You are a Knowledge Gap Detector in a prompt-enforced multi-agent simulation. " +
                    "You are a Worker agent; you never re-route or delegate. " +
                    "Compare the USER REQUEST to the SAVED DOCUMENT ABSTRACTS provided (abstracts only for focus). " +
                    "Optional PAGE ABSTRACTS may represent current search results on this screen—use them if relevant. " +
                    "Identify research themes, perspectives, user populations, methods, or theories that appear underrepresented or missing. " +
                    "Reason ONLY from the abstracts provided (do not assume full texts). " +
                    "Produce an explicit list of potential knowledge gaps that could guide future literature search."
            },

            summarizer: {
                key: "summarizer",
                name: "Result Summarizer",
                description:
                    "Synthesizes saved documents into concise comparative summaries for the user.",
                instruction:
                    "You are a Result Summarizer in a prompt-enforced multi-agent simulation. " +
                    "You are a Worker agent; you never re-route or delegate. " +
                    "Use the provided document TITLES and ABSTRACTS (workspace saved and/or current page) to synthesize a structured, comparative summary. " +
                    "Organize your answer as if building a comparative matrix: highlight clusters, contrasts, and notable patterns across documents. " +
                    "Keep the response suitable for an academic research notebook (clear sections, concise prose)."
            }
        };
    }

    getAgentsMetadata() {
        return Object.values(this.agents).map(({ key, name, description }) => ({
            key,
            name,
            description
        }));
    }

    /**
     * @param {string} userPrompt
     * @param {object} context
     * @param {object} options - { explicitAgentKey?: string }
     */
    async process(userPrompt, context = {}, options = {}) {
        const trimmed = (userPrompt || "").trim();
        if (!trimmed) {
            return {
                type: "ERROR",
                content: "Prompt is empty."
            };
        }

        const explicitFromText = this.getExplicitAgentKey(trimmed);
        const explicitFromOptions = options.explicitAgentKey;

        const resolvedExplicit =
            explicitFromOptions ||
            (explicitFromText && explicitFromText !== "manager" ? explicitFromText : null);

        if (resolvedExplicit && this.agents[resolvedExplicit]) {
            return this.executeWorker(this.agents[resolvedExplicit], trimmed, context, {
                explicit: true
            });
        }

        return this.orchestrate(trimmed, context);
    }

    getExplicitAgentKey(prompt) {
        if (!prompt) return null;
        const match = prompt.match(/@(\w+)/);
        if (!match) return null;
        const raw = match[1].toLowerCase();

        if (raw === "ai" || raw === "manager") return "manager";

        if (raw === "gapdetector" || raw === "gap" || raw === "gaps") return "gapDetector";

        if (raw === "reformulator" || raw === "reformulate" || raw === "queryhelper") return "reformulator";

        if (raw === "summarizer" || raw === "summary" || raw === "sum") return "summarizer";

        return null;
    }

    async orchestrate(prompt, context) {
        const managerInstruction =
            "You are the Research Manager in an AI Research Orchestrator using a prompt-enforced multi-agent simulation.\n" +
            "ARCHITECTURE:\n" +
            "- You are the Manager in a Manager–Worker pattern.\n" +
            "- Workers are specialized agents and are described in the \"agents\" registry.\n" +
            "- You NEVER perform the research work yourself; you ONLY decide which worker should act or whether to ask the user for clarification.\n\n" +
            "STATE & CONTEXT:\n" +
            "- You receive a JSON payload containing: { userPrompt, context: { history, artifacts, pageArtifacts, workspace, registry } }.\n" +
            "- history: prior queries and chats in this workspace.\n" +
            "- artifacts: titles and abstracts of saved documents in this workspace.\n" +
            "- pageArtifacts: titles and abstracts from the current on-screen search results (if any).\n" +
            "- registry: metadata about available agents so you know their capabilities.\n" +
            "- You must treat every decision as context-aware and grounded in this information.\n\n" +
            "AGENTS (Workers):\n" +
            JSON.stringify(this.agents) +
            "\n\n" +
            "DECISION TASK:\n" +
            "- Your job is intent classification and routing with a Clarification Loop.\n" +
            "- If the user intent is clear, DELEGATE to exactly one worker.\n" +
            "- If the intent is vague or ambiguous, ask the user for clarification instead of guessing.\n" +
            "- You must assign a numeric confidence \"conf\" between 0 and 1 to your decision.\n" +
            `- The Clarification Loop uses a confidence threshold of ${this.CONFIDENCE_THRESHOLD}. If conf < threshold, you should CLARIFY.\n\n` +
            "RESPONSE FORMAT (JSON ONLY, no prose):\n" +
            "- If intent is clear, respond as:\n" +
            '  {"action":"DELEGATE","agent":"<key>","conf":0.9,"reason":"..."}\n' +
            "- If intent is vague or ambiguous, respond as:\n" +
            '  {"action":"CLARIFY","conf":0.4,"msg":"Ask a clarifying question"}\n';

        const managerPayload = {
            userPrompt: prompt,
            context: {
                history: context.history || [],
                artifacts: context.artifacts || [],
                pageArtifacts: context.pageArtifacts || [],
                workspace: context.workspace || {},
                registry: this.getAgentsMetadata()
            }
        };

        let rawDecision;
        try {
            rawDecision = await this.llm.call(managerInstruction, JSON.stringify(managerPayload));
        } catch {
            const fallbackDecision = this.heuristicManager(prompt);
            return this.applyDecision(fallbackDecision, prompt, context);
        }

        let decision = extractJsonObject(rawDecision);
        if (!decision || typeof decision !== "object") {
            decision = this.heuristicManager(prompt);
        }

        return this.applyDecision(decision, prompt, context);
    }

    heuristicManager(prompt) {
        const lower = (prompt || "").toLowerCase();

        if (lower.includes("gap") || lower.includes("missing")) {
            return { action: "DELEGATE", agent: "gapDetector", conf: 0.9 };
        }

        if (lower.includes("summar") || lower.includes("overview")) {
            return { action: "DELEGATE", agent: "summarizer", conf: 0.9 };
        }

        if (
            lower.includes("keyword") ||
            lower.includes("query") ||
            lower.includes("search term") ||
            lower.includes("reformulat")
        ) {
            return { action: "DELEGATE", agent: "reformulator", conf: 0.9 };
        }

        return {
            action: "CLARIFY",
            conf: 0.4,
            msg: "Are you asking for query reformulation, gap detection, or result summarization?"
        };
    }

    async applyDecision(decision, prompt, context) {
        const conf = typeof decision.conf === "number" ? decision.conf : 0;

        if (
            decision.action === "CLARIFY" ||
            conf < this.CONFIDENCE_THRESHOLD ||
            !decision.agent ||
            !this.agents[decision.agent]
        ) {
            return {
                type: "CLARIFICATION",
                content:
                    decision.msg ||
                    "Could you clarify whether you need query help, a gap analysis, or a result summary?"
            };
        }

        return this.executeWorker(this.agents[decision.agent], prompt, context, {
            explicit: false,
            decision
        });
    }

    async executeWorker(agent, userPrompt, context, meta = {}) {
        const taskPrompt = stripLeadingAgentMention(userPrompt);

        const baseArtifacts = (context.artifacts || []).map((a) => ({
            id: a.id,
            title: a.title,
            abstract: a.abstract || ""
        }));

        const pageArtifacts = (context.pageArtifacts || []).map((a) => ({
            title: a.title,
            abstract: a.abstract || ""
        }));

        const gapAbstractsOnly = {
            workspaceAbstracts: baseArtifacts.map((a) => a.abstract).filter(Boolean),
            pageAbstracts: pageArtifacts.map((a) => a.abstract).filter(Boolean)
        };

        const workerContext =
            agent.key === "gapDetector"
                ? {
                      history: context.history || [],
                      gapAbstractsOnly,
                      workspace: context.workspace || {},
                      meta
                  }
                : {
                      history: context.history || [],
                      artifacts: baseArtifacts,
                      pageArtifacts,
                      workspace: context.workspace || {},
                      meta
                  };

        const workerInput = {
            agent: {
                key: agent.key,
                name: agent.name
            },
            userPrompt: taskPrompt || userPrompt,
            context: workerContext
        };

        let rawResponse;
        try {
            rawResponse = await this.llm.call(agent.instruction, JSON.stringify(workerInput));
        } catch {
            rawResponse = `${agent.name} could not contact the underlying language model.`;
        }

        let polished;
        try {
            polished = await this.llm.call(
                "You are a Senior Academic Editor. Format the following research-oriented response into a concise, structured answer.",
                typeof rawResponse === "string" ? rawResponse : JSON.stringify(rawResponse)
            );
        } catch {
            polished = rawResponse;
        }

        return {
            type: "SUCCESS",
            agent: agent.name,
            agentKey: agent.key,
            content: polished
        };
    }
}

export { AIOrchestrator, stripLeadingAgentMention };
