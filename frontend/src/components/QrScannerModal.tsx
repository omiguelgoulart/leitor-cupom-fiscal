import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import QrScanner from './QrScanner';  // Importa o QrScanner com a prop onScanSuccess

const QrScannerModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleScanSuccess = (data: string) => {
    console.log("QR Code escaneado com sucesso:", data);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Abrir Câmera
      </button>

      <Modal open={open} onClose={() => setOpen(false)} center>
        <h2 className="text-xl font-semibold mb-4">Escanear QR Code</h2>
        <QrScanner onScanSuccess={handleScanSuccess} />  {/* Passando a prop onScanSuccess corretamente */}
      </Modal>
    </div>
  );
};

export default QrScannerModal;
