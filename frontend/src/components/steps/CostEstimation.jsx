import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
  Divider,
  Box,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Info as InfoIcon,
  TrendingUp as TrendingUpIcon,
  Storage as StorageIcon,
  Cloud as CloudIcon,
} from '@mui/icons-material';
import { calculateInfrastructureCosts, getServiceMapping } from '../../services/costAnalysis';
import { costCalculators } from '../../data/cloudData';

export default function CostEstimation() {
  const [requirements, setRequirements] = useState({
    scale: 'small',
    storage: 50, // GB
    traffic: 100, // GB
  });

  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const result = calculateInfrastructureCosts(requirements);
    setAnalysis(result);
  }, [requirements]);

  const handleRequirementChange = (event) => {
    const { name, value } = event.target;
    setRequirements(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!analysis) return null;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Estimativa de Custos e Recomendações
        </Typography>
      </Grid>

      {/* Configurações */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
              Configuração do Ambiente
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Escala do Projeto</InputLabel>
                  <Select
                    name="scale"
                    value={requirements.scale}
                    onChange={handleRequirementChange}
                  >
                    <MenuItem value="small">Pequeno (2-4 vCPUs)</MenuItem>
                    <MenuItem value="medium">Médio (4-8 vCPUs)</MenuItem>
                    <MenuItem value="large">Grande (8+ vCPUs)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Armazenamento (GB)</InputLabel>
                  <Select
                    name="storage"
                    value={requirements.storage}
                    onChange={handleRequirementChange}
                  >
                    <MenuItem value={50}>50 GB</MenuItem>
                    <MenuItem value={100}>100 GB</MenuItem>
                    <MenuItem value={500}>500 GB</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Tráfego Mensal (GB)</InputLabel>
                  <Select
                    name="traffic"
                    value={requirements.traffic}
                    onChange={handleRequirementChange}
                  >
                    <MenuItem value={100}>100 GB</MenuItem>
                    <MenuItem value={500}>500 GB</MenuItem>
                    <MenuItem value={1000}>1 TB</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Custos por Provedor */}
      {Object.entries(analysis.costs).map(([provider, data]) => (
        <Grid item xs={12} md={4} key={provider}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom 
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CloudIcon />
                {provider.toUpperCase()}
                <Tooltip title="Abrir Calculadora">
                  <IconButton 
                    size="small" 
                    href={costCalculators[provider]} 
                    target="_blank"
                  >
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Typography>
              
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Computação</TableCell>
                      <TableCell align="right">
                        ${data.costs.compute.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Banco de Dados</TableCell>
                      <TableCell align="right">
                        ${data.costs.database.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Armazenamento</TableCell>
                      <TableCell align="right">
                        ${data.costs.storage.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Rede</TableCell>
                      <TableCell align="right">
                        ${data.costs.network.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Total Mensal</strong></TableCell>
                      <TableCell align="right">
                        <strong>${data.costs.total.toFixed(2)}</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                Serviços Incluídos:
              </Typography>
              <Typography variant="body2">
                • Compute: {data.services.compute}<br />
                • Database: {data.services.database}<br />
                • Storage: {data.services.storage}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {/* Recomendações de Tecnologia */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom 
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TrendingUpIcon />
              Recomendações de Tecnologia
            </Typography>
            
            <Grid container spacing={3}>
              {Object.entries(analysis.recommendations).map(([category, techs]) => (
                <Grid item xs={12} md={4} key={category}>
                  <Typography variant="subtitle1" gutterBottom>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Tecnologia</TableCell>
                          <TableCell align="right">Score</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {techs.map((tech) => (
                          <TableRow key={tech.name}>
                            <TableCell>{tech.name}</TableCell>
                            <TableCell align="right">
                              {tech.score.toFixed(1)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary">
          * Estimativas baseadas em dados públicos do Stack Overflow Survey 2023 e GitHub State of Octoverse.
          Os custos são aproximados e podem variar dependendo da região e outros fatores.
          Consulte as calculadoras oficiais dos provedores para estimativas mais precisas.
        </Typography>
      </Grid>
    </Grid>
  );
}
