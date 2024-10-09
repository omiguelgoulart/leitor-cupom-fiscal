import { useState } from "react";
import { QrReader } from "react-qr-reader";


interface QrScannerProps {
  onScanSuccess: (data: string) => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScanSuccess }) => {
  const [data, setData] = useState<string | null>(null);

  const handleScanSuccess = async (qrData: string) => {
    console.log("QR Code identificado:", qrData);
    setData(qrData);

    // Chama o callback onScanSuccess e passa os dados lidos
    onScanSuccess(qrData);
  };

  return (
    <div>
      <QrReader
        onResult={(result: any, error: any) => {
          if (result?.text) {
            handleScanSuccess(result.text);
          }
          if (error) {
            console.error(error);
          }
        }}
        constraints={{ facingMode: "environment" }}
        className="w-60"
      />
      <p>{data}</p>
    </div>
  );
};

export default QrScanner;
