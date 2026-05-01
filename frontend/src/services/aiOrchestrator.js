/**
 * Client-side AIOrchestrator — mirrors backend/ai/AIOrchestrator.js (Manager–Worker, hybrid routing)
 */

function extractJsonObject(text) 
{
    if (text == null) return null;

    const s = String(text).trim();

    if (!s) return null;

    const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
    const candidate = fence ? fence[1].trim() : s;
    const start = candidate.indexOf("{");
    const end = candidate.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) 
    {
        try 
        {
            return JSON.parse(candidate);
        } 
        catch 
        {
            return null;
        }
    }
    try 
    {
        return JSON.parse(candidate.slice(start, end + 1));
    } 
    catch 
    {
        try 
        {
            return JSON.parse(candidate);
        } 
        catch 
        {
            return null;
        }
    }
}

function stripLeadingAgentMention(prompt) 
{
    return String(prompt || "").replace(/^\s*@\w+\s*/i, "").trim();
}

function normalizeUserLabel(value) 
{
    return String(value || "").trim().toLowerCase();
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
                    "You are the Query Reformulator. " +
                    "Use context (history, active saved documents, per-user active saves, and optional page results) to suggest 3-5 practical search query options. " +
                    "Treat the latest chat turns as conversation memory and resolve follow-up references (e.g., 'that', 'those papers', 'the second one') to the prior AI/user turns whenever possible. " +
                    "Do not list who saved what unless the user explicitly asks for user-level saved-document details. " +
                    "If a user mentions a collaborator, match usernames case-insensitively. " +
                    "Return concrete query strings (not generic advice), and include Boolean/operator variants when useful. " +
                    "Keep output concise and directly usable in academic search engines."
            },

            gapDetector: {
                key: "gapDetector",
                name: "Knowledge Gap Detector",
                description:
                    "Compares user queries against saved documents to highlight missing themes and gaps.",
                instruction:
                    "You are the Knowledge Gap Detector. " +
                    "Compare the user request against provided abstracts (active saved docs, per-user active saves, and optional page abstracts). " +
                    "Identify missing or underrepresented themes, methods, populations, or perspectives. " +
                    "Use recent chat turns as memory to answer follow-up questions in context. " +
                    "Do not include per-user save breakdown unless explicitly requested. " +
                    "Match usernames case-insensitively. " +
                    "Return a short, explicit list of actionable gaps."
            },

            summarizer: {
                key: "summarizer",
                name: "Result Summarizer",
                description:
                    "Synthesizes saved documents into concise comparative summaries for the user.",
                instruction:
                    "You are the Result Summarizer. " +
                    "Summarize provided documents into a compact comparative view: key clusters, contrasts, and notable patterns. " +
                    "Use recent chat turns as memory and carry forward referenced items from prior turns when the user asks a follow-up. " +
                    "Do not include 'who saved what' by default; include user-level save details only when explicitly requested. " +
                    "Use save metadata (who saved, when) only when it helps answer the request. " +
                    "Match usernames case-insensitively for user-targeted questions. " +
                    "Keep the response concise and readable."
            }
        };
    }

    buildSavedDocsByUser(timeline = []) {
        if (!Array.isArray(timeline) || timeline.length === 0) return [];

        const byUser = new Map();
        for (const d of timeline) 
        {
            const username = d?.user?.username || d?.userId?.username || d?.username || "Unknown";
            const userId = (d?.user?.id || d?.userId?._id || d?.userId || "").toString() || null;
            const normalizedUsername = normalizeUserLabel(username) || "unknown";
            const key = `${normalizedUsername}::${userId || ""}`;

            if (!byUser.has(key)) 
            {
                byUser.set(key, {
                    user: { id: userId, username, normalizedUsername },
                    active: []
                });
            }

            const entry = byUser.get(key);
            const isRemoved = Boolean(d?.isRemoved ?? d?.doc_isRemoved ?? false);
            const savedByUsername = username || "Unknown";
            const savedAt = d?.createdAt || null;
            const doc = {
                id: (d?.id || d?.documentId || d?._id || "").toString() || null,
                title: d?.title || "Untitled",
                abstract: d?.abstract || d?.doc_abstract || d?.docdata?.Abstract || "",
                createdAt: savedAt,
                savedAt,
                savedBy: {
                    id: userId,
                    username: savedByUsername
                }
            };

            if (!isRemoved) entry.active.push(doc);
        }

        // Keep deterministic ordering, so prompt context remains stable turn-to-turn
        const users = Array.from(byUser.values()).sort((a, b) => {
            const nameA = (a?.user?.username || "").toLowerCase();
            const nameB = (b?.user?.username || "").toLowerCase();
            return nameA.localeCompare(nameB);
        });

        const libraries = users.map((u) => {
            const active = Array.isArray(u.active) ? u.active : [];
            const selected = [...active].sort((a, b) => {
                const ta = new Date(a.createdAt || 0).getTime();
                const tb = new Date(b.createdAt || 0).getTime();
                return tb - ta;
            });

            return {
                user: u.user,
                active: selected
            };
        });

        return {
            users: libraries,
            usernameIndex: libraries.map((u) => ({
                id: u?.user?.id || null,
                username: u?.user?.username || "Unknown",
                normalizedUsername: u?.user?.normalizedUsername || normalizeUserLabel(u?.user?.username || "Unknown"),
                activeCount: Array.isArray(u?.active) ? u.active.length : 0
            }))
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
        if (!trimmed) 
        {
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

        if (resolvedExplicit && this.agents[resolvedExplicit]) 
        {
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
        const savedDocsByUser = this.buildSavedDocsByUser(context.timeline || []);

        const managerInstruction =
            "You are the Research Manager.\n" +
            "Route each request to one worker (reformulator, gapDetector, summarizer) or ask a clarification question.\n\n" +
            "Available context:\n" +
            "- history: recent queries/chats.\n" +
            "- artifacts: active saved docs for this topic (crossed-out removed).\n" +
            "- pageArtifacts: current on-screen search results.\n" +
            "- savedDocsByUser: active saves grouped by user for this topic.\n" +
            "- registry: worker metadata.\n" +
            "- conversation: use prior chat turns for follow-ups and coreference resolution.\n" +
            "- Match usernames case-insensitively.\n\n" +
            "Workers:\n" +
            JSON.stringify(this.agents) +
            "\n\n" +
            "Decision rules:\n" +
            "- If the user intent is clear, delegate to exactly one worker.\n" +
            "- Route to reformulator for requests about query reformulation, better search terms, synonyms, broaden/narrowing scope, Boolean query building, or follow-up requests that continue prior query-suggestion turns.\n" +
            "- Prefer concise answers focused on the user's question.\n" +
            "- Do not force per-user saved-document breakdown unless explicitly requested.\n" +
            `- If confidence is below ${this.CONFIDENCE_THRESHOLD}, ask for clarification.\n` +
            "- Return only JSON (no prose).\n\n" +
            "Response format:\n" +
            '  {"action":"delegate","agent":"<key>","conf":0.9,"reason":"..."}\n' +
            '  {"action":"clarify","conf":0.4,"msg":"Ask a clarifying question"}\n';

        const managerPayload = {
            userPrompt: prompt,
            context: {
                history: context.history || [],
                artifacts: context.artifacts || [],
                pageArtifacts: context.pageArtifacts || [],
                savedDocsByUser,
                workspace: context.workspace || {},
                registry: this.getAgentsMetadata()
            }
        };

        let rawDecision;
        try 
        {
            rawDecision = await this.llm.call(managerInstruction, JSON.stringify(managerPayload));
        } 
        catch 
        {
            const fallbackDecision = this.heuristicManager(prompt);
            return this.applyDecision(fallbackDecision, prompt, context);
        }

        let decision = extractJsonObject(rawDecision);
        if (!decision || typeof decision !== "object") 
        {
            decision = this.heuristicManager(prompt);
        }

        return this.applyDecision(decision, prompt, context);
    }

    heuristicManager(prompt) {
        const lower = (prompt || "").toLowerCase();
        const reformulationHints = [
            "keyword",
            "query",
            "search term",
            "reformulat",
            "search string",
            "boolean",
            "broaden",
            "narrow",
            "expand",
            "refine",
            "improve search",
            "better search"
        ];

        if (lower.includes("gap") || lower.includes("missing")) 
        {
            return { action: "DELEGATE", agent: "gapDetector", conf: 0.9 };
        }

        if (lower.includes("summar") || lower.includes("overview")) 
            {
            return { action: "DELEGATE", agent: "summarizer", conf: 0.9 };
        }

        if (reformulationHints.some((hint) => lower.includes(hint))) 
        {
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

        if (decision.action === "CLARIFY" ||conf < this.CONFIDENCE_THRESHOLD || !decision.agent || !this.agents[decision.agent]) 
        {
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

        const savedDocsByUser = this.buildSavedDocsByUser(context.timeline || []);

        const gapAbstractsOnly = {
            workspaceAbstracts: baseArtifacts.map((a) => a.abstract).filter(Boolean),
            pageAbstracts: pageArtifacts.map((a) => a.abstract).filter(Boolean),
            savedByUserAbstracts: (savedDocsByUser?.users || [])
                .flatMap((u) => [...(u.active || [])])
                .map((d) => d.abstract)
                .filter(Boolean)
        };

        const workerContext =
            agent.key === "gapDetector"
                ? {
                      history: context.history || [],
                      gapAbstractsOnly,
                      savedDocsByUser,
                      workspace: context.workspace || {},
                      meta
                  }
                : {
                      history: context.history || [],
                      artifacts: baseArtifacts,
                      pageArtifacts,
                      savedDocsByUser,
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
        try 
        {
            rawResponse = await this.llm.call(agent.instruction, JSON.stringify(workerInput));
        } 
        catch 
        {
            rawResponse = `${agent.name} could not contact the underlying language model.`;
        }

        let polished;
        try 
        {
            const polishInstruction =
                agent.key === "reformulator"
                    ? "Rewrite for end users: keep only relevant information, preserve conversation continuity when referenced, and output concrete query reformulations (3-5 search-ready query strings). Do not add per-user save breakdown unless explicitly requested."
                    : "Rewrite for end users: keep only information needed for the current question, remove prompt/meta language, maintain continuity with prior turns when referenced, and do not add per-user save breakdown unless explicitly requested. Keep concise with clear sections or bullets.";

            polished = await this.llm.call(
                polishInstruction,
                typeof rawResponse === "string" ? rawResponse : JSON.stringify(rawResponse)
            );
        } 
        catch 
        {
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
