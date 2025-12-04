const ReceitaModel = require('../models/ReceitaModel');

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
    const { id } = req.params;
    const receita = await ReceitaModel.getReceitaById(id);
    
    if (!receita) {
      return res.status(404).json({ error: 'Receita não encontrada.' });
    }
    
    res.json(receita);
  } catch (error) {
    console.error('Erro ao buscar receita:', error);
    res.status(500).json({ error: 'Erro ao buscar receita.' });
  }
};

const createReceita = async (req, res) => {
  try {
    const { 
      titulo, 
      descricao, 
      ingredientes, 
      modo_preparo, 
      tempo_preparo, 
      categoria_id,
      dificuldade,
      avaliacao
    } = req.body;

    const novaReceita = {
      titulo,
      descricao,
      ingredientes,
      modo_preparo,
      tempo_preparo: tempo_preparo ? parseInt(tempo_preparo) : 30,
      categoria_id: categoria_id ? parseInt(categoria_id) : null,
      dificuldade,
      avaliacao: avaliacao ? parseInt(avaliacao) : null,
      imagem: req.file ? req.file.filename : null,
      favorita: false
    };

    const receita = await ReceitaModel.createReceita(novaReceita);
    
    res.status(201).json({
      message: 'Receita criada com sucesso!',
      receita: receita
    });

  } catch (error) {
    console.error('Erro ao criar receita:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};

const updateReceita = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, ingredientes, modo_preparo, favorita, avaliacao, tempo_preparo, dificuldade } = req.body;
    
    const imagem = req.file ? req.file.filename : null;
    
    const receita = await ReceitaModel.updateReceita(
      id, titulo, descricao, ingredientes, modo_preparo, imagem, favorita, avaliacao, tempo_preparo, dificuldade
    );
    
    if (!receita) {
      return res.status(404).json({ error: 'Receita não encontrada.' });
    }
    
    res.json({
      message: 'Receita atualizada com sucesso!',
      receita: receita
    });
  } catch (error) {
    console.error('Erro ao atualizar receita:', error);
    res.status(500).json({ error: 'Erro ao atualizar receita.' });
  }
};

const deleteReceita = async (req, res) => {
  try {
    const { id } = req.params;
    const deletado = await ReceitaModel.deleteReceita(id);
    
    if (!deletado) {
      return res.status(404).json({ error: 'Receita não encontrada.' });
    }
    
    res.json({ message: 'Receita excluída com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir receita:', error);
    res.status(500).json({ error: 'Erro ao excluir receita.' });
  }
};

module.exports = { 
  getAllReceitas, 
  getReceitasFavoritas, 
  getReceitaById, 
  createReceita, 
  updateReceita, 
  deleteReceita 
};