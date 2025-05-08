import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ReactFlow, { 
  Background,
  Controls,
  MiniMap
} from 'reactflow';
import 'reactflow/dist/style.css';

const ArchitectureDiagram = ({ architecture }) => {
  const nodes = [
    // Frontend Layer
    {
      id: 'frontend',
      type: 'default',
      data: { label: 'Frontend\nReact + Vite' },
      position: { x: 250, y: 0 },
      style: {
        background: '#d4f1f4',
        border: '1px solid #05445e',
        borderRadius: '8px',
        padding: '10px',
        width: 150,
        textAlign: 'center'
      }
    },
    {
      id: 'cdn',
      type: 'default',
      data: { label: 'CDN\nCloudfront' },
      position: { x: 50, y: 0 },
      style: {
        background: '#d4f1f4',
        border: '1px solid #05445e',
        borderRadius: '8px',
        padding: '10px',
        width: 150,
        textAlign: 'center'
      }
    },

    // API Gateway Layer
    {
      id: 'apiGateway',
      type: 'default',
      data: { label: 'API Gateway' },
      position: { x: 250, y: 100 },
      style: {
        background: '#189ab4',
        color: 'white',
        border: '1px solid #05445e',
        borderRadius: '8px',
        padding: '10px',
        width: 150,
        textAlign: 'center'
      }
    },

    // Backend Services Layer
    {
      id: 'authService',
      type: 'default',
      data: { label: 'Auth Service\nJWT + OAuth2' },
      position: { x: 50, y: 200 },
      style: {
        background: '#189ab4',
        color: 'white',
        border: '1px solid #05445e',
        borderRadius: '8px',
        padding: '10px',
        width: 150,
        textAlign: 'center'
      }
    },
    {
      id: 'mainApi',
      type: 'default',
      data: { label: 'Main API\nNode.js + Express' },
      position: { x: 250, y: 200 },
      style: {
        background: '#189ab4',
        color: 'white',
        border: '1px solid #05445e',
        borderRadius: '8px',
        padding: '10px',
        width: 150,
        textAlign: 'center'
      }
    },
    {
      id: 'mediaService',
      type: 'default',
      data: { label: 'Media Service\nImage Processing' },
      position: { x: 450, y: 200 },
      style: {
        background: '#189ab4',
        color: 'white',
        border: '1px solid #05445e',
        borderRadius: '8px',
        padding: '10px',
        width: 150,
        textAlign: 'center'
      }
    },

    // Message Queue Layer
    {
      id: 'messageQueue',
      type: 'default',
      data: { label: 'Message Queue\nRabbitMQ' },
      position: { x: 250, y: 300 },
      style: {
        background: '#75e6da',
        border: '1px solid #05445e',
        borderRadius: '8px',
        padding: '10px',
        width: 150,
        textAlign: 'center'
      }
    },

    // Cache Layer
    {
      id: 'cache',
      type: 'default',
      data: { label: 'Cache\nRedis Cluster' },
      position: { x: 50, y: 400 },
      style: {
        background: '#75e6da',
        border: '1px solid #05445e',
        borderRadius: '8px',
        padding: '10px',
        width: 150,
        textAlign: 'center'
      }
    },

    // Storage Layer
    {
      id: 'database',
      type: 'default',
      data: { label: 'Database\nPostgreSQL' },
      position: { x: 250, y: 400 },
      style: {
        background: '#75e6da',
        border: '1px solid #05445e',
        borderRadius: '8px',
        padding: '10px',
        width: 150,
        textAlign: 'center'
      }
    },
    {
      id: 'objectStorage',
      type: 'default',
      data: { label: 'Object Storage\nS3/Azure Blob' },
      position: { x: 450, y: 400 },
      style: {
        background: '#75e6da',
        border: '1px solid #05445e',
        borderRadius: '8px',
        padding: '10px',
        width: 150,
        textAlign: 'center'
      }
    }
  ];

  const edges = [
    // Frontend connections
    {
      id: 'cdn-frontend',
      source: 'cdn',
      target: 'frontend',
      animated: true,
      style: { stroke: '#05445e' },
      type: 'smoothstep'
    },
    {
      id: 'frontend-apiGateway',
      source: 'frontend',
      target: 'apiGateway',
      animated: true,
      style: { stroke: '#05445e' },
      type: 'smoothstep'
    },

    // API Gateway to Services
    {
      id: 'apiGateway-auth',
      source: 'apiGateway',
      target: 'authService',
      animated: true,
      style: { stroke: '#05445e' },
      type: 'smoothstep'
    },
    {
      id: 'apiGateway-main',
      source: 'apiGateway',
      target: 'mainApi',
      animated: true,
      style: { stroke: '#05445e' },
      type: 'smoothstep'
    },
    {
      id: 'apiGateway-media',
      source: 'apiGateway',
      target: 'mediaService',
      animated: true,
      style: { stroke: '#05445e' },
      type: 'smoothstep'
    },

    // Services to Message Queue
    {
      id: 'mainApi-queue',
      source: 'mainApi',
      target: 'messageQueue',
      animated: true,
      style: { stroke: '#05445e' },
      type: 'smoothstep'
    },
    {
      id: 'media-queue',
      source: 'mediaService',
      target: 'messageQueue',
      animated: true,
      style: { stroke: '#05445e' },
      type: 'smoothstep'
    },

    // Services to Storage
    {
      id: 'auth-cache',
      source: 'authService',
      target: 'cache',
      animated: true,
      style: { stroke: '#05445e' },
      type: 'smoothstep'
    },
    {
      id: 'main-db',
      source: 'mainApi',
      target: 'database',
      animated: true,
      style: { stroke: '#05445e' },
      type: 'smoothstep'
    },
    {
      id: 'media-storage',
      source: 'mediaService',
      target: 'objectStorage',
      animated: true,
      style: { stroke: '#05445e' },
      type: 'smoothstep'
    }
  ];

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Arquitetura do Projeto
      </Typography>
      <Box sx={{ height: 600, border: '1px solid #ddd', borderRadius: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          defaultViewport={{ zoom: 1.5 }}
          minZoom={0.5}
          maxZoom={2}
          attributionPosition="bottom-right"
        >
          <Background color="#f1f1f1" gap={16} />
          <Controls />
          <MiniMap 
            style={{
              height: 120,
              backgroundColor: '#f8f9fa'
            }}
            nodeStrokeColor={(n) => {
              if (n.style?.background) return n.style.background;
              return '#eee';
            }}
            nodeColor={(n) => {
              if (n.style?.background) return n.style.background;
              return '#fff';
            }}
          />
        </ReactFlow>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Camadas da Arquitetura:
        <ul>
          <li><strong>Frontend</strong>: React + Vite com CDN para assets estáticos</li>
          <li><strong>API Gateway</strong>: Roteamento e load balancing</li>
          <li><strong>Serviços</strong>: Autenticação, API principal e processamento de mídia</li>
          <li><strong>Message Queue</strong>: RabbitMQ para comunicação assíncrona</li>
          <li><strong>Cache</strong>: Redis para caching distribuído</li>
          <li><strong>Storage</strong>: PostgreSQL para dados relacionais e S3/Azure Blob para objetos</li>
        </ul>
      </Typography>
    </Paper>
  );
};

export default ArchitectureDiagram;
