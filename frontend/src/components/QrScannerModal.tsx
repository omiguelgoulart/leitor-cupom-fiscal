import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css'; // Importa os estilos do modal
import QrScanner from './QrScanner'; // Componente que escaneia o QR Code

interface QrScannerModalProps {
  onScanSuccess: (data: string) => void; // Função que recebe o QR Code
}

const QrScannerModal: React.FC<QrScannerModalProps> = ({ onScanSuccess }) => {
  const [open, setOpen] = useState(false); // Controla o estado do modal

  // Funções para abrir e fechar o modal
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleOpenModal}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Abrir Câmera
      </button>

      {/* Modal que contém o scanner de QR Code */}
      <Modal open={open} onClose={handleCloseModal} center>
        <h2 className="text-xl font-semibold mb-4">Escanear QR Code</h2>
        <QrScanner onScanSuccess={onScanSuccess} />
      </Modal>
    </div>
  );
};

export default QrScannerModal;
