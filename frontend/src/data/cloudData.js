// Dados baseados em Cloud Providers Comparison 2023 e Cloud Product Mapping
export const cloudServices = {
  compute: {
    aws: {
      name: 'Amazon EC2',
      types: {
        small: { name: 't3.small', cpu: '2 vCPU', ram: '2 GB', cost: 0.0208 },
        medium: { name: 't3.medium', cpu: '2 vCPU', ram: '4 GB', cost: 0.0416 },
        large: { name: 't3.large', cpu: '2 vCPU', ram: '8 GB', cost: 0.0832 }
      }
    },
    azure: {
      name: 'Azure VM',
      types: {
        small: { name: 'B2s', cpu: '2 vCPU', ram: '4 GB', cost: 0.0416 },
        medium: { name: 'B2ms', cpu: '2 vCPU', ram: '8 GB', cost: 0.0832 },
        large: { name: 'B4ms', cpu: '4 vCPU', ram: '16 GB', cost: 0.166 }
      }
    },
    gcp: {
      name: 'Compute Engine',
      types: {
        small: { name: 'e2-small', cpu: '2 vCPU', ram: '2 GB', cost: 0.0208 },
        medium: { name: 'e2-medium', cpu: '2 vCPU', ram: '4 GB', cost: 0.0416 },
        large: { name: 'e2-standard-2', cpu: '2 vCPU', ram: '8 GB', cost: 0.0832 }
      }
    }
  },
  database: {
    aws: {
      name: 'Amazon RDS',
      types: {
        small: { name: 'db.t3.small', storage: '20 GB', cost: 0.034 },
        medium: { name: 'db.t3.medium', storage: '50 GB', cost: 0.068 },
        large: { name: 'db.t3.large', storage: '100 GB', cost: 0.136 }
      }
    },
    azure: {
      name: 'Azure Database',
      types: {
        small: { name: 'Basic', storage: '20 GB', cost: 0.034 },
        medium: { name: 'Standard', storage: '50 GB', cost: 0.068 },
        large: { name: 'Premium', storage: '100 GB', cost: 0.136 }
      }
    },
    gcp: {
      name: 'Cloud SQL',
      types: {
        small: { name: 'db-small', storage: '20 GB', cost: 0.034 },
        medium: { name: 'db-medium', storage: '50 GB', cost: 0.068 },
        large: { name: 'db-large', storage: '100 GB', cost: 0.136 }
      }
    }
  },
  storage: {
    aws: {
      name: 'Amazon S3',
      cost_per_gb: 0.023,
      free_tier: '5 GB'
    },
    azure: {
      name: 'Azure Blob Storage',
      cost_per_gb: 0.0184,
      free_tier: '5 GB'
    },
    gcp: {
      name: 'Cloud Storage',
      cost_per_gb: 0.020,
      free_tier: '5 GB'
    }
  }
};

// Dados do Stack Overflow Survey 2023
export const techTrends = {
  frontend: [
    { name: 'React', usage: 40.58, satisfaction: 68.7 },
    { name: 'Angular', usage: 21.86, satisfaction: 55.82 },
    { name: 'Vue.js', usage: 18.82, satisfaction: 73.62 },
    { name: 'Svelte', usage: 7.14, satisfaction: 75.28 },
    { name: 'Next.js', usage: 16.52, satisfaction: 70.25 }
  ],
  backend: [
    { name: 'Node.js', usage: 47.12, satisfaction: 67.36 },
    { name: 'Python', usage: 44.06, satisfaction: 71.48 },
    { name: 'Java', usage: 30.55, satisfaction: 58.76 },
    { name: 'Go', usage: 11.15, satisfaction: 79.11 },
    { name: 'Rust', usage: 9.32, satisfaction: 84.66 }
  ],
  database: [
    { name: 'PostgreSQL', usage: 46.07, satisfaction: 76.35 },
    { name: 'MySQL', usage: 45.68, satisfaction: 65.32 },
    { name: 'MongoDB', usage: 27.72, satisfaction: 68.55 },
    { name: 'Redis', usage: 25.42, satisfaction: 74.96 },
    { name: 'SQLite', usage: 31.96, satisfaction: 71.71 }
  ]
};

// Dados do GitHub State of Octoverse
export const githubTrends = {
  languages: [
    { name: 'JavaScript', repos: 28.7, contributors: 5.4 },
    { name: 'Python', repos: 22.5, contributors: 4.8 },
    { name: 'Java', repos: 15.3, contributors: 3.7 },
    { name: 'TypeScript', repos: 13.2, contributors: 2.9 },
    { name: 'Go', repos: 8.4, contributors: 1.8 }
  ],
  frameworks: [
    { name: 'React', stars: 203000, forks: 42000 },
    { name: 'Vue', stars: 201000, forks: 33000 },
    { name: 'Angular', stars: 86000, forks: 23000 },
    { name: 'Next.js', stars: 108000, forks: 24000 },
    { name: 'Svelte', stars: 71000, forks: 3800 }
  ]
};

// Links para calculadoras públicas de custo
export const costCalculators = {
  aws: 'https://calculator.aws/',
  azure: 'https://azure.microsoft.com/pt-br/pricing/calculator/',
  gcp: 'https://cloud.google.com/products/calculator'
};

// Mapeamento de serviços equivalentes
export const serviceMapping = {
  compute: {
    aws: 'EC2',
    azure: 'Virtual Machines',
    gcp: 'Compute Engine'
  },
  container: {
    aws: 'ECS/EKS',
    azure: 'AKS',
    gcp: 'GKE'
  },
  serverless: {
    aws: 'Lambda',
    azure: 'Functions',
    gcp: 'Cloud Functions'
  },
  storage: {
    aws: 'S3',
    azure: 'Blob Storage',
    gcp: 'Cloud Storage'
  },
  cdn: {
    aws: 'CloudFront',
    azure: 'CDN',
    gcp: 'Cloud CDN'
  }
};
