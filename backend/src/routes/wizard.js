import express from 'express';
import Joi from 'joi';
import { llmService } from '../services/llm/index.js';
import { validateProjectData } from '../validators/projectValidator.js';

const router = express.Router();

// Schema de validação para informações iniciais do projeto
const projectInfoSchema = Joi.object({
  nomeProduto: Joi.string().required(),
  descricao: Joi.string().required(),
  publicoAlvo: Joi.string().required(),
  funcionalidadesPrincipais: Joi.array().items(Joi.string()).min(1).required(),
  tecnologiasPreferidas: Joi.object({
    frontend: Joi.string().allow('').optional(),
    backend: Joi.string().allow('').optional()
  }).optional()
});

// Rota para iniciar o wizard
router.post('/iniciar', async (req, res) => {
  try {
    console.log('Received project data:', JSON.stringify(req.body, null, 2));
    
    const { error, value } = projectInfoSchema.validate(req.body);
    
    if (error) {
      console.log('Validation error:', error.details);
      return res.status(400).json({
        error: 'Dados inválidos',
        details: error.details,
      });
    }

    // TODO: Implementar lógica de geração de arquitetura
    const sessaoWizard = {
      id: Date.now().toString(),
      dados: value,
      etapaAtual: 1,
      totalEtapas: 4,
    };

    res.json({
      mensagem: 'Wizard iniciado com sucesso',
      sessao: sessaoWizard,
    });
  } catch (err) {
    console.error('Erro na rota /iniciar:', err);
    res.status(500).json({
      error: 'Erro ao iniciar o wizard',
      message: err.message,
    });
  }
});

// Rota para gerar arquitetura
router.post('/gerar-arquitetura', async (req, res) => {
  try {
    // TODO: Implementar geração de arquitetura baseada nos requisitos
    res.json({
      mensagem: 'Arquitetura gerada com sucesso',
      // Adicionar detalhes da arquitetura gerada
    });
  } catch (err) {
    console.error('Erro na rota /gerar-arquitetura:', err);
    res.status(500).json({
      error: 'Erro ao gerar arquitetura',
      message: err.message,
    });
  }
});

// Rota para estimar custos
router.post('/estimar-custos', async (req, res) => {
  try {
    // TODO: Implementar estimativa de custos em diferentes clouds
    res.json({
      mensagem: 'Estimativa de custos gerada',
      // Adicionar detalhes das estimativas
    });
  } catch (err) {
    console.error('Erro na rota /estimar-custos:', err);
    res.status(500).json({
      error: 'Erro ao estimar custos',
      message: err.message,
    });
  }
});

// Rota para gerar código
router.post('/gerar-codigo', async (req, res) => {
  try {
    // TODO: Implementar geração de código
    res.json({
      mensagem: 'Código gerado com sucesso',
      // Adicionar links para download dos arquivos
    });
  } catch (err) {
    console.error('Erro na rota /gerar-codigo:', err);
    res.status(500).json({
      error: 'Erro ao gerar código',
      message: err.message,
    });
  }
});

// Rota para gerar código baseado nos requisitos do projeto
router.post('/generate', async (req, res) => {
  try {
    console.log('Received request at /generate');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    const projectData = req.body;
    if (!projectData) {
      console.error('No project data received');
      return res.status(400).json({
        error: 'Dados do projeto não fornecidos',
        details: 'O corpo da requisição está vazio'
      });
    }
    
    // Valida os dados do projeto
    const { error } = validateProjectData(projectData);
    if (error) {
      console.error('Validation error:', JSON.stringify(error.details, null, 2));
      return res.status(400).json({
        error: 'Dados do projeto inválidos',
        details: error.details
      });
    }

    // Prepara o prompt para análise do negócio e sugestão de arquitetura
    console.log('Preparing business analysis prompt...');
    const analysisPrompt = `
      Realize uma análise detalhada do seguinte projeto e proponha uma arquitetura completa:

      Nome do Produto: ${projectData.nomeProduto}
      Descrição: ${projectData.descricao}
      Público Alvo: ${projectData.publicoAlvo}

      Funcionalidades Principais:
      ${Array.isArray(projectData.funcionalidadesPrincipais) ? projectData.funcionalidadesPrincipais.map(f => `- ${f}`).join('\n') : '- Nenhuma funcionalidade especificada'}

      Análise Requerida:

      1. Arquitetura e Componentes:
         - Identifique todos os componentes principais necessários
         - Defina a arquitetura mais adequada (monolítica, microsserviços, etc.)
         - Especifique padrões de design e boas práticas a serem seguidos

      2. Frontend:
         - Estrutura de componentes e páginas
         - Estratégia de gerenciamento de estado
         - Abordagem para UI/UX
         - Responsividade e acessibilidade

      3. Backend:
         - Design da API e endpoints necessários
         - Estrutura do banco de dados
         - Camadas de serviço e regras de negócio
         - Integrações externas necessárias

      4. Segurança:
         - Estratégia de autenticação e autorização
         - Proteção contra vulnerabilidades comuns
         - Segurança de dados e conformidade

      5. Escalabilidade e Performance:
         - Estratégias de cache
         - Otimização de performance
         - Estratégias de deploy e CI/CD

      6. Monitoramento e Manutenção:
         - Logging e monitoramento
         - Backup e recuperação
         - Documentação

      Tecnologias Preferidas (se especificadas):
      Frontend: ${(projectData.tecnologiasPreferidas && projectData.tecnologiasPreferidas.frontend) || 'a ser sugerido'}
      Backend: ${(projectData.tecnologiasPreferidas && projectData.tecnologiasPreferidas.backend) || 'a ser sugerido'}

      Por favor, forneça uma análise detalhada e recomendações específicas para cada aspecto mencionado acima.
      Suas recomendações devem ser práticas, implementáveis e alinhadas com as melhores práticas da indústria.
      Database: ${projectData.tecnologiasPreferidas?.database || 'a ser sugerido'}
      Cloud: ${projectData.preferenciaCloud}

      Por favor, forneça uma análise detalhada e recomendações em formato JSON com as seguintes seções:
      1. analise_negocio: Análise das necessidades do negócio
      2. arquitetura_recomendada: Detalhes da arquitetura sugerida
      3. componentes: Lista de componentes necessários
      4. padroes_design: Padrões de design recomendados
      5. consideracoes_seguranca: Aspectos de segurança importantes
      6. estrutura_projeto: Estrutura de diretórios e arquivos sugerida
    `;
    console.log('Generated analysis prompt');

    // Gera a análise usando o LLM
    console.log('Calling LLM service for analysis...');
    const analysisResult = await llmService.generate(analysisPrompt, {
      temperature: 0.7,
      maxTokens: 3072
    });

    if (!analysisResult.success) {
      console.error('LLM service error during analysis:', analysisResult.error);
      throw new Error(analysisResult.error || 'Erro na análise do projeto');
    }

    // Processa a análise e gera a estrutura do projeto
    const projectStructure = processAnalysisResponse(analysisResult.text);

    // Gera o prompt para o código baseado na análise
    const codePrompt = generateCodePrompt(projectStructure);
    
    // Gera o código usando o LLM
    console.log('Calling LLM service for code generation...');
    const codeResult = await llmService.generate(codePrompt, {
      temperature: 0.7,
      maxTokens: 3072
    });

    if (!codeResult.success) {
      console.error('LLM service error during code generation:', codeResult.error);
      throw new Error(codeResult.error || 'Erro ao gerar código');
    }

    // Processa a resposta do LLM e prepara os arquivos
    const files = processCodeResponse(codeResult.text, projectStructure);

    // Retorna os arquivos gerados junto com a análise
    res.json({
      success: true,
      analysis: projectStructure,
      files,
      message: 'Análise e código gerados com sucesso'
    });

  } catch (error) {
    console.error('Erro na geração de código:', error);
    res.status(500).json({
      error: 'Erro ao gerar código',
      message: error.message
    });
  }
});

// Função para processar a resposta da análise do LLM
function processAnalysisResponse(text) {
  try {
    // Tenta fazer parse do JSON da resposta
    const analysis = JSON.parse(text);
    
    // Valida se todas as seções necessárias estão presentes
    const requiredSections = [
      'analise_negocio',
      'arquitetura_recomendada',
      'componentes',
      'padroes_design',
      'consideracoes_seguranca',
      'estrutura_projeto'
    ];

    for (const section of requiredSections) {
      if (!analysis[section]) {
        throw new Error(`Seção ${section} não encontrada na análise`);
      }
    }

    return analysis;
  } catch (error) {
    console.error('Erro ao processar análise:', error);
    throw new Error('Falha ao processar a análise do projeto');
  }
}

// Função para gerar o prompt de código baseado na análise
function generateCodePrompt(analysis) {
  return `
    Com base na seguinte análise de projeto, gere o código necessário:

    ${JSON.stringify(analysis, null, 2)}

    Requisitos obrigatórios para o código gerado:

    1. Estrutura de Arquivos:
       - Organização clara de diretórios (src/, components/, services/, etc.)
       - Arquivos de configuração (package.json, README.md, .env.example, etc.)
       - Arquivos de documentação

    2. Frontend:
       - Componentes React reutilizáveis
       - Gerenciamento de estado (Context API ou Redux)
       - Roteamento com React Router
       - Validação de formulários
       - Tratamento de erros
       - Feedback visual para o usuário
       - Responsividade e design moderno

    3. Backend:
       - Arquitetura MVC ou similar
       - Middleware de autenticação e autorização
       - Validação de dados
       - Tratamento de erros
       - Logs e monitoramento
       - Segurança (CORS, Helmet, rate limiting)

    4. API:
       - RESTful ou GraphQL
       - Documentação clara (Swagger/OpenAPI)
       - Endpoints bem definidos
       - Respostas padronizadas

    5. Banco de Dados:
       - Schemas/Models bem definidos
       - Migrations
       - Seeds para dados iniciais

    6. DevOps:
       - Docker e docker-compose
       - Scripts de build e deploy
       - Configurações de ambiente

    Por favor, gere o código em formato JSON com a seguinte estrutura:
    {
      "files": {
        "caminho/do/arquivo": {
          "content": "conteúdo do arquivo",
          "description": "descrição do propósito do arquivo"
        }
      }
    }

    O código deve ser completo, funcional e seguir as melhores práticas de desenvolvimento.
    Inclua comentários explicativos onde necessário.
  `;
}

// Função para processar a resposta de código do LLM
function processCodeResponse(text, analysis) {
  try {
    // Parse do JSON da resposta
    const response = JSON.parse(text);
    
    if (!response.files || typeof response.files !== 'object') {
      throw new Error('Formato de resposta inválido: files não encontrado ou inválido');
    }

    // Valida e processa cada arquivo
    const processedFiles = {};
    for (const [path, file] of Object.entries(response.files)) {
      if (!file.content || !file.description) {
        console.warn(`Arquivo ${path} com formato inválido, pulando...`);
        continue;
      }

      processedFiles[path] = {
        content: file.content,
        description: file.description
      };
    }

    return {
      files: processedFiles,
      analysis: analysis
    };
  } catch (error) {
    console.error('Erro ao processar código:', error);
    throw new Error('Falha ao processar o código gerado');
  }
}


export default router;
