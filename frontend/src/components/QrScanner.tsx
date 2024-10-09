import { useState } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import * as cheerio from "cheerio";

interface QrScannerProps {
  onScanSuccess: (data: string) => void; // A prop onScanSuccess está sendo declarada
}

const QrScanner: React.FC<QrScannerProps> = ({ onScanSuccess }) => {  // Recebe as props corretamente
  const [data, setData] = useState("Nenhum resultado");
  const [cupomData, setCupomData] = useState({ nome: "", valor: "", data: "" });

  const handleScanSuccess = async (qrData: string) => {
    try {
      console.log("QR Code identificado:", qrData);
      setData(qrData);

      // Fazer a requisição HTTP diretamente no frontend (CORS pode bloquear)
      const response = await axios.get(qrData);
      console.log("Resposta da URL:", response);

      const html = response.data;
      const $ = cheerio.load(html);

      const nomeEstabelecimento = $('.txtTopo').first().text().trim();
      const valorTotal = $('#linhaTotal .txtMax').first().text().trim();
      const dataEmissao = $('strong:contains("Emissão:")')
        .parent()
        .text()
        .split('Emissão:')[1]
        .trim()
        .split('-')[0]
        .trim();

      setCupomData({ nome: nomeEstabelecimento, valor: valorTotal, data: dataEmissao });

      // Chama a função onScanSuccess para enviar os dados para o componente pai
      onScanSuccess(qrData);
    } catch (error) {
      console.error("Erro ao buscar os dados do cupom", error);
    }
  };

  return (
    <div>
      <QrReader
        onResult={(result, error) => {
          if (result?.getText()) {
            handleScanSuccess(result.getText());
          }
          if (error) {
            console.error(error);
          }
        }}
        constraints={{ facingMode: "environment" }} // Força a câmera traseira
        className="w-60"
      />
      <p>{data}</p>

      {cupomData.nome && (
        <div>
          <p><strong>Nome:</strong> {cupomData.nome}</p>
          <p><strong>Valor:</strong> {cupomData.valor}</p>
          <p><strong>Data:</strong> {cupomData.data}</p>
        </div>
      )}
    </div>
  );
};

export default QrScanner;
