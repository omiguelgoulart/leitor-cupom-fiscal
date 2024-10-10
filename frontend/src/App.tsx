import React, { useState, useEffect } from 'react';
import QrScannerModal from './components/QrScannerModal';
import axios from 'axios';
import { exportToCSV } from './utils/csvHelper';  // Importa a função de exportar CSV

const App: React.FC = () => {
  const [cupomData, setCupomData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);  // Estado de carregamento
  const [history, setHistory] = useState<any[]>([]);  // Lista para armazenar os cupons

  // Carrega os dados salvos no localStorage ao iniciar o componente
  useEffect(() => {
    const savedHistory = localStorage.getItem('cupons');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleScanSuccess = (data: string) => {
    console.log('QR Code Data:', data);
    setCupomData(data);  // Armazena o QR Code lido
  };

  const handleRequestApi = async () => {
    if (cupomData) {
      setLoading(true);  // Inicia o estado de carregamento
      try {
        const backendURL = 'https://leitor-cupom-fiscal-9ota.vercel.app';  // Substitua pela URL do backend
        const response = await axios.get(`${backendURL}/api/cupom/buscar-dados`, {
          params: { url: cupomData },  // Envia a URL do QR Code como parâmetro
        });

        // Atualiza o histórico de cupons com os novos dados
        const updatedHistory = [...history, response.data];
        setHistory(updatedHistory);

        // Salva o histórico atualizado no localStorage
        localStorage.setItem('cupons', JSON.stringify(updatedHistory));
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
      } finally {
        setLoading(false);  // Para o carregamento
      }
    }
  };

  const handleExportAndClear = () => {
    exportToCSV(history);  // Exporta a lista como CSV
    setHistory([]);  // Limpa a lista no estado
    localStorage.removeItem('cupons');  // Remove a lista do localStorage
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Leitor de QR Code para Cupom Fiscal</h1>

      {/* O modal de escaneamento do QR */}
      <QrScannerModal onScanSuccess={handleScanSuccess} />

      {/* Exibe os dados do QR Code após a leitura */}
      {cupomData && (
        <div className="w-full max-w-4xl mt-4 bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Dados do QR Code Lido</h2>
          <p>{cupomData}</p>

          {/* Botão para acionar a requisição à API */}
          <button
            onClick={handleRequestApi}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
            disabled={loading}  // Desabilita o botão enquanto está carregando
          >
            {loading ? 'Carregando...' : 'Fazer Requisição à API'}
          </button>
        </div>
      )}

      {/* Exibe a lista de cupons lidos diretamente */}
      {history.length > 0 && (
        <div className="w-full max-w-4xl mt-8">
          <h2 className="text-2xl font-semibold mb-4">Histórico de Cupons Fiscais</h2>
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Valor</th>
                <th className="px-4 py-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {history.map((cupom, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 text-center">{cupom.nome}</td>
                  <td className="px-4 py-2 text-center">{cupom.valor}</td>
                  <td className="px-4 py-2 text-center">{cupom.data}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Botão para exportar a lista em CSV e limpar */}
          <button
            className="mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
            onClick={handleExportAndClear}
          >
            Exportar CSV e Limpar Lista
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
