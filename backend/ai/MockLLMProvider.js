const BaseLLMProvider = require('./BaseLLMProvider');

/**
 * MockLLMProvider
 * Lightweight, deterministic implementation used for development and testing.
 * Only the call() method needs to change when swapping to a real provider
 * (OpenAI, Gemini, local model, etc.).
 */

class MockLLMProvider extends BaseLLMProvider 
{
  async call(systemPrompt, userPrompt)
  {
    const system = (systemPrompt || '').toLowerCase();

    // Manager-style routing request
    if (system.includes('research manager')) 
    {
      const text = typeof userPrompt === 'string' ? userPrompt : '';
      let userText = text;

      // Try to parse the user prompt as JSON
      try 
      {
        const parsed = JSON.parse(text);
        // If parsed and parsed.userPrompt, set userText to parsed.userPrompt
        if (parsed && parsed.userPrompt) 
        {
          userText = parsed.userPrompt;
        }
      } 
      catch (e) 
      {
        // If userPrompt is not JSON, fall back to raw text
        userText = text;
      }

      const lower = (userText || '').toLowerCase();

      if (!userText || userText.trim().length < 3) 
      {
        return JSON.stringify({
          action: 'CLARIFY',
          conf: 0.2,
          msg: 'Could you provide a bit more detail about what you need?'
        });
      }

      if (lower.includes('gap') || lower.includes('missing')) 
      {
        return JSON.stringify({ action: 'DELEGATE', agent: 'gapDetector', conf: 0.9 });
      }

      if (lower.includes('summar') || lower.includes('overview')) 
      {
        return JSON.stringify({ action: 'DELEGATE', agent: 'summarizer', conf: 0.9 });
      }

      if (lower.includes('keyword') || lower.includes('query') || lower.includes('search term') ||lower.includes('reformulat')) 
      {
        return JSON.stringify({ action: 'DELEGATE', agent: 'reformulator', conf: 0.9 });
      }

      return JSON.stringify({
        action: 'CLARIFY',
        conf: 0.4,
        msg: 'Are you mainly interested in query reformulation, gap detection, or result summarization?'
      });
    }

    // Worker-style calls (very lightweight placeholders for now)
    if (system.includes('query reformulator') || system.includes('iir expert')) 
    {
      return 'Mock Query Reformulator: placeholder reformulation based on your workspace history and saved documents.';
    }

    if (system.includes('knowledge gap detector')) 
    {
      return 'Mock Knowledge Gap Detector: placeholder list of potential knowledge gaps based on your saved documents.';
    }

    if (system.includes('result summarizer')) 
    {
      return 'Mock Result Summarizer: placeholder high-level summary of your saved documents.';
    }

    if (system.includes('senior academic editor')) 
    {
      return `Edited response (mock): ${typeof userPrompt === 'string' ? userPrompt : JSON.stringify(userPrompt)}`;
    }

    return 'Mock LLM response.';
  }
}

module.exports = MockLLMProvider;

