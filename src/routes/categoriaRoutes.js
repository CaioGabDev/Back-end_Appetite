const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// ========== ROTAS DE CATEGORIAS ==========

// GET - Todas as categorias
router.get('/categorias', categoriaController.getCategorias);

// GET - Categoria por ID
router.get('/categorias/:id', categoriaController.getCategoriaById);

// POST - Criar categoria
router.post('/categorias', categoriaController.createCategoria);

// PUT - Atualizar categoria
router.put('/categorias/:id', categoriaController.updateCategoria);

// DELETE - Deletar categoria
router.delete('/categorias/:id', categoriaController.deleteCategoria);

// ========== MIDDLEWARE DE ERRO ==========
router.use((err, req, res, next) => {
  console.error('❌ Erro na rota de categorias:', err.message);
  res.status(500).json({ error: err.message });
});

module.exports = router;
