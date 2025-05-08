// Dados baseados em pesquisas salariais do mercado brasileiro
export const teamRoles = {
  frontend: {
    title: 'Desenvolvedor Frontend',
    description: 'Responsável pela interface do usuário e experiência do usuário',
    skills: ['React', 'JavaScript/TypeScript', 'HTML/CSS', 'UI/UX'],
    seniorityLevels: {
      junior: {
        salary: 4500,
        experience: '0-2 anos'
      },
      pleno: {
        salary: 8000,
        experience: '2-4 anos'
      },
      senior: {
        salary: 15000,
        experience: '4+ anos'
      }
    }
  },
  backend: {
    title: 'Desenvolvedor Backend',
    description: 'Responsável pela lógica de negócio e APIs',
    skills: ['Node.js', 'Python', 'Banco de Dados', 'APIs'],
    seniorityLevels: {
      junior: {
        salary: 5000,
        experience: '0-2 anos'
      },
      pleno: {
        salary: 9000,
        experience: '2-4 anos'
      },
      senior: {
        salary: 16000,
        experience: '4+ anos'
      }
    }
  },
  devops: {
    title: 'Engenheiro DevOps',
    description: 'Responsável pela infraestrutura e CI/CD',
    skills: ['Cloud', 'Docker/Kubernetes', 'CI/CD', 'Monitoramento'],
    seniorityLevels: {
      junior: {
        salary: 6000,
        experience: '0-2 anos'
      },
      pleno: {
        salary: 10000,
        experience: '2-4 anos'
      },
      senior: {
        salary: 18000,
        experience: '4+ anos'
      }
    }
  },
  qa: {
    title: 'Engenheiro de QA',
    description: 'Responsável por testes e qualidade',
    skills: ['Testes Automatizados', 'Testes Manuais', 'Performance', 'Segurança'],
    seniorityLevels: {
      junior: {
        salary: 4000,
        experience: '0-2 anos'
      },
      pleno: {
        salary: 7000,
        experience: '2-4 anos'
      },
      senior: {
        salary: 13000,
        experience: '4+ anos'
      }
    }
  },
  architect: {
    title: 'Arquiteto de Software',
    description: 'Responsável pelo design da solução e decisões técnicas',
    skills: ['Arquitetura', 'Design Patterns', 'Performance', 'Escalabilidade'],
    seniorityLevels: {
      senior: {
        salary: 20000,
        experience: '8+ anos'
      }
    }
  }
};

export const calculateTeamCost = (projectSize) => {
  const teamComposition = {
    small: {
      frontend: { pleno: 1 },
      backend: { pleno: 1 },
      devops: { pleno: 1 },
    },
    medium: {
      frontend: { junior: 1, pleno: 1 },
      backend: { pleno: 1, senior: 1 },
      devops: { pleno: 1 },
      qa: { pleno: 1 },
    },
    large: {
      frontend: { junior: 2, pleno: 1, senior: 1 },
      backend: { pleno: 2, senior: 1 },
      devops: { pleno: 1, senior: 1 },
      qa: { pleno: 1, senior: 1 },
      architect: { senior: 1 },
    }
  };

  const composition = teamComposition[projectSize];
  const teamCost = {
    total: 0,
    monthly: 0,
    breakdown: []
  };

  for (const [role, levels] of Object.entries(composition)) {
    for (const [level, count] of Object.entries(levels)) {
      const salary = teamRoles[role].seniorityLevels[level].salary;
      const totalRoleCost = salary * count;
      
      teamCost.total += totalRoleCost;
      teamCost.breakdown.push({
        role: teamRoles[role].title,
        level,
        count,
        salaryPerMember: salary,
        totalCost: totalRoleCost
      });
    }
  }

  teamCost.monthly = teamCost.total;
  teamCost.yearly = teamCost.total * 12;

  return teamCost;
};
