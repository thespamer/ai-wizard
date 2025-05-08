import axios from 'axios';

const testOllama = async () => {
  try {
    console.log('Testing Ollama connection...');
    
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'mistral',
      prompt: 'Return a simple JSON response like this: {"test": "success"}',
      stream: false
    });

    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
};

testOllama();
