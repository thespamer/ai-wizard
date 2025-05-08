import React from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Storage as StorageIcon,
  Code as CodeIcon,
  Cloud as CloudIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

export default function Architecture() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Arquitetura do Sistema
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
              Frontend
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CodeIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Framework"
                  secondary="React com Material-UI"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Autenticação"
                  secondary="JWT com refresh tokens"
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
              Backend
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CodeIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="API"
                  secondary="Node.js com Express"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <StorageIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Banco de Dados"
                  secondary="PostgreSQL"
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
              Infraestrutura
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CloudIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Cloud Provider"
                  secondary="AWS (Amazon Web Services)"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Segurança"
                  secondary="HTTPS, WAF, VPC"
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
