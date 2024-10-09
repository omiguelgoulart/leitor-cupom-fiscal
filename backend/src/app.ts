import express from 'express';
import cors from 'cors';
import cupomRoutes from './routes/cupom';

const app = express();

// Permitir que o servidor aceite requisições de diferentes origens
app.use(cors());

// Permitir que o servidor interprete o JSON no corpo das requisições
app.use(express.json());

// Define o uso das rotas do cupom com o prefixo '/api/cupom'
app.use('/api/cupom', cupomRoutes);

export default app;
