from dotenv import load_dotenv
load_dotenv()
import os
import requests

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

if not OPENAI_API_KEY:
    print('OPENAI_API_KEY não encontrada nas variáveis de ambiente.')
    exit(1)

headers = {
    'Authorization': f'Bearer {OPENAI_API_KEY}',
    'Content-Type': 'application/json'
}
data = {
    'model': 'gpt-3.5-turbo',
    'messages': [
        {'role': 'system', 'content': 'Você é um assistente útil.'},
        {'role': 'user', 'content': 'Diga olá, mundo!'}
    ],
    'max_tokens': 10
}

try:
    response = requests.post('https://api.openai.com/v1/chat/completions', json=data, headers=headers)
    response.raise_for_status()
    result = response.json()
    print('Resposta da OpenAI:', result['choices'][0]['message']['content'])
except requests.exceptions.HTTPError as errh:
    print('Erro HTTP:', errh)
    print('Resposta da API:', response.text)
    exit(1)
except Exception as e:
    print('Erro ao conectar com a OpenAI:', str(e))
    exit(1)
