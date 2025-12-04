const express = require('express');
const router = express.Router();
const receitaController = require("../controllers/receitaController.js");

router.get('/receitas', receitaController.getAllReceitas);
router.get('/receitas/categoria/:categoria', receitaController.getReceitasByCategoria);  // Nova rota
router.get('/receitas/favoritas', receitaController.getReceitasFavoritas);
router.get('/receitas/:id', receitaController.getReceitaById);
router.post('/receitas/nova', receitaController.createReceita);
router.put('/receitas/editar/:id', receitaController.updateReceita);
router.put('/receitas/favoritas/:id', receitaController.toggleFavorita);
router.delete('/receitas/:id', receitaController.deleteReceita);

module.exports = router;
