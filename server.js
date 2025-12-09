require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ========== IMPORTAR ROTAS ==========
const receitaRoutes = require('./src/routes/receitaRoutes');
const categoriaRoutes = require('./src/routes/categoriaRoutes');

// ========== REGISTRAR ROTAS ==========
app.use('/api', receitaRoutes);
app.use('/api', categoriaRoutes);

// ========== ROTA DE TESTE ==========
app.get('/', (req, res) => {
  res.json({ message: '✅ API Appetite funcionando!' });
});

// ========== MIDDLEWARE DE ERRO GLOBAL ==========
app.use((err, req, res, next) => {
  console.error(`\n${'!'.repeat(60)}`);
  console.error('❌ ERRO:', err.message);
  console.error(`${'!'.repeat(60)}\n`);
  
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    details: err.message
  });
});

// ========== PORTA ==========
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log('\n📚 ROTAS DISPONÍVEIS:');
  console.log('   ✅ GET    /api/receitas');
  console.log('   ✅ POST   /api/receitas');
  console.log('   ✅ GET    /api/receitas/:id');
  console.log('   ✅ PUT    /api/receitas/:id');
  console.log('   ✅ DELETE /api/receitas/:id');
  console.log('   ✅ PUT    /api/receitas/:id/favorita');
  console.log('   ✅ PUT    /api/receitas/:id/avaliacao');
  console.log('   ✅ GET    /api/receitas/favoritas/all');
  console.log('   ✅ GET    /api/categorias\n');
});

module.exports = app;