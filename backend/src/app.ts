import express from 'express';
import cors from 'cors';
import cupomRoutes from './routes/cupom';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cupom', cupomRoutes);

export default app;
