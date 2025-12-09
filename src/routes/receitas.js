const express = require('express');
const router = express.Router();
const multer = require('multer');
const receitaController = require('../controllers/receitaController');

// Configurar multer para salvar imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Pasta onde as imagens serão salvas
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // Nome único para cada arquivo
  }
});

const upload = multer({ storage: storage });

// Rotas
router.get('/receitas', receitaController.getAllReceitas);
router.post('/receitas', upload.single('imagem'), receitaController.createReceita); // 'imagem' é o nome do campo
router.get('/receitas/:id', receitaController.getReceitaById);
router.put('/receitas/:id', upload.single('imagem'), receitaController.updateReceita);
router.delete('/receitas/:id', receitaController.deleteReceita);

module.exports = router;