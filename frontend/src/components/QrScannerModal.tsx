import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css'; // Importa os estilos da modal
import QrScanner from './QrScanner'; // O componente de leitura de QR Code

interface QrScannerModalProps {
  onScanSuccess: (data: string) => void; // Função chamada quando o QR Code for lido com sucesso
}

const QrScannerModal: React.FC<QrScannerModalProps> = ({ onScanSuccess }) => {
  const [open, setOpen] = useState(false); // Controla o estado de abertura do modal

  // Funções para abrir e fechar o modal
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <div className="flex flex-col items-center">
      {/* Botão para abrir o modal */}
      <button
        onClick={handleOpenModal}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Abrir Câmera
      </button>

      {/* Modal que contém o componente QrScanner */}
      <Modal open={open} onClose={handleCloseModal} center>
        <h2 className="text-xl font-semibold mb-4">Escanear QR Code</h2>
        <QrScanner onScanSuccess={(data) => {
          onScanSuccess(data);  // Passa o QR Code lido para a função do App
          handleCloseModal();   // Fecha o modal após a leitura do QR
        }} />
      </Modal>
    </div>
  );
};

export default QrScannerModal;
