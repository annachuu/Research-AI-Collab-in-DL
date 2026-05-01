/**
 * Puter-backed LLM adapter (BaseLLM pattern): swap implementations by changing call()
 */

// eslint-disable-next-line class-methods-use-this
class PuterAIModel {
    async chat(prompt, options = {}) {
        if (typeof window === "undefined" || !window.puter || !window.puter.ai || !window.puter.ai.chat) 
        {
            throw new Error("Puter AI is not available. Please ensure the script is loaded.");
        }
        const aiResponse = await window.puter.ai.chat(prompt, options);

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

/**
 * Implements the same contract as backend BaseLLMProvider.call(systemPrompt, userPrompt).
 */
class PuterLLMProvider 
{
    constructor(options = {}) {
        this.model = new PuterAIModel();
        this.defaultModel = options.model || "gpt-5-nano";
    }

    async call(systemPrompt, userPrompt) {
        const user =
            typeof userPrompt === "string" ? userPrompt : JSON.stringify(userPrompt);
        const combined =
            `SYSTEM INSTRUCTIONS:\n${systemPrompt}\n\nUSER CONTENT:\n${user}`;
        return this.model.chat(combined, { model: this.defaultModel });
    }
}

export { PuterAIModel, PuterLLMProvider };
