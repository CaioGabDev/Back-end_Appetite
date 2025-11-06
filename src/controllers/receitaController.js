const FavoritosModel = require('../models/FavoritoModel');

const getAllFavoritos = async (req, res) => {
    try {
        const favoritos = await FavoritosModel.getFavoritos();
        res.json(favoritos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar favoritos.' });
    }
};

const getFavoritoById = async (req, res) => {
    try {
        const favorito = await FavoritosModel.getFavoritoById(req.params.id);
        if (!favorito) {
            return res.status(404).json({ error: 'Favorito não encontrado.' });
        }
        res.json(favorito);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar favorito.' });
    }
};

const createFavorito = async (req, res) => {
    try {
        const { personagem_id } = req.body; 
        const favorito = await FavoritosModel.createFavorito(personagem_id);
        res.status(201).json(favorito);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar favorito." });
    }
};

const updateFavorito = async (req, res) => {
    try {
        const { personagem_id } = req.body; // removido usuario_id
        const favorito = await FavoritosModel.updateFavorito(req.params.id, personagem_id);
        if (!favorito) {
            return res.status(404).json({ error: "Favorito não encontrado." });
        }
        res.status(200).json(favorito);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar favorito." });
    }
};

const deleteFavorito = async (req, res) => {
    try {
        const result = await FavoritosModel.deleteFavorito(req.params.id);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json(result);
    } catch (error) {
        console.error('Erro ao deletar favorito:', error);
        res.status(500).json({ error: 'Erro ao deletar favorito.' });
    }
};

module.exports = { getAllFavoritos, getFavoritoById, createFavorito, updateFavorito, deleteFavorito };
