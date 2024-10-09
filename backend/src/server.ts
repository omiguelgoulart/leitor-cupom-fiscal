import app from './app';

// Configuração da porta do servidor
const PORT = process.env.PORT || 3000;

// Inicializa o servidor e escuta na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
