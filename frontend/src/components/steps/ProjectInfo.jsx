import React, { useState } from 'react';
import {
  TextField,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
} from '@mui/material';

export default function ProjectInfo() {
  const [formData, setFormData] = useState({
    nomeProduto: '',
    descricao: '',
    publicoAlvo: '',
    funcionalidadesPrincipais: [],
    tecnologiasPreferidas: {
      frontend: '',
      backend: ''
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTechChange = (tech, value) => {
    setFormData((prev) => ({
      ...prev,
      tecnologiasPreferidas: {
        ...prev.tecnologiasPreferidas,
        [tech]: value,
      },
    }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Informações Básicas do Projeto
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Nome do Produto"
          name="nomeProduto"
          value={formData.nomeProduto}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          multiline
          rows={4}
          label="Descrição do Produto"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          helperText="Descreva o objetivo principal do seu produto"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Público-Alvo"
          name="publicoAlvo"
          value={formData.publicoAlvo}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          multiline
          rows={4}
          label="Funcionalidades Principais"
          name="funcionalidadesPrincipais"
          value={formData.funcionalidadesPrincipais.join('\n')}
          onChange={(e) => {
            const features = e.target.value.split('\n').filter(f => f.trim());
            setFormData(prev => ({
              ...prev,
              funcionalidadesPrincipais: features,
            }));
          }}
          helperText="Digite uma funcionalidade por linha"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Frontend</InputLabel>
          <Select
            value={formData.tecnologiasPreferidas.frontend}
            onChange={(e) => handleTechChange('frontend', e.target.value)}
          >
            <MenuItem value="">Sem preferência</MenuItem>
            <MenuItem value="React">React</MenuItem>
            <MenuItem value="Vue.js">Vue.js</MenuItem>
            <MenuItem value="Angular">Angular</MenuItem>
            <MenuItem value="Next.js">Next.js</MenuItem>
            <MenuItem value="Svelte">Svelte</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Backend</InputLabel>
          <Select
            value={formData.tecnologiasPreferidas.backend}
            onChange={(e) => handleTechChange('backend', e.target.value)}
          >
            <MenuItem value="">Sem preferência</MenuItem>
            <MenuItem value="Node.js">Node.js</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="Java">Java</MenuItem>
            <MenuItem value="Go">Go</MenuItem>
            <MenuItem value="Ruby">Ruby</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
