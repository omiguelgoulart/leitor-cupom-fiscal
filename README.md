# Leitor de QR Code para Cupons Fiscais

Este projeto é um leitor de QR Code que extrai informações de cupons fiscais, como nome do estabelecimento, valor total e data de emissão, e exibe esses dados em uma tabela de histórico. Ele utiliza tecnologias como React, TypeScript, Express.js e Axios para realizar a leitura e o processamento de dados do QR Code e fazer requisições a uma API para recuperar os dados do cupom.

## Funcionalidades

- Leitura de QR Codes de cupons fiscais utilizando a câmera do dispositivo.
- Envio dos dados do QR Code para uma API que extrai informações como nome do estabelecimento, valor e data.
- Exibição dos dados dos cupons em uma tabela.
- Histórico de cupons salvos localmente no `localStorage` do navegador.
- Exportação do histórico de cupons em formato CSV.
- Limpeza do histórico após a exportação.

## Tecnologias Utilizadas

- **Frontend:**
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Axios](https://axios-http.com/)
  - [React QR Reader](https://www.npmjs.com/package/react-qr-reader)

- **Backend:**
  - [Express](https://expressjs.com/)
  - [Cheerio](https://cheerio.js.org/) (para parsing do HTML)
  - [Axios](https://axios-http.com/) (para fazer requisições à SEFAZ)

## Instalação e Execução

### Pré-requisitos

- Node.js (>= 14.x)
- npm ou yarn

### Como Rodar o Projeto

1. Clone o repositório:
    ```bash
    git clone https://github.com/omiguelgoulart/leitor-cupom-fiscal
    ```

2. Acesse o diretório do projeto:
    ```bash
    cd leitor-cupom-fiscal
    ```

3. Instale as dependências do frontend:
    ```bash
    cd frontend
    npm install
    ```

4. Instale as dependências do backend:
    ```bash
    cd ../backend
    npm install
    ```

5. Inicie o backend:
    ```bash
    npm run dev
    ```

6. Inicie o frontend:
    ```bash
    cd ../frontend
    npm run dev
    ```
`


## Como Usar

1. **Escanear um QR Code:** Use o botão "Abrir Câmera" para abrir o modal de escaneamento. O QR Code será lido automaticamente.

2. **Enviar Dados para API:** Após escanear o QR Code, clique no botão "Fazer Requisição à API" para enviar os dados e processar o cupom.

3. **Histórico de Cupons:** A tabela exibirá todos os cupons processados e salvos no `localStorage`.

4. **Exportar em CSV:** Utilize o botão "Exportar Tabela" para salvar o histórico de cupons como um arquivo CSV.

5. **Limpar Histórico:** Após exportar a tabela, o histórico será automaticamente limpo.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir **issues** e **pull requests** para melhorar o projeto.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.



