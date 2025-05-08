import { OpenAIService } from './openai.js';
import { OllamaService } from './ollama.js';

class LLMService {
  constructor() {
    this.ollamaService = new OllamaService();
    this.openaiService = new OpenAIService();
  }

  async generate(prompt, options = {}) {
    console.log('LLMService: Starting generation...');
    
    try {
      // Primeiro tenta usar o Ollama
      const isOllamaAvailable = await this.ollamaService.isAvailable();
      
      if (isOllamaAvailable) {
        console.log('LLMService: Using Ollama...');
        const response = await this.ollamaService.generate(prompt, options);
        
        if (response.success) {
          return response;
        }
        
        console.log('LLMService: Ollama failed, falling back to OpenAI...');
      } else {
        console.log('LLMService: Ollama not available, using OpenAI...');
      }
      
      // Fallback para OpenAI
      if (this.openaiService.isConfigured()) {
        console.log('LLMService: Attempting OpenAI generation...');
        return await this.openaiService.generate(prompt, options);
      }
      
      throw new Error('No LLM service available');
      
    } catch (error) {
      console.error('LLMService: Error in generation:', error.message);
      throw error;
    }
  }
}

export default new LLMService();
