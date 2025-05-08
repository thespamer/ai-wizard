import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Container,
  Paper,
} from '@mui/material';

const steps = [
  'Informações do Projeto',
  'Arquitetura',
  'Estimativa de Custos',
  'Geração de Código',
];

const pathToStep = {
  '/': 0,
  '/architecture': 1,
  '/costs': 2,
  '/generate': 3,
};

const stepToPath = ['/', '/architecture', '/costs', '/generate'];

export default function WizardStepper({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const activeStep = pathToStep[location.pathname] || 0;

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      navigate(stepToPath[activeStep + 1]);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      navigate(stepToPath[activeStep - 1]);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          AI Project Wizard
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {children}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Voltar
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
