import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import projectAnalysisRoutes from './routes/projectAnalysis.js';
import wizardRoutes from './routes/wizard.js';

const app = express();

// Configuração de segurança básica
app.use(helmet());

// Configuração CORS
app.use(cors());

// Parser para JSON
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requisições por janela
});
app.use(limiter);

// Rotas
app.use('/api/analyze', projectAnalysisRoutes);
app.use('/api/wizard', wizardRoutes);

// Middleware de erro
app.use((err, req, res, next) => {
  console.error('Error occurred:', err.message);
  console.error('Stack trace:', err.stack);
  console.error('Request path:', req.path);
  console.error('Request method:', req.method);
  console.error('Request headers:', req.headers);
  console.error('Request body:', JSON.stringify(req.body, null, 2));

  // Se for um erro do Joi (validação)
  if (err.isJoi) {
    console.error('Validation error details:', err.details);
    return res.status(400).json({
      error: 'Validation Error',
      details: err.details
    });
  }

  // Se for um erro do Axios
  if (err.isAxiosError) {
    console.error('Axios error details:', {
      code: err.code,
      response: err.response ? {
        status: err.response.status,
        data: err.response.data
      } : null
    });
    return res.status(502).json({
      error: 'External Service Error',
      details: err.message,
      code: err.code
    });
  }

  // Erro genérico
  res.status(500).json({
    error: 'Internal Server Error',
    details: err.message,
    path: req.path,
    timestamp: new Date().toISOString()
  });
});

export default app;
