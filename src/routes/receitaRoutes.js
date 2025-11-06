const express = require('express');
const router = express.Router();
const favoritoController = require("../controllers/receitaController.js");

router.get("/favoritos", favoritoController.getAllFavoritos);
router.get("/favoritos/:id", favoritoController.getFavoritoById);
router.post("/favoritos", favoritoController.createFavorito);
router.put("/favoritos/:id", favoritoController.updateFavorito);
router.delete("/favoritos/:id", favoritoController.deleteFavorito);

module.exports = router;
