const CategoriaModel = require('../models/CategoriaModel');

const getAllCategorias = async (req, res) => {
    try {
        const categorias = await CategoriaModel.getCategorias();
        res.json(categorias);
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        res.status(500).json({ error: 'Erro ao buscar categorias.' });
    }
};

const getCategoriaById = async (req, res) => {
    try {
        const categoria = await CategoriaModel.getCategoriaById(req.params.id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoria não encontrada.' });
        }
        res.json(categoria);
    } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        res.status(500).json({ error: 'Erro ao buscar categoria.' });
    }
};

const deleteCategoria = async (req, res) => {
    try {
        const result = await CategoriaModel.deleteCategoria(req.params.id);
        if (!result) {
            return res.status(404).json({ error: 'Categoria não encontrada.' });
        }
        res.json({ message: 'Categoria deletada com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar categoria:', error);
        res.status(500).json({ error: 'Erro ao deletar categoria.' });
    }
};

const updateCategoria = async (req, res) => {
    try {
        const { nome } = req.body;
        

        if (!nome) {
            return res.status(400).json({ 
                error: 'Nome é obrigatório.' 
            });
        }

        const categoria = await CategoriaModel.updateCategoria(req.params.id, nome);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoria não encontrada.' });
        }
        res.json(categoria);
    } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        res.status(500).json({ error: 'Erro ao atualizar categoria.' });
    }
};

const createCategoria = async (req, res) => {
    try {
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({ 
                error: 'Nome é obrigatório.' 
            });
        }

        const categoria = await CategoriaModel.createCategoria(nome);
        res.status(201).json(categoria);
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        res.status(500).json({ error: 'Erro ao criar categoria.' });
    }
};

module.exports = { getAllCategorias, getCategoriaById, deleteCategoria, updateCategoria, createCategoria };
