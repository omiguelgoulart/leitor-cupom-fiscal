import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('API de Leitor de Cupom Fiscal');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

export default app;
