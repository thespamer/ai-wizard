FROM ollama/ollama:latest

# Copiar um script de inicialização
COPY <<EOF /init.sh
#!/bin/sh
ollama pull mistral
ollama serve
EOF

RUN chmod +x /init.sh

# Usar o script de inicialização como comando padrão
CMD ["/init.sh"]
