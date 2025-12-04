const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController.js');
const receitaController = require('../controllers/receitaController.js');

router.get('/categorias', categoriaController.getAllCategorias);
router.get('/categorias/:id', categoriaController.getCategoriaById);
router.post('/categorias', categoriaController.createCategoria);
router.put('/categorias/:id', categoriaController.updateCategoria);
router.delete('/categorias/:id', categoriaController.deleteCategoria);

router.get('/receitas', receitaController.getAllReceitas);
router.get('/receitas/categoria/:categoria', receitaController.getReceitasByCategoria);  // Nova rota
router.get('/receitas/favoritas', receitaController.getReceitasFavoritas);

module.exports = router;
