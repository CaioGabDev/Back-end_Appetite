require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./config/database');
const receitaRoutes = require('./routes/receitas');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rota para buscar receitas com filtro de categoria
app.get('/api/receitas', async (req, res) => {
  try {
    const { categoria } = req.query;
    
    console.log('Parametro categoria recebido:', categoria);
    
    let query = `
      SELECT r.*, c.nome as categoria_nome 
      FROM receitas r 
      LEFT JOIN categorias c ON r.categoria_id = c.id
    `;
    
    let params = [];
    
    if (categoria) {
      query += ` WHERE c.nome ILIKE $1`;
      params.push(categoria);
      console.log('Query com filtro:', query, 'Parametros:', params);
    }
    
    query += ` ORDER BY r.data_criacao DESC`;
    
    const result = await pool.query(query, params);
    
    console.log('Receitas encontradas:', result.rows.length);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para buscar categorias
app.get('/api/categorias', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categorias ORDER BY nome');
    console.log('Categorias encontradas:', result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Outras rotas
app.use('/api', receitaRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API Appetite funcionando!' });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Acesse: http://localhost:${PORT}`);
});

module.exports = app;