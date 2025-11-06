CREATE DATABASE appetitedb;

\c appetitedb;

-- Tabela: receitas
CREATE TABLE receitas (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  ingredientes TEXT,
  modo_preparo TEXT,
  imagem TEXT,
  favorita BOOLEAN DEFAULT FALSE,
  avaliacao INTEGER CHECK (avaliacao >= 1 AND avaliacao <= 5),  -- Avaliação de 1 a 5
  tempo_preparo INTEGER,  -- Tempo de preparo em minutos
  dificuldade VARCHAR(30) CHECK (dificuldade IN ('FÁCIL', 'MÉDIO', 'DIFÍCIL')) NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: categorias
CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
);

-- Tabela: receita_categorias (Relacionamento N:N)
CREATE TABLE receita_categorias (
  receita_id INTEGER REFERENCES receitas(id) ON DELETE CASCADE,
  categoria_id INTEGER REFERENCES categorias(id) ON DELETE CASCADE,
  PRIMARY KEY (receita_id, categoria_id)
);
