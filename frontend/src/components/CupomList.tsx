import React from 'react';
import { exportToCSV } from '../utils/csvHelper';

interface CupomData {
  nome: string;
  valor: string;
  data: string;
  number: string;
  
}

interface CupomListProps {
  cupons: CupomData[];
  onClear: () => void;
}

const CupomList: React.FC<CupomListProps> = ({ cupons, onClear }) => {
  const handleExportAndClear = () => {
    exportToCSV(cupons);
    onClear();
  };

  return (
    <div className="w-full max-w-4xl mt-8">
      <h2 className="text-2xl font-semibold mb-4">Histórico de Cupons Fiscais</h2>
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Nº/ Série</th>
            <th className="px-4 py-2">Valor</th>
            <th className="px-4 py-2">Data</th>
          </tr>
        </thead>
        <tbody>
          {cupons.map((cupom, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2 text-center">{cupom.nome}</td>
              <td className="px-4 py-2 text-center">{cupom.number}</td>
              <td className="px-4 py-2 text-center">{cupom.valor}</td>
              <td className="px-4 py-2 text-center">{cupom.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {cupons.length > 0 && (
        <button
          className="mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
          onClick={handleExportAndClear}
        >
          Exportar Tabela
        </button>
      )}
    </div>
  );
};

export default CupomList;
