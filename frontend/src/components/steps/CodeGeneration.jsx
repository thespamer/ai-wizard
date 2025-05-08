import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CodeIcon from '@mui/icons-material/Code';
import ArchitectureDiagram from '../architecture/ArchitectureDiagram';
import TeamCostBreakdown from '../team/TeamCostBreakdown';
import { calculateTeamCost } from '../../data/teamData';
import axios from 'axios';

const defaultProjectData = {
  size: 'small',
  architecture: {
    frontend: {
      framework: 'React',
      buildTool: 'Vite',
      ui: 'Material-UI'
    },
    backend: {
      framework: 'Node.js',
      server: 'Express',
      database: 'PostgreSQL'
    },
    deployment: {
      containerization: 'Docker',
      cloud: 'AWS'
    }
  }
};

const CodeGeneration = ({ projectData = defaultProjectData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState(null);
  const [error, setError] = useState(null);
  
  // Calcula o custo da equipe baseado no tamanho do projeto
  const teamCost = calculateTeamCost(projectData?.size || 'small');

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      // Transforma os dados para o formato esperado pela API
      const apiData = {
        nomeProduto: projectData.nomeProduto || 'Projeto Sem Nome',
        descricao: projectData.descricao || `Projeto ${projectData.size} usando ${projectData.architecture.frontend.framework} e ${projectData.architecture.backend.framework}`,
        publicoAlvo: projectData.publicoAlvo || 'Usuários em geral',
        funcionalidadesPrincipais: projectData.funcionalidadesPrincipais || [
          'Autenticação de usuários',
          'CRUD básico',
          'API RESTful'
        ],
        tecnologiasPreferidas: {
          frontend: projectData.architecture.frontend.framework,
          backend: projectData.architecture.backend.framework
        }
      };

      const response = await axios.post(`${apiUrl}/api/wizard/generate`, apiData);
      
      if (response.data.success) {
        setGeneratedFiles(response.data.files);
      } else {
        throw new Error(response.data.error || 'Erro ao gerar código');
      }
    } catch (err) {
      setError(err.message || 'Erro ao gerar código');
      setGeneratedFiles(null);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedFiles) {
      setError('Por favor, gere o código primeiro');
      return;
    }

    try {
      setIsDownloading(true);
      
      // Criar um arquivo ZIP com os arquivos gerados
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();

      // Adiciona os arquivos ao ZIP
      Object.entries(generatedFiles.files).forEach(([path, file]) => {
        zip.file(path, file.content);
      });

      // Gera e baixa o ZIP
      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'projeto-gerado.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || 'Erro ao baixar arquivos');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Geração de Código
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Revise a arquitetura e a composição da equipe antes de gerar o código.
        </Typography>

        {/* Diagrama de Arquitetura */}
        <ArchitectureDiagram architecture={projectData?.architecture || defaultProjectData.architecture} />

        {/* Composição e Custos da Equipe */}
        <TeamCostBreakdown teamCost={teamCost} />

        <Divider sx={{ my: 4 }} />

        {/* Seção de Download */}
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            {generatedFiles ? 'Seu código está pronto para download' : 'Gere seu código'}
          </Typography>
          
          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
            {!generatedFiles && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<CodeIcon />}
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <CircularProgress size={24} sx={{ mr: 1 }} />
                    Gerando...
                  </>
                ) : (
                  'Gerar Código'
                )}
              </Button>
            )}

            {generatedFiles && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <CircularProgress size={24} sx={{ mr: 1 }} />
                    Baixando...
                  </>
                ) : (
                  'Baixar Projeto'
                )}
              </Button>
            )}
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            O download inclui o código fonte completo, documentação e instruções de deploy.
          </Typography>
        </Paper>
      </Box>

      {/* Mensagens de erro */}
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CodeGeneration;
