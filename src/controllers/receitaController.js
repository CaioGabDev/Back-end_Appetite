const ReceitaModel = require('../models/ReceitaModel');

const validDificuldades = ['FACIL', 'MEDIO', 'DIFICIL'];

const getAllReceitas = async (req, res) => {
    try {
        const receitas = await ReceitaModel.getReceitas();
        res.json(receitas);
    } catch (error) {
        console.error('Erro ao buscar receitas:', error);
        res.status(500).json({ error: 'Erro ao buscar receitas.' });
    }
};

const getReceitasFavoritas = async (req, res) => {
    try {
        const receitas = await ReceitaModel.getReceitasFavoritas();
        res.json(receitas);
    } catch (error) {
        console.error('Erro ao buscar receitas favoritas:', error);
        res.status(500).json({ error: 'Erro ao buscar receitas favoritas.' });
    }
};

const getReceitaById = async (req, res) => {
    try {
        const receita = await ReceitaModel.getReceitaById(req.params.id);
        if (!receita) {
            return res.status(404).json({ error: 'Receita não encontrada.' });
        }
        res.json(receita);
    } catch (error) {
        console.error('Erro ao buscar receita:', error);
        res.status(500).json({ error: 'Erro ao buscar receita.' });
    }
};

const deleteReceita = async (req, res) => {
    try {
        const result = await ReceitaModel.deleteReceita(req.params.id);
        if (!result) {
            return res.status(404).json({ error: 'Receita não encontrada.' });
        }
        res.json({ message: 'Receita deletada com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar receita:', error);
        res.status(500).json({ error: 'Erro ao deletar receita.' });
    }
};

const updateReceita = async (req, res) => {
    try {
        const {
            titulo,
            descricao,
            ingredientes,
            modo_preparo,
            imagem,
            favorita,
            avaliacao,
            tempo_preparo,
            dificuldade
        } = req.body;

        // Validações
        if (dificuldade && !validDificuldades.includes(dificuldade)) {
            return res.status(400).json({ 
                error: `Dificuldade inválida. Valores válidos: ${validDificuldades.join(', ')}` 
            });
        }

        let avaliacaoFinal = avaliacao;
        if (avaliacao !== undefined) {
            const av = parseInt(avaliacao, 10);
            if (isNaN(av) || av < 1 || av > 5) {
                return res.status(400).json({ 
                    error: 'Avaliação deve ser inteiro entre 1 e 5.' 
                });
            }
            avaliacaoFinal = av;
        }

        let tempoPreparoFinal = tempo_preparo;
        if (tempo_preparo !== undefined) {
            const tp = parseInt(tempo_preparo, 10);
            tempoPreparoFinal = isNaN(tp) ? null : tp;
        }

        const favoritaFinal = favorita !== undefined ? !!favorita : favorita;

        const receita = await ReceitaModel.updateReceita(
            req.params.id,
            titulo,
            descricao,
            ingredientes,
            modo_preparo,
            imagem,
            favoritaFinal,
            avaliacaoFinal,
            tempoPreparoFinal,
            dificuldade
        );

        if (!receita) {
            return res.status(404).json({ error: 'Receita não encontrada.' });
        }
        res.json(receita);
    } catch (error) {
        console.error('Erro ao atualizar receita:', error);
        res.status(500).json({ error: 'Erro ao atualizar receita.' });
    }
};

const createReceita = async (req, res) => {
    try {
        const {
            titulo,
            descricao,
            ingredientes,
            modo_preparo,
            imagem,
            favorita = false,
            avaliacao,
            tempo_preparo,
            dificuldade
        } = req.body;

        // Validação básica
        if (!titulo || !dificuldade) {
            return res.status(400).json({ 
                error: 'Título e dificuldade são obrigatórios.' 
            });
        }

        // Validação da dificuldade
        if (!validDificuldades.includes(dificuldade)) {
            return res.status(400).json({ 
                error: `Dificuldade inválida. Valores válidos: ${validDificuldades.join(', ')}` 
            });
        }

        // Validação da avaliação
        let avaliacaoFinal = null;
        if (avaliacao !== undefined) {
            const av = parseInt(avaliacao, 10);
            if (isNaN(av) || av < 1 || av < 5) {
                return res.status(400).json({ 
                    error: 'Avaliação deve ser inteiro entre 1 e 5.' 
                });
            }
            avaliacaoFinal = av;
        }

        const tempoPreparoFinal = tempo_preparo !== undefined ? parseInt(tempo_preparo, 10) : null;

        const novaReceita = {
            titulo,
            descricao,
            ingredientes,
            modo_preparo,
            imagem,
            favorita: !!favorita,
            avaliacao: avaliacaoFinal,
            tempo_preparo: tempoPreparoFinal,
            dificuldade
        };

        const receita = await ReceitaModel.createReceita(novaReceita);
        res.status(201).json(receita);
    } catch (error) {
        console.error('Erro ao criar receita:', error);
        res.status(500).json({ error: 'Erro ao criar receita.' });
    }
};

const toggleFavorita = async (req, res) => {
    try {
        const receita = await ReceitaModel.getReceitaById(req.params.id);
        
        if (!receita) {
            return res.status(404).json({ error: 'Receita não encontrada.' });
        }

        // Alterna o valor de favorita
        const novoValorFavorita = !receita.favorita;
        
        const receitaAtualizada = await ReceitaModel.updateReceita(
            req.params.id,
            receita.titulo,
            receita.descricao,
            receita.ingredientes,
            receita.modo_preparo,
            receita.imagem,
            novoValorFavorita,
            receita.avaliacao,
            receita.tempo_preparo,
            receita.dificuldade
        );

        res.json(receitaAtualizada);
    } catch (error) {
        console.error('Erro ao alternar favorita:', error);
        res.status(500).json({ error: 'Erro ao alternar favorita.' });
    }
};

module.exports = { 
    getAllReceitas, 
    getReceitasFavoritas, 
    getReceitaById, 
    deleteReceita, 
    updateReceita, 
    createReceita,
    toggleFavorita
};