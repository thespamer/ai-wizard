import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip
} from '@mui/material';
import { formatCurrency } from '../../utils/format';

const TeamCostBreakdown = ({ teamCost }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Composição da Equipe e Custos
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Paper sx={{ p: 2, flex: 1, bgcolor: '#f8f9fa' }}>
          <Typography variant="subtitle2" color="text.secondary">
            Custo Mensal Total
          </Typography>
          <Typography variant="h4" color="primary">
            {formatCurrency(teamCost.monthly)}
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, flex: 1, bgcolor: '#f8f9fa' }}>
          <Typography variant="subtitle2" color="text.secondary">
            Custo Anual Estimado
          </Typography>
          <Typography variant="h4" color="primary">
            {formatCurrency(teamCost.yearly)}
          </Typography>
        </Paper>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cargo</TableCell>
              <TableCell>Nível</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="right">Salário/Membro</TableCell>
              <TableCell align="right">Custo Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamCost.breakdown.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="body2">{item.role}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={item.level.charAt(0).toUpperCase() + item.level.slice(1)}
                    size="small"
                    color={
                      item.level === 'senior'
                        ? 'primary'
                        : item.level === 'pleno'
                        ? 'secondary'
                        : 'default'
                    }
                  />
                </TableCell>
                <TableCell align="center">{item.count}</TableCell>
                <TableCell align="right">
                  {formatCurrency(item.salaryPerMember)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(item.totalCost)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TeamCostBreakdown;
