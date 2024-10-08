import { useState, useEffect } from 'react';
import QrScanner from '../components/QrScanner';
import { exportToCSV } from '../utils/csvHelper';

export interface CupomData {
  nome: string;
  valor: string;
  data: string;
}

function Home() {
  const [cupomData, setCupomData] = useState<CupomData[]>([]);

  const handleScanSuccess = (data: string) => {
    try {
      const parsedData = JSON.parse(data) as CupomData;
      const updatedData = [...cupomData, parsedData];
      localStorage.setItem('cupomData', JSON.stringify(updatedData));
      setCupomData(updatedData);
    } catch (error) {
      console.error('Erro ao processar os dados do QR Code:', error);
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem('cupomData');
    if (savedData) {
      setCupomData(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Leitor de QR Code</h1>
      <QrScanner onScanSuccess={handleScanSuccess} />

      <h2 className="text-2xl font-semibold mb-4">Dados de Cupons Fiscais</h2>
      <div className="w-full max-w-4xl overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Valor</th>
              <th className="px-4 py-2">Data</th>
            </tr>
          </thead>
          <tbody>
            {cupomData.map((cupom, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2 text-center">{cupom.nome}</td>
                <td className="px-4 py-2 text-center">{cupom.valor}</td>
                <td className="px-4 py-2 text-center">{cupom.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {cupomData.length > 0 && (
        <button
          className="mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
          onClick={() => exportToCSV(cupomData)}
        >
          Exportar CSV
        </button>
      )}
    </div>
  );
};

export default Home;
