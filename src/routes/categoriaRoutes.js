const express = require('express');
const router = express.Router();
const personagemController = require('../controllers/categoriaController.js');

router.get('/personagens/', personagemController.getAllPersonagens);
router.get('/personagens/:id', personagemController.getPersonagemById);
router.post('/personagens/', personagemController.createPersonagem);
router.put('/personagens/:id', personagemController.updatePersonagem);
router.delete('/personagens/:id', personagemController.deletePersonagem);

module.exports = router;
