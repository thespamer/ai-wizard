import OpenAI from 'openai';
import { LLM_CONFIG } from './config.js';

export class OpenAIService {
  constructor() {
    this.config = LLM_CONFIG.OPENAI;
    this.client = null;
    this.initializeClient();
  }

  initializeClient() {
    try {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        console.warn('OpenAI: API key not found in environment');
        return;
      }

      this.client = new OpenAI({
        apiKey: apiKey.trim(),
        dangerouslyAllowBrowser: false
      });
    } catch (error) {
      console.error('OpenAI: Error initializing client:', error);
    }
  }

  isConfigured() {
    return this.client !== null && this.config.enabled && process.env.OPENAI_API_KEY;
  }

  async generate(prompt, options = {}) {
    if (!this.isConfigured()) {
      return {
        success: false,
        error: 'OpenAI service is not configured'
      };
    }

    try {
      console.log('OpenAI: Generating response...');
      const response = await this.client.chat.completions.create({
        model: this.config.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: options.temperature || this.config.temperature,
        max_tokens: options.maxTokens || this.config.maxTokens
      });

      console.log('OpenAI: Response generated successfully');
      return {
        success: true,
        text: response.choices[0].message.content,
        usage: response.usage
      };
    } catch (error) {
      console.error('OpenAI: Error generating response:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}
