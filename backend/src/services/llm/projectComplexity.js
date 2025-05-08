// Definição dos níveis de complexidade e seus multiplicadores
export const COMPLEXITY_LEVELS = {
  LOW: { value: 'low', multiplier: 1.0, label: 'Baixa' },
  MEDIUM: { value: 'medium', multiplier: 1.5, label: 'Média' },
  HIGH: { value: 'high', multiplier: 2.0, label: 'Alta' }
};

// Horas base por papel em um projeto de complexidade baixa
export const BASE_HOURS = {
  techLead: {
    planning: 20,
    architecture: 30,
    review: 20,
    meetings: 10
  },
  seniorDev: {
    development: 60,
    review: 20,
    testing: 20
  },
  developer: {
    development: 80,
    testing: 40
  },
  qaEngineer: {
    testPlanning: 20,
    testing: 40,
    automation: 20
  }
};

// Fatores que influenciam a complexidade
export const COMPLEXITY_FACTORS = {
  SECURITY: {
    basic: 1.0,
    moderate: 1.2,
    advanced: 1.5
  },
  ARCHITECTURE: {
    monolithic: 1.0,
    layered: 1.2,
    microservices: 1.5
  },
  UI_COMPLEXITY: {
    simple: 1.0,
    moderate: 1.3,
    complex: 1.6
  },
  INTEGRATION_COUNT: {
    none: 1.0,
    few: 1.2, // 1-2 integrações
    moderate: 1.4, // 3-5 integrações
    many: 1.6 // mais de 5 integrações
  }
};

// Função para calcular as horas ajustadas baseadas na complexidade
export function calculateAdjustedHours(baseHours, complexityMultiplier, factors) {
  const totalFactorMultiplier = Object.values(factors).reduce((acc, curr) => acc * curr, 1);
  const finalMultiplier = complexityMultiplier * totalFactorMultiplier;

  return Object.entries(baseHours).reduce((acc, [role, activities]) => {
    const totalHours = Object.values(activities).reduce((sum, hours) => sum + hours, 0);
    acc[role] = Math.round(totalHours * finalMultiplier);
    return acc;
  }, {});
}

// Função para calcular os custos por papel
export function calculateCosts(hours) {
  const hourlyRates = {
    techLead: 150,
    seniorDev: 100,
    developer: 75,
    qaEngineer: 60
  };

  return Object.entries(hours).reduce((acc, [role, hours]) => {
    acc[role] = hours * hourlyRates[role];
    return acc;
  }, {});
}

// Função para gerar o cronograma do projeto
export function generateSchedule(hours) {
  // Assumindo uma semana de 40 horas
  const HOURS_PER_WEEK = 40;
  
  // Calcula a duração em semanas para cada papel
  const weeksByRole = Object.entries(hours).reduce((acc, [role, hours]) => {
    acc[role] = Math.ceil(hours / HOURS_PER_WEEK);
    return acc;
  }, {});

  // Determina a duração total do projeto em semanas
  // Considera que alguns papéis trabalham em paralelo
  const schedule = {
    totalWeeks: Math.max(...Object.values(weeksByRole)),
    phases: [
      {
        name: 'Planejamento e Arquitetura',
        duration: weeksByRole.techLead,
        roles: ['techLead'],
        startWeek: 0
      },
      {
        name: 'Desenvolvimento',
        duration: Math.max(weeksByRole.seniorDev, weeksByRole.developer),
        roles: ['seniorDev', 'developer'],
        startWeek: Math.ceil(weeksByRole.techLead * 0.5) // Começa após metade do planejamento
      },
      {
        name: 'Testes e QA',
        duration: weeksByRole.qaEngineer,
        roles: ['qaEngineer'],
        startWeek: Math.ceil(weeksByRole.techLead * 0.5) + 1 // Começa junto com o desenvolvimento
      }
    ]
  };

  // Adiciona datas estimadas
  const startDate = new Date();
  schedule.phases = schedule.phases.map(phase => {
    const phaseStartDate = new Date(startDate);
    phaseStartDate.setDate(phaseStartDate.getDate() + (phase.startWeek * 7));
    
    const phaseEndDate = new Date(phaseStartDate);
    phaseEndDate.setDate(phaseEndDate.getDate() + (phase.duration * 7));

    return {
      ...phase,
      startDate: phaseStartDate.toISOString().split('T')[0],
      endDate: phaseEndDate.toISOString().split('T')[0]
    };
  });

  return schedule;
}
