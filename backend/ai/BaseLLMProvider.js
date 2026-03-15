/**
 * BaseLLMProvider
 * Adapter base class for all LLM providers.
 * Implementations should override the async call(systemPrompt, userPrompt) method.
 */

// BaseLLMProvider class
class BaseLLMProvider 
{
  // eslint-disable-next-line no-unused-vars

  // Call the LLM
  async call(systemPrompt, userPrompt) 
  {
    throw new Error('BaseLLMProvider.call() must be implemented by a subclass');
  }
}

module.exports = BaseLLMProvider;