import { useState } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import * as cheerio from "cheerio";

interface QrScannerProps {
  onScanSuccess: (data: string) => void;
}

const QrScanner: React.FC<QrScannerProps> = () => {
  const [data, setData] = useState("Nenhum resultado");
  const [cupomData, setCupomData] = useState({ nome: "", valor: "", data: "" });

  const handleScanSuccess = async (qrData: string) => {
    try {
      console.log("QR Code identificado:", qrData);
      setData(qrData);

      // Fazer a requisição HTTP diretamente no frontend
      const response = await axios.get(qrData);

      console.log("Resposta da URL:", response);

      const html = response.data;

      // Carregar o HTML com Cheerio
      const $ = cheerio.load(html);

      // Extrair dados usando seletores
      const nomeEstabelecimento = $('.txtTopo').first().text().trim();
      const valorTotal = $('#linhaTotal .txtMax').first().text().trim();
      const dataEmissao = $('strong:contains("Emissão:")')
        .parent()
        .text()
        .split('Emissão:')[1]
        .trim()
        .split('-')[0]
        .trim();

      console.log("Nome:", nomeEstabelecimento, "Valor:", valorTotal, "Data:", dataEmissao);

      setCupomData({ nome: nomeEstabelecimento, valor: valorTotal, data: dataEmissao });
    } catch (error) {
      console.error("Erro ao buscar os dados do cupom", error);
      if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
        alert('A requisição foi bloqueada devido à política de CORS.');
      }
    }
  };

  return (
    <div>
      <QrReader
        onResult={(result: any) => {
          if (result?.text) {
            handleScanSuccess(result.text);
          }
        }}
        constraints={{ facingMode: 'environment' }} // Forçar a câmera traseira
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
