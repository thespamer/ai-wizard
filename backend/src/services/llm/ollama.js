import axios from 'axios';
import { LLM_CONFIG, MistralClient } from './config.js';

export class OllamaService {
  constructor() {
    this.config = LLM_CONFIG.LOCAL;
    this.mistralClient = new MistralClient();
    this.client = axios.create({
      baseURL: this.config.baseUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 120000, // 2 minutes
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });
  }

  async isAvailable() {
    try {
      console.log('Checking Ollama availability...');
      console.log('Base URL:', this.config.baseUrl);
      
      const response = await this.client.get('/');
      console.log('Ollama is available:', response.status);
      return true;
    } catch (error) {
      console.error('Ollama is not available:', error.message);
      if (error.code === 'ECONNREFUSED') {
        console.error('Connection refused. Is Ollama running?');
      }
      return false;
    }
  }

  async generate(prompt, options = {}) {
    try {
      console.log('OllamaService: Initiating request...');
      const response = await this.mistralClient.complete(prompt);
      console.log('OllamaService: Response received successfully');

      return {
        success: true,
        text: response,
        usage: {
          prompt_tokens: 0,  // Ollama não fornece estas métricas
          completion_tokens: 0
        }
      };
    } catch (error) {
      console.error('OllamaService: Error generating response:', error.message);
      return {
        success: false,
        error: error.message || 'Erro ao gerar resposta'
      };
    }
  }
}
