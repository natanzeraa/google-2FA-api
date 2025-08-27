# Sistema de gestão de clientes + Integração com API Bancária

API para gerenciamento de clientes, organizações e autenticação, desenvolvida em Node.js com Express e MongoDB.

## Funcionalidades

- Cadastro e autenticação de organizações
- Cadastro, listagem, atualização e remoção de clientes
- Consulta de dados de CNPJ via ReceitaWS
- Validação de dados com Zod
- Proteção de rotas com JWT

## Estrutura do Projeto

```
src/
  config/           # Configuração do banco de dados
  controllers/      # Lógica dos endpoints
  middlewares/      # Middlewares de validação e autenticação
  models/           # Modelos Mongoose (MongoDB)
  routes/           # Rotas da API
  services/         # Regras de negócio
  utils/            # Utilitários, mensagens e validações
```

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/EMB-Contabilidade-Empresarial-LTDA/customers.git
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure o arquivo `.env` conforme o exemplo em `.env.example`.

## Executando o Projeto

```sh
npm run dev
```

## Endpoints Principais

- `POST /auth/signup` — Cadastro de organização
- `POST /auth/login` — Login de organização
- `GET /customers` — Listar clientes (autenticado)
- `POST /customers` — Criar cliente (autenticado)
- `GET /cnpj/:cnpj` — Consultar dados de CNPJ

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB & Mongoose
- JWT
- Zod
- Bcrypt

## Observações

- É necessário ter o MongoDB rodando e configurar a variável `DATABASE_URI` no `.env`.
- As rotas de clientes são protegidas por autenticação JWT.
