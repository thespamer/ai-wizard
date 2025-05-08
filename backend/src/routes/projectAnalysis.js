import express from 'express';
import projectAnalyzer from '../services/llm/projectAnalyzer.js';

const router = express.Router();

router.post('/analyze', async (req, res) => {
  try {
    console.log('Received analysis request:', req.body);
    
    const analysis = await projectAnalyzer.analyzeComplexity(req.body.requirements);
    
    console.log('Analysis completed:', analysis);
    
    res.json(analysis);
  } catch (error) {
    console.error('Error in /analyze endpoint:', error);
    res.status(500).json({
      error: 'Failed to analyze project',
      details: error.message
    });
  }
});

export default router;
