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

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/categorias` | Lista todas as categorias |
| `GET` | `/categorias/:id` | Obtém uma categoria específica |
| `POST` | `/categorias` | Cria uma nova categoria |
| `PUT` | `/categorias/:id` | Atualiza uma categoria |
| `DELETE` | `/categorias/:id` | Remove uma categoria |

#### Exemplos de uso:

**POST /categorias** - Criar categoria
```json
{
  "nome": "Sobremesas"
}
```

**PUT /categorias/:id** - Atualizar categoria
```json
{
  "nome": "Sobremesas Geladas"
}
```

---

### Receitas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/receitas` | Lista todas as receitas |
| `GET` | `/receitas/:id` | Obtém uma receita específica |
| `GET` | `/receitas/favoritas/all` | Lista todas as receitas favoritas |
| `POST` | `/receitas` | Adiciona uma nova receita |
| `PUT` | `/receitas/:id` | Atualiza uma receita |
| `PUT` | `/receitas/:id/favorita` | Alterna status de favorita |
| `PUT` | `/receitas/:id/avaliacao` | Atualiza avaliação da receita |
| `DELETE` | `/receitas/:id` | Remove uma receita |

#### Exemplos de uso:

**POST /receitas** - Criar receita
```json
{
  "titulo": "Bolo de Chocolate",
  "descricao": "Um delicioso bolo de chocolate fofinho",
  "ingredientes": "2 xícaras de farinha, 1 xícara de açúcar, 3 ovos, 1 xícara de chocolate em pó",
  "modo_preparo": "Misture todos os ingredientes e leve ao forno por 40 minutos",
  "imagem": "https://exemplo.com/bolo.jpg",
  "favorita": false,
  "avaliacao": 5,
  "tempo_preparo": 60,
  "dificuldade": "MEDIO",
  "categoria_id": 1
}
```

**PUT /receitas/:id** - Atualizar receita
```json
{
  "titulo": "Bolo de Chocolate Premium",
  "descricao": "Um delicioso bolo de chocolate fofinho com cobertura",
  "ingredientes": "2 xícaras de farinha, 1 xícara de açúcar, 3 ovos, 1 xícara de chocolate em pó, ganache",
  "modo_preparo": "Misture todos os ingredientes e leve ao forno por 40 minutos. Cubra com ganache.",
  "imagem": "https://exemplo.com/bolo-premium.jpg",
  "favorita": true,
  "avaliacao": 5,
  "tempo_preparo": 75,
  "dificuldade": "DIFICIL",
  "categoria_id": 1
}
```

**DELETE /receitas/:id** - Deletar receita
```bash
# Exemplo usando curl
curl -X DELETE http://localhost:3000/api/receitas/1
```

**Resposta de sucesso (200):**
```json
{
  "message": "Receita deletada com sucesso",
  "id": 1
}
```

**Resposta de erro (404):**
```json
{
  "error": "Receita não encontrada"
}
```

---

**PUT /receitas/:id/favorita** - Alternar favorita
```json
{
  "favorita": true
}
```

**Resposta:**
```json
{
  "message": "❤️ Receita favoritada!",
  "receita": { ... }
}
```

---

**PUT /receitas/:id/avaliacao** - Atualizar avaliação
```json
{
  "avaliacao": 5
}
```

**Resposta:**
```json
{
  "message": "⭐ Receita avaliada com 5 estrelas!",
  "receita": { ... }
}
```

#### Campos da Receita:

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `titulo` | string | Sim | Título único da receita (máx. 255 caracteres) |
| `descricao` | string | Não | Descrição detalhada da receita |
| `ingredientes` | string | Não | Lista de ingredientes |
| `modo_preparo` | string | Não | Instruções de preparo |
| `imagem` | string | Não | URL da imagem da receita |
| `favorita` | boolean | Não | Se a receita é favorita (padrão: false) |
| `avaliacao` | integer | Não | Avaliação de 1 a 5 |
| `tempo_preparo` | integer | Não | Tempo de preparo em minutos |
| `dificuldade` | string | Sim | Nível de dificuldade: `FACIL`, `MEDIO` ou `DIFICIL` |
| `categoria_id` | integer | Não | ID da categoria relacionada |

## 🗄️ Estrutura do Banco de Dados

O banco de dados possui duas tabelas principais:

### Tabela: Categorias

```sql
CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
);
```

### Tabela: Receitas

```sql
CREATE TABLE receitas (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  ingredientes TEXT,
  modo_preparo TEXT,
  imagem TEXT,
  favorita BOOLEAN DEFAULT FALSE,
  avaliacao INTEGER CHECK (avaliacao >= 1 AND avaliacao <= 5),
  tempo_preparo INTEGER,
  dificuldade VARCHAR(30) CHECK (dificuldade IN ('FACIL', 'MEDIO', 'DIFICIL')) NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  categoria_id INTEGER REFERENCES categorias(id) ON DELETE SET NULL,
  UNIQUE (titulo)
);
```

### Diagrama de Relacionamento

```
┌─────────────────┐       ┌─────────────────────┐
│   CATEGORIAS    │       │      RECEITAS       │
├─────────────────┤       ├─────────────────────┤
│ id (PK)         │◄──────│ categoria_id (FK)   │
│ nome            │       │ id (PK)             │
└─────────────────┘       │ titulo (UNIQUE)     │
                          │ descricao           │
                          │ ingredientes        │
                          │ modo_preparo        │
                          │ imagem              │
                          │ favorita            │
                          │ avaliacao           │
                          │ tempo_preparo       │
                          │ dificuldade         │
                          │ data_criacao        │
                          └─────────────────────┘
```

## 🔧 Tecnologias Utilizadas

- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)

## 📝 Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `npm start` | Iniciar o servidor |
| `npm run dev` | Executar em modo desenvolvimento |

## 🤝 Contribuindo

1. Deixa uma estrelinha no repositório 😉😉😉
