import { useState, useEffect } from 'react';
import QrScanner from '../components/QrScanner';
import CupomList from '../components/CupomList';  // Importa o componente de lista de cupons
import axios from 'axios';  // Importa o axios para fazer requisições ao backend

export interface CupomData {
  nome: string;
  valor: string;
  data: string;
}

function Home() {
  const [cupomData, setCupomData] = useState<CupomData[]>([]);

  // Carrega os dados salvos no localStorage ao iniciar o componente
  useEffect(() => {
    const savedData = localStorage.getItem('cupomData');
    if (savedData) {
      setCupomData(JSON.parse(savedData));
    }
  }, []);

  const handleScanSuccess = async (qrData: string) => {
    try {
      // Chama o backend com os dados do QR code
      const backendURL = 'https://seu-backend-url.vercel.app';  // Substitua pela URL do backend no Vercel

      const response = await axios.get(`${backendURL}/api/cupom/buscar-dados`, {
        params: { url: qrData },
      });
      console.log('Dados processados pelo backend:', response.data);

      const parsedData = response.data as CupomData;  // Recebe os dados no formato esperado
      const updatedData = [...cupomData, parsedData];

      localStorage.setItem('cupomData', JSON.stringify(updatedData));
      setCupomData(updatedData);
    } catch (error) {
      console.error('Erro ao processar os dados do QR Code:', error);
    }
  };

  const handleClearList = () => {
    // Limpa a lista e remove os dados do localStorage
    setCupomData([]);
    localStorage.removeItem('cupomData');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Leitor de QR Code</h1>
      
      {/* Usa o componente QrScanner e passa a função de callback */}
      <QrScanner onScanSuccess={handleScanSuccess} />

      {/* Renderiza a lista de cupons lidos e o botão de exportação */}
      <CupomList cupons={cupomData} onClear={handleClearList} />
    </div>
  );
}

export default Home;
