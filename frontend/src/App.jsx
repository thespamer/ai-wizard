import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import WizardStepper from './components/WizardStepper';
import ProjectInfo from './components/steps/ProjectInfo';
import Architecture from './components/steps/Architecture';
import CostEstimation from './components/steps/CostEstimation';
import CodeGeneration from './components/steps/CodeGeneration';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <WizardStepper>
          <Routes>
            <Route path="/" element={<ProjectInfo />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/costs" element={<CostEstimation />} />
            <Route path="/generate" element={<CodeGeneration />} />
          </Routes>
        </WizardStepper>
      </Router>
    </ThemeProvider>
  );
}

export default App;
