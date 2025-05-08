                    import { mistralClient } from './config.js';
import { COMPLEXITY_LEVELS, COMPLEXITY_FACTORS, BASE_HOURS, calculateAdjustedHours, calculateCosts, generateSchedule } from './projectComplexity.js';

class ProjectAnalyzer {
  async analyzeComplexity(projectRequirements) {
    try {
      console.log('Building prompt for analysis...');
      const prompt = this.buildComplexityAnalysisPrompt(projectRequirements);
      
      console.log('Sending request to Mistral...');
      const response = await mistralClient.complete(prompt);
      console.log('Received response from Mistral:', response);
      
      // Procura por JSON na resposta
      const jsonMatch = response.match(/\{[\s\S]*?\}/);
      if (!jsonMatch) {
        console.error('No JSON found in response:', response);
        throw new Error('No JSON found in response');
      }

      const jsonStr = jsonMatch[0].replace(/\\n/g, '').replace(/\s+/g, ' ');
      console.log('Extracted JSON:', jsonStr);

      const llmAnalysis = this.parseComplexityAnalysis(jsonStr);
      console.log('LLM Analysis:', llmAnalysis);

      // Calcula o sumário detalhado do projeto
      const projectSummary = this.calculateProjectSummary(projectRequirements, llmAnalysis);
      console.log('Project Summary:', projectSummary);

      return {
        ...llmAnalysis,
        ...projectSummary
      };
    } catch (error) {
      console.error('Error analyzing project complexity:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      throw error;
    }
  }

  buildComplexityAnalysisPrompt(requirements) {
    return `Você é um analisador de projetos especializado em estimar complexidade e esforço.
    
    Analise os seguintes requisitos e retorne um objeto JSON com a análise. Não inclua \`\`\`json ou outros marcadores.
    Retorne apenas o JSON puro:

    ${JSON.stringify(requirements, null, 2)}

    O JSON deve seguir exatamente este formato (mantenha as chaves em inglês):
    {
      "complexityLevel": "low|medium|high",
      "analysis": {
        "architecture": "descrição da análise arquitetural",
        "integrations": "descrição das integrações",
        "ui": "descrição da complexidade da UI",
        "nonFunctional": "descrição dos requisitos não-funcionais",
        "techStack": "descrição do stack tecnológico"
      },
      "justification": "justificativa da classificação"
    }

    IMPORTANTE: Retorne APENAS o JSON puro, sem texto adicional, sem marcadores de código.`;
  }

  parseComplexityAnalysis(response) {
    try {
      console.log('Parsing response:', response);
      const analysis = JSON.parse(response);
      
      // Validação básica do formato
      const requiredFields = ['complexityLevel', 'analysis', 'justification'];
      for (const field of requiredFields) {
        if (!analysis[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      return analysis;
    } catch (error) {
      console.error('Error parsing complexity analysis:', error);
      console.error('Raw response:', response);
      throw new Error('Failed to parse complexity analysis response');
    }
  }

  calculateProjectSummary(requirements, llmAnalysis) {
    // Determina os fatores de complexidade baseados nos requisitos
    const factors = {
      security: COMPLEXITY_FACTORS.SECURITY[requirements.technicalRequirements.security],
      architecture: COMPLEXITY_FACTORS.ARCHITECTURE[requirements.technicalRequirements.architecture],
      ui: COMPLEXITY_FACTORS.UI_COMPLEXITY[requirements.technicalRequirements.ui],
      integration: COMPLEXITY_FACTORS.INTEGRATION_COUNT[
        requirements.technicalRequirements.integrations.length <= 2 ? 'few' :
        requirements.technicalRequirements.integrations.length <= 5 ? 'moderate' : 'many'
      ]
    };

    // Determina o nível de complexidade base
    const complexityLevel = this.determineComplexityLevel(factors);
    const complexityMultiplier = COMPLEXITY_LEVELS[complexityLevel].multiplier;

    // Calcula as horas ajustadas
    const adjustedHours = calculateAdjustedHours(BASE_HOURS, complexityMultiplier, factors);

    // Calcula os custos
    const costs = calculateCosts(adjustedHours);

    // Gera o cronograma
    const schedule = generateSchedule(adjustedHours);

    return {
      complexity: {
        level: COMPLEXITY_LEVELS[complexityLevel].value,
        multiplier: complexityMultiplier,
        factors
      },
      hours: adjustedHours,
      costs,
      schedule,
      totalCost: Object.values(costs).reduce((sum, cost) => sum + cost, 0)
    };
  }

  determineComplexityLevel(factors) {
    const avgFactor = Object.values(factors).reduce((sum, factor) => sum + factor, 0) / Object.keys(factors).length;
    
    if (avgFactor >= 1.4) return 'HIGH';
    if (avgFactor >= 1.2) return 'MEDIUM';
    return 'LOW';
  }
}

export default new ProjectAnalyzer();
