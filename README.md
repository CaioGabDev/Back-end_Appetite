# Backend CarrosDB

Este é um projeto backend que gerencia um banco de dados de carros com funcionalidades para personagens e favoritos.

## 🛠️ Pré-requisitos

- Node.js
- PostgreSQL
- npm ou yarn

## 🚀 Configuração do Projeto

1. **Clone o repositório**
   ```bash
   git clone https://github.com/CaioGabDev/atividade-backend-carrosdb.git
   cd atividade-backend-carrosdb
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o banco de dados**
   - Execute o script SQL localizado em `src/database/schema.sql` para criar as tabelas necessárias

4. **Configure as variáveis de ambiente**
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione as seguintes variáveis:
     ```env
    PORT=3000
    DB_USER=postgres
    DB_HOST=localhost
    DB_NAME=carrosdb
    DB_PASSWORD=amods
    DB_PORT=7777
     ```

## 🏃‍♂️ Como Executar

1. **Inicie o servidor**
   ```bash
   npm start
   ```
   O servidor iniciará na porta 3000 por padrão.

## 📚 Endpoints da API

### Personagens
- `GET /personagens` - Lista todos os personagens
- `GET /personagens/:id` - Obtém um personagem específico
- `POST /personagens` - Cria um novo personagem
- `PUT /personagens/:id` - Atualiza um personagem
- `DELETE /personagens/:id` - Remove um personagem

### Favoritos
- `GET /favoritos` - Lista todos os favoritos
- `GET /favoritos/:id` - Obtém um favorito específico
- `POST /favoritos` - Adiciona um novo favorito
- `DELETE /favoritos/:id` - Remove um favorito

## 🗄️ Estrutura do Banco de Dados

O banco de dados possui duas tabelas principais:

1. **Personagens**
   - id (SERIAL PRIMARY KEY)
   - nome (VARCHAR)
   - descricao (TEXT)
   - imagem (VARCHAR)

2. **Favoritos**
   - id (SERIAL PRIMARY KEY)
   - personagem_id (INTEGER - Foreign Key referenciando Personagens)

## 🔧 Tecnologias Utilizadas

- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)

## 📝 Comandos Úteis

- Iniciar o servidor: `npm start`
- Executar em modo desenvolvimento: `npm run dev`

## 🤝 Contribuindo

1. Deixa uma estrelinha no repositório do Titio ai 😉😉😉
