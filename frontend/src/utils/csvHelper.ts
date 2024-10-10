// src/utils/csvHelper.ts
export const exportToCSV = (data: any[]) => {
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(',')); // Adiciona cabeçalhos das colunas

  for (const row of data) {
    const values = headers.map(header => row[header]);
    csvRows.push(values.join(','));
  }

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', 'cupons_fiscais.csv');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
