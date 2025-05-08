FROM node:18-alpine

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala todas as dependências (incluindo devDependencies)
RUN npm install --include=dev

# Copia o código fonte
COPY . .

# Expor a porta
EXPOSE 3001

# Define variáveis de ambiente
ENV NODE_ENV=development

# Inicia a aplicação em modo de desenvolvimento
CMD ["npm", "run", "dev"]
