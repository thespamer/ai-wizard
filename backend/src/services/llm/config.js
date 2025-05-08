import axios from 'axios';
import 'dotenv/config';

export const LLM_CONFIG = {
  // Configuração do modelo local (Ollama)
  LOCAL: {
    enabled: true,
    baseUrl: `http://${process.env.OLLAMA_HOST || 'ollama'}:11434`,  // Usando variável de ambiente ou fallback
    model: 'mistral',
    maxTokens: 4096,
    temperature: 0.7
  },
  
  // Configuração da OpenAI (fallback)
  // O token da OpenAI deve ser definido em uma variável de ambiente (OPENAI_API_KEY)
  OPENAI: {
    enabled: true,
    model: 'gpt-3.5-turbo',
    maxTokens: 4096,
    temperature: 0.7,
    apiKey: process.env.OPENAI_API_KEY || '' // Leia o token da variável de ambiente
  }
};

export class MistralClient {
  async complete(prompt) {
    try {
      console.log('Sending request to Ollama...');
      console.log('Base URL:', LLM_CONFIG.LOCAL.baseUrl);
      console.log('Model:', LLM_CONFIG.LOCAL.model);
      
      const response = await axios.post(`${LLM_CONFIG.LOCAL.baseUrl}/api/generate`, {
        model: LLM_CONFIG.LOCAL.model,
        prompt: prompt,
        stream: false
      }, {
        timeout: 30000, // 30 segundos timeout
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Raw Ollama response:', JSON.stringify(response.data, null, 2));

      // Extrair a resposta completa do Ollama
      if (response.data && response.data.response) {
        return response.data.response;
      } else {
        console.error('Invalid response format:', response.data);
        throw new Error('Invalid response format from Ollama');
      }
    } catch (error) {
      console.error('Error calling Mistral:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', JSON.stringify(error.response.data, null, 2));
      } else if (error.request) {
        console.error('No response received. Request:', error.request);
      }
      throw new Error(`Failed to generate response: ${error.message}`);
    }
  }
}

export const mistralClient = new MistralClient();
