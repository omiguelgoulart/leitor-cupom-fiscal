import React, { useState } from 'react';
import QrScannerModal from './components/QrScannerModal';

const App: React.FC = () => {
  const [cupomData, setCupomData] = useState<string | null>(null);

  const handleScanSuccess = (data: string) => {
    console.log('QR Code Data:', data);
    setCupomData(data);  // Define os dados escaneados
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Leitor de QR Code para Cupom Fiscal</h1>

      {/* Modal para o Scanner */}
      <QrScannerModal onScanSuccess={handleScanSuccess} />

      {/* Mostra os dados escaneados se existir */}
      {cupomData && (
        <div className="w-full max-w-4xl mt-4 bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Dados do QR Code</h2>
          <p>{cupomData}</p> {/* Mostra o conteúdo do QR code */}
        </div>
      )}
    </div>
  );
};

export default App;
