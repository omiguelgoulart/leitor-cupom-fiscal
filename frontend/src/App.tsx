import React, { useState, useEffect } from 'react';
import QrScannerModal from './components/QrScannerModal';
import CupomList from './components/CupomList';
import axios from 'axios';

const App: React.FC = () => {
  const [cupomData, setCupomData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);  
  const [history, setHistory] = useState<any[]>([]);  

  useEffect(() => {
    const savedHistory = localStorage.getItem('cupons');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleScanSuccess = (data: string) => {
    setCupomData(data);  
  };

  const handleRequestApi = async () => {
    if (cupomData) {
      setLoading(true);  
      try {
        const backendURL = 'https://leitor-cupom-fiscal-9ota.vercel.app';  
        const response = await axios.get(`${backendURL}/api/cupom/buscar-dados`, {
          params: { url: cupomData },  
        });

        const updatedHistory = [...history, response.data];
        setHistory(updatedHistory);

        localStorage.setItem('cupons', JSON.stringify(updatedHistory));
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
      } finally {
        setLoading(false);  
      }
    }
  };

  const handleClearList = () => {
    setHistory([]);
    localStorage.removeItem('cupons');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Leitor de QR Code para Cupom Fiscal</h1>
      <QrScannerModal onScanSuccess={handleScanSuccess} />

      {cupomData && (
        <div className="w-full max-w-4xl mt-4 bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Dados do QR Code Lido</h2>
          <p>{cupomData}</p>
          <button
            onClick={handleRequestApi}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
            disabled={loading}  
          >
            {loading ? 'Carregando...' : 'Fazer Requisição à API'}
          </button>
        </div>
      )}
      {history.length > 0 && (
        <CupomList cupons={history} onClear={handleClearList} />
      )}
    </div>
  );
};

export default App;
