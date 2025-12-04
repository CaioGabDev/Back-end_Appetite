# Backend AppetiteDB

Este é um projeto backend que gerencia um banco de dados de receitas com funcionalidades para usuários.

## 🛠️ Pré-requisitos

- Node.js
- PostgreSQL
- npm ou yarn

## 🚀 Configuração do Projeto

1. **Clone o repositório**
   ```bash
   git clone https://github.com/CaioGabDev/Back-end_Appetite
   cd Back-end_Appetite
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
    DB_NAME=appetitedb
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

### Categorias
- `GET /categorias` - Lista todos os personagens
- `GET /categorias/:id` - Obtém um personagem específico
- `POST /categorias` - Cria um novo personagem
- `PUT /categorias/:id` - Atualiza um personagem
- `DELETE /categorias/:id` - Remove um personagem

### Receitas
- `GET /receitas` - Lista todos os favoritos
- `GET /receitas/:id` - Obtém um favorito específico
- `POST /receitas` - Adiciona um novo favorito
- `DELETE /receitas/:id` - Remove um favorito

## 🗄️ Estrutura do Banco de Dados

O banco de dados possui duas tabelas principais:

1. **Categorias**
  - id SERIAL PRIMARY KEY,
  - nome VARCHAR(100) NOT NULL


2. **Receitas**
   - id SERIAL PRIMARY KEY,
   - titulo VARCHAR(255) NOT NULL,
   - descricao TEXT,
   - ingredientes TEXT,
   - modo_preparo TEXT,
   - imagem TEXT,
   - favorita BOOLEAN DEFAULT FALSE,
   - avaliacao INTEGER CHECK (avaliacao >= 1 AND avaliacao <= 5),  -- Avaliação de 1 a 5
   - tempo_preparo INTEGER,  -- Tempo de preparo em minutos
   - dificuldade VARCHAR(30) CHECK (dificuldade IN ('FACIL', 'MEDIO', 'DIFICIL')) NOT NULL,
   - data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   - categoria_id INTEGER REFERENCES categorias(id) ON DELETE SET NULL,  -- Relacionamento direto com categorias
   - UNIQUE (titulo)  -- Garantir que o título da receita seja único


## 🔧 Tecnologias Utilizadas

- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)

## 📝 Comandos Úteis

- Iniciar o servidor: `npm start`
- Executar em modo desenvolvimento: `npm run dev`

## 🤝 Contribuindo

1. Deixa uma estrelinha no repositório 😉😉😉
