import { CupomData } from '../pages/Home';

export const exportToCSV = (data: CupomData[]) => {
  const csvContent = "data:text/csv;charset=utf-8," 
    + ["Nome,Valor,Data", ...data.map(item => `${item.nome},${item.valor},${item.data}`)].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'cupons_fiscais.csv');
  document.body.appendChild(link); // Required for FF
  link.click();
};
