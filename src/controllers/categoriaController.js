const PersonagemModel = require('../models/CategoriaModel');

const getAllPersonagens = async (req, res) => {
    try {
        const personagens = await PersonagemModel.getPersonagens();
        res.json(personagens);
    } catch (error) {
        console.error('Erro ao buscar personagens:', error);
        res.status(500).json({ error: 'Erro ao buscar personagens.' });
    }
};

const getPersonagemById = async (req, res) => {
    try {
        const personagem = await PersonagemModel.getPersonagemById(req.params.id);
        if (!personagem) {
            return res.status(404).json({ error: 'Personagem não encontrado.' });
        }
        res.json(personagem);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar personagem.' });
    }
};

const createPersonagem = async (req, res) => {
    try {
        const { nome, descricao, imagem_url, filmes, curiosidades } = req.body;
        const newPersonagem = await PersonagemModel.createPersonagem(nome, descricao, imagem_url, filmes, curiosidades);
        res.status(201).json(newPersonagem);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar personagem.' });
    }
};

const updatePersonagem = async (req, res) => {
    try {
        const { nome, descricao, imagem_url, filmes, curiosidades } = req.body;
        const personagem = await PersonagemModel.updatePersonagem(req.params.id, nome, descricao, imagem_url, filmes, curiosidades);
        if (!personagem) {
            return res.status(404).json({ error: 'Personagem não encontrado.' });
        }
        res.json(personagem);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao editar personagem.' });
    }
};

const deletePersonagem = async (req, res) => {
    try {
        const result = await PersonagemModel.deletePersonagem(req.params.id);
        if (result.error) {
            return res.status(404).json(result);
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar personagem.' });
    }
};

module.exports = { getAllPersonagens, getPersonagemById, createPersonagem, updatePersonagem, deletePersonagem };
