import React, { useState } from 'react';
import QrScannerModal from './components/QrScannerModal';
import axios from 'axios';

const App: React.FC = () => {
  const [cupomData, setCupomData] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState(null); // Armazena a resposta da API

  const handleScanSuccess = (data: string) => {
    console.log('QR Code Data:', data);
    setCupomData(data);  // Armazena o QR Code lido
  };

  const handleRequestApi = async () => {
    if (cupomData) {
      try {
        const backendURL = 'https://leitor-cupom-fiscal-9ota.vercel.app';  // Substitua pela URL do backend
        const response = await axios.get(`${backendURL}/api/cupom/buscar-dados`, {
          params: { url: cupomData }  // Passa o QR code como parâmetro da URL
        });
        setApiResponse(response.data);  // Armazena a resposta da API
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
      }
    }
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
          >
            Fazer Requisição à API
          </button>
        </div>
      )}

      {/* Exibe a resposta da API */}
      {apiResponse && (
        <div className="w-full max-w-4xl mt-4 bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Resposta da API</h2>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
