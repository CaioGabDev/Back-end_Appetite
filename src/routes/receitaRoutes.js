const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const receitaController = require('../controllers/receitaController');

const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Pasta uploads criada:', uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('📂 Destino:', uploadsDir);
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const nomeUnico = `${Date.now()}-${file.originalname}`;
    console.log('📝 Arquivo:', nomeUnico);
    cb(null, nomeUnico);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// ========== 1️⃣ ROTAS SEM PARÂMETROS ==========
router.get('/receitas/favoritas/all', receitaController.getReceitasFavoritas);
router.get('/receitas', receitaController.getAllReceitas);
router.post('/receitas', upload.single('imagem'), receitaController.createReceita);

// ========== 2️⃣ ROTAS COM SUBPATH - ANTES DO /:id ==========
router.put('/receitas/:id/favorita', receitaController.toggleFavorita);
router.put('/receitas/:id/avaliacao', receitaController.updateAvaliacao);

// ========== 3️⃣ ROTAS GENÉRICAS COM PARÂMETRO ==========
router.get('/receitas/:id', receitaController.getReceitaById);
router.put('/receitas/:id', upload.single('imagem'), receitaController.updateReceita);
router.delete('/receitas/:id', receitaController.deleteReceita);

// ========== MIDDLEWARE DE ERRO ==========
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error('❌ MulterError:', err.code, err.message);
    return res.status(400).json({ 
      error: 'Erro no upload',
      code: err.code,
      details: err.message 
    });
  } else if (err) {
    console.error('❌ Erro:', err.message);
    return res.status(400).json({ error: err.message });
  }
  next();
});

module.exports = router;
