import { cloudServices, techTrends, githubTrends, serviceMapping } from '../data/cloudData';

export function calculateInfrastructureCosts(requirements) {
  const costs = {
    aws: calculateProviderCosts('aws', requirements),
    azure: calculateProviderCosts('azure', requirements),
    gcp: calculateProviderCosts('gcp', requirements)
  };

  return addRecommendations(costs, requirements);
}

function calculateProviderCosts(provider, requirements) {
  const { scale, storage, traffic } = requirements;
  const services = cloudServices;

  // Cálculo básico de custos
  const computeCost = calculateComputeCosts(provider, scale, services);
  const databaseCost = calculateDatabaseCosts(provider, scale, services);
  const storageCost = calculateStorageCosts(provider, storage, services);
  const networkCost = calculateNetworkCosts(provider, traffic);

  const totalCost = computeCost + databaseCost + storageCost + networkCost;

  return {
    provider,
    costs: {
      compute: computeCost,
      database: databaseCost,
      storage: storageCost,
      network: networkCost,
      total: totalCost
    },
    services: {
      compute: services.compute[provider].name,
      database: services.database[provider].name,
      storage: services.storage[provider].name
    }
  };
}

function calculateComputeCosts(provider, scale, services) {
  const instanceType = scale === 'small' ? 'small' : 
                      scale === 'medium' ? 'medium' : 'large';
  return services.compute[provider].types[instanceType].cost * 730; // 730 horas/mês
}

function calculateDatabaseCosts(provider, scale, services) {
  const dbType = scale === 'small' ? 'small' : 
                 scale === 'medium' ? 'medium' : 'large';
  return services.database[provider].types[dbType].cost * 730;
}

function calculateStorageCosts(provider, storage, services) {
  const costPerGB = services.storage[provider].cost_per_gb;
  const freeTier = parseInt(services.storage[provider].free_tier);
  return Math.max(0, (storage - freeTier) * costPerGB);
}

function calculateNetworkCosts(provider, traffic) {
  // Custos aproximados de rede por GB
  const networkCosts = {
    aws: 0.09,
    azure: 0.087,
    gcp: 0.085
  };
  return traffic * networkCosts[provider];
}

function addRecommendations(costs, requirements) {
  // Análise das tecnologias mais adequadas baseada nos trends
  const recommendations = {
    frontend: recommendTechnology('frontend', requirements),
    backend: recommendTechnology('backend', requirements),
    database: recommendTechnology('database', requirements)
  };

  // Adiciona recomendações aos resultados
  return {
    costs,
    recommendations,
    trends: {
      frontend: techTrends.frontend.slice(0, 3),
      backend: techTrends.backend.slice(0, 3),
      database: techTrends.database.slice(0, 3)
    },
    githubActivity: {
      languages: githubTrends.languages.slice(0, 3),
      frameworks: githubTrends.frameworks.slice(0, 3)
    }
  };
}

function recommendTechnology(category, requirements) {
  const trends = techTrends[category];
  
  // Ordena por uma combinação de uso e satisfação
  return trends
    .sort((a, b) => (b.usage * b.satisfaction) - (a.usage * a.satisfaction))
    .slice(0, 3)
    .map(tech => ({
      name: tech.name,
      usage: tech.usage,
      satisfaction: tech.satisfaction,
      score: (tech.usage * tech.satisfaction) / 100
    }));
}

export function getServiceMapping(service) {
  return serviceMapping[service] || {};
}
