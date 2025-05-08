import { OllamaService } from './ollama.js';
import { OpenAIService } from './openai.js';
import { LLM_CONFIG } from './config.js';

class LLMService {
  constructor() {
    this.ollamaService = new OllamaService();
    this.openaiService = new OpenAIService();
  }

  async generate(prompt, options = {}) {
    try {
      console.log('LLMService: Starting generation...');
      
      // Tenta primeiro com Ollama
      const ollamaAvailable = await this.ollamaService.isAvailable();
      
      if (ollamaAvailable) {
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

// Singleton instance
export const llmService = new LLMService();
