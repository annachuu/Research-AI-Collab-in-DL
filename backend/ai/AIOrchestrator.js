/**
 * AIOrchestrator
 * Manager–Worker style orchestrator for research-focused AI agents
 *
 * Manager (implicit routing when users type @ai)
 * Workers:
 *   - Reformulator
 *   - Knowledge Gap Detector
 *   - Result Summarizer
 */
class AIOrchestrator {
  constructor(llmProvider, options = {}) {
    this.llm = llmProvider;
    this.CONFIDENCE_THRESHOLD = options.confidenceThreshold || 0.7;

    this.agents = {
      // Reformulator
      reformulator: {
        key: 'reformulator',
        name: 'Query Reformulator',
        description: 'Helps reformulate and expand search queries using IIR-inspired query expansion strategies.',
        instruction:
          'You are an IIR Expert acting as a Query Reformulator in a prompt-enforced multi-agent simulation. ' +
          'You operate strictly within a Manager–Worker architecture where you are a Worker. ' +
          'Based on the provided WORKSPACE HISTORY (prior queries and chats) and SAVED DOCUMENT ARTIFACTS (titles and abstracts only), ' +
          'suggest 3–5 concrete keyword sets or reformulated queries using query expansion theories from IIR/HCI. ' +
          'Return a response that is directly usable for academic search (e.g., Google Scholar, ACM DL, IEEE Xplore).'
      },

      // Knowledge Gap Detector
      gapDetector: {
        key: 'gapDetector',
        name: 'Knowledge Gap Detector',
        description:
          'Compares user queries against saved documents to highlight missing themes and gaps.',
        instruction:
          'You are a Knowledge Gap Detector in a prompt-enforced multi-agent simulation. ' +
          'You are a Worker agent; you never re-route or delegate. ' +
          'Compare the USER REQUEST to gapAbstractsOnly.workspaceAbstracts and optional gapAbstractsOnly.pageAbstracts (abstract text only). ' +
          'Identify research themes, perspectives, user populations, methods, or theories that appear underrepresented or missing. ' +
          'Focus your reasoning ONLY on the abstracts provided (do not assume access to full texts). ' +
          'Produce an explicit list of potential knowledge gaps that could guide future literature search.'
      },

      // Result Summarizer
      summarizer: {
        key: 'summarizer',
        name: 'Result Summarizer',
        description:
          'Synthesizes saved documents into concise comparative summaries for the user.',
        instruction:
          'You are a Result Summarizer in a prompt-enforced multi-agent simulation. ' +
          'You are a Worker agent; you never re-route or delegate. ' +
          'Use the provided document TITLES and ABSTRACTS to synthesize a structured, comparative summary. ' +
          'Organize your answer as if building a comparative matrix: highlight clusters, contrasts, and notable patterns across documents. ' +
          'Keep the response suitable for an academic research notebook (clear sections, concise prose).'
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


  // Main entry point
  /**
   * Main entry point.
   * @param {string} userPrompt - Raw user input (e.g. "@ai what is missing?")
   * @param {object} context - { history, artifacts, workspace, registry }
   * @param {object} options - { explicitAgentKey?: string }
   */
  async process(userPrompt, context = {}, options = {}) 
  {
    const trimmed = (userPrompt || '').trim();
    if (!trimmed) {
      return {
        type: 'ERROR',
        content: 'Prompt is empty.'
      };
    }

    const explicitFromText = this.getExplicitAgentKey(trimmed);
    const explicitFromOptions = options.explicitAgentKey;

    const resolvedExplicit =
      explicitFromOptions ||
      (explicitFromText && explicitFromText !== 'manager' ? explicitFromText : null);

    // Explicit routing: @gapDetector, @reformulator, @summarizer, or explicit option
    if (resolvedExplicit && this.agents[resolvedExplicit]) 
    {
      return this.executeWorker(this.agents[resolvedExplicit], trimmed, context, {
        explicit: true
      });
    }

    // Implicit routing via Manager for @ai or general requests
    return this.orchestrate(trimmed, context);
  }

  /**
   * Extract explicit agent key from a tagged prompt (e.g., "@gapDetector ...").
   */
  getExplicitAgentKey(prompt) {
    // If no prompt, return null
    if (!prompt) return null;
    const match = prompt.match(/@(\w+)/);
    
    // If no match, return null
    if (!match) return null;
    const raw = match[1].toLowerCase();


    // If raw is ai or manager, return manager
    if (raw === 'ai' || raw === 'manager') return 'manager';
    
    // If raw is gapdetector or gap or gaps, return gapDetector
    if (raw === 'gapdetector' || raw === 'gap' || raw === 'gaps') return 'gapDetector';

    // If raw is reformulator or reformulate or queryhelper, return reformulator
    if (raw === 'reformulator' || raw === 'reformulate' || raw === 'queryhelper') return 'reformulator';

    // If raw is summarizer or summary or sum, return summarizer
    if (raw === 'summarizer' || raw === 'summary' || raw === 'sum') return 'summarizer';

    return null;
  }

  // Orchestrate the request
  async orchestrate(prompt, context) 
  {
    const managerInstruction =
      'You are the Research Manager in an AI Research Orchestrator using a prompt-enforced multi-agent simulation.\n' +
      'ARCHITECTURE:\n' +
      '- You are the Manager in a Manager–Worker pattern.\n' +
      '- Workers are specialized agents and are described in the "agents" registry.\n' +
      '- You NEVER perform the research work yourself; you ONLY decide which worker should act or whether to ask the user for clarification.\n\n' +
      'STATE & CONTEXT:\n' +
      '- You receive a JSON payload containing: { userPrompt, context: { history, artifacts, pageArtifacts, workspace, registry } }.\n' +
      '- history: prior queries and chats in this workspace.\n' +
      '- artifacts: titles and abstracts of saved documents in this workspace.\n' +
      '- pageArtifacts: optional titles and abstracts from a client-side search view when provided.\n' +
      '- registry: metadata about available agents so you know their capabilities.\n' +
      '- You must treat every decision as context-aware and grounded in this information.\n\n' +
      'AGENTS (Workers):\n' +
      JSON.stringify(this.agents) +
      '\n\n' +
      'DECISION TASK:\n' +
      '- Your job is intent classification and routing with a Clarification Loop.\n' +
      '- If the user intent is clear, DELEGATE to exactly one worker.\n' +
      '- If the intent is vague or ambiguous, ask the user for clarification instead of guessing.\n' +
      '- You must assign a numeric confidence "conf" between 0 and 1 to your decision.\n' +
      `- The Clarification Loop uses a confidence threshold of ${this.CONFIDENCE_THRESHOLD}. If conf < threshold, you should CLARIFY.\n\n` +
      'RESPONSE FORMAT (JSON ONLY, no prose):\n' +
      '- If intent is clear, respond as:\n' +
      '  {"action":"DELEGATE","agent":"<key>","conf":0.9,"reason":"..."}\n' +
      '- If intent is vague or ambiguous, respond as:\n' +
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
    try 
    {
      rawDecision = await this.llm.call(managerInstruction, JSON.stringify(managerPayload));
    } 
    catch (error) 
    {
      // Fallback to heuristic routing if LLM is unavailable
      const fallbackDecision = this.heuristicManager(prompt);
      return this.applyDecision(fallbackDecision, prompt, context);
    }

    let decision;
    try 
    {
      decision =
        typeof rawDecision === 'string' && rawDecision.trim().length
          ? JSON.parse(rawDecision)
          : rawDecision;
    } 
    catch (error) 
    {
      decision = this.heuristicManager(prompt);
    }

    return this.applyDecision(decision, prompt, context);
  }

  heuristicManager(prompt) {
    const lower = (prompt || '').toLowerCase();

    if (lower.includes('gap') || lower.includes('missing')) 
    {
      return { action: 'DELEGATE', agent: 'gapDetector', conf: 0.9 };
    }

    if (lower.includes('summar') || lower.includes('overview')) 
    {
      return { action: 'DELEGATE', agent: 'summarizer', conf: 0.9 };
    }

    if (lower.includes('keyword') || lower.includes('query') || lower.includes('search term') || lower.includes('reformulat')) 
    {
      return { action: 'DELEGATE', agent: 'reformulator', conf: 0.9 };
    }

    return {
      action: 'CLARIFY',
      conf: 0.4,
      msg: 'Are you asking for query reformulation, gap detection, or result summarization?'
    };
  }

  async applyDecision(decision, prompt, context) {
    const conf = typeof decision.conf === 'number' ? decision.conf : 0;

    if (decision.action === 'CLARIFY' || conf < this.CONFIDENCE_THRESHOLD || !decision.agent ||!this.agents[decision.agent]) 
    {
      return {
        type: 'CLARIFICATION',
        content:
          decision.msg ||
          'Could you clarify whether you need query help, a gap analysis, or a result summary?'
      };
    }

    return this.executeWorker(this.agents[decision.agent], prompt, context, {
      explicit: false,
      decision
    });
  }

  async executeWorker(agent, userPrompt, context, meta = {}) 
  {
    // note: workerInput is intentionally narrow to keep requests context-aware but token-efficient.
    // For gapDetector, send abstracts only (plus optional page abstracts) to save tokens and maintain focus.
    const baseArtifacts = (context.artifacts || []).map((a) => ({
      id: a.id,
      title: a.title,
      abstract: a.abstract
    }));
    const pageArtifacts = (context.pageArtifacts || []).map((a) => ({
      title: a.title,
      abstract: a.abstract
    }));

    const gapAbstractsOnly =
      agent.key === 'gapDetector'
        ? {
            workspaceAbstracts: baseArtifacts.map((a) => a.abstract).filter(Boolean),
            pageAbstracts: pageArtifacts.map((a) => a.abstract).filter(Boolean)
          }
        : null;

    const workerContext =
      agent.key === 'gapDetector'
        ? {
            history: context.history || [],
            gapAbstractsOnly,
            workspace: context.workspace || {}
          }
        : {
            history: context.history || [],
            artifacts: baseArtifacts,
            pageArtifacts,
            workspace: context.workspace || {}
          };

    const workerInput = {
      agent: {
        key: agent.key,
        name: agent.name
      },
      userPrompt: userPrompt.replace(/^\s*@\w+\s*/i, '').trim() || userPrompt,
      context: workerContext,
      meta
    };

    let rawResponse;
    try 
    {
      rawResponse = await this.llm.call(agent.instruction, JSON.stringify(workerInput));
    } 
    catch (error) 
    {
      rawResponse = `${agent.name} could not contact the underlying language model.`;
    }

    let polished;
    try 
    {
      polished = await this.llm.call(
        'You are a Senior Academic Editor. Format the following research-oriented response into a concise, structured answer.',
        typeof rawResponse === 'string' ? rawResponse : JSON.stringify(rawResponse)
      );
    } 
    catch (error) 
    {
      polished = rawResponse;
    }

    return {
      type: 'SUCCESS',
      agent: agent.name,
      agentKey: agent.key,
      content: polished
    };
  }
}

module.exports = AIOrchestrator;

