// Script para testar se a OPENAI_API_KEY está funcionando corretamente
require('dotenv').config();
const axios = require('axios');

async function testOpenAIKey() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('OPENAI_API_KEY não encontrada nas variáveis de ambiente.');
    process.exit(1);
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Você é um assistente útil.' },
          { role: 'user', content: 'Diga olá, mundo!' }
        ],
        max_tokens: 10
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Resposta da OpenAI:', response.data.choices[0].message.content);
  } catch (error) {
    if (error.response) {
      console.error('Erro da API:', error.response.status, error.response.data);
    } else {
      console.error('Erro ao conectar com a OpenAI:', error.message);
    }
    process.exit(1);
  }
}

testOpenAIKey();
