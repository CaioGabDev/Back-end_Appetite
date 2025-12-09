const ReceitaModel = require('../models/ReceitaModel');
const pool = require('../config/database');

// POST - Criar receita
const createReceita = async (req, res) => {
  try {
    console.log('\n✏️ CRIANDO NOVA RECEITA');
    console.log('Body:', req.body);
    console.log('File:', req.file ? req.file.filename : 'Sem imagem');
    
    const { titulo, descricao, ingredientes, modo_preparo, tempo_preparo, categoria_id, dificuldade, avaliacao } = req.body;
    
    // Validação: Campos obrigatórios
    if (!titulo || !descricao || !ingredientes || !modo_preparo) {
      console.log('❌ Campos obrigatórios faltando');
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    // Validação: Categoria é obrigatória
    if (!categoria_id) {
      console.log('❌ Categoria não informada');
      return res.status(400).json({ error: 'Categoria é obrigatória' });
    }

    // Validar se categoria existe
    console.log('🔍 Validando categoria_id:', categoria_id);
    const categoriaResult = await pool.query(
      'SELECT id, nome FROM categorias WHERE id = $1',
      [parseInt(categoria_id)]
    );

    if (categoriaResult.rows.length === 0) {
      console.log('❌ Categoria inválida:', categoria_id);
      return res.status(400).json({ 
        error: 'Categoria inválida',
        mensagem: `A categoria com ID ${categoria_id} não existe`
      });
    }

    console.log('✅ Categoria validada:', categoriaResult.rows[0].nome);
    
    const imagemPath = req.file ? req.file.filename : null;
    console.log('📸 Imagem:', imagemPath);
    console.log('📊 Avaliação recebida:', avaliacao, 'Tipo:', typeof avaliacao);
    
    const novaReceita = {
      titulo,
      descricao,
      ingredientes,
      modo_preparo,
      tempo_preparo: tempo_preparo ? parseInt(tempo_preparo) : null,
      categoria_id: parseInt(categoria_id),
      imagem: imagemPath,
      dificuldade: dificuldade || 'FACIL',
      avaliacao: avaliacao !== undefined && avaliacao !== null ? parseInt(avaliacao) : null
    };
    
    console.log('📝 Dados para inserir:', novaReceita);
    const resultado = await ReceitaModel.createReceita(novaReceita);
    
    console.log('✅ Receita criada com sucesso! ID:', resultado.id);
    res.status(201).json({ 
      message: 'Receita criada com sucesso',
      receita: resultado
    });
  } catch (error) {
    console.error('❌ ERRO ao criar receita:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ 
      error: 'Erro ao criar receita',
      details: error.message 
    });
  }
};

// GET - Todas as receitas
const getAllReceitas = async (req, res) => {
  try {
    console.log('🔍 Buscando todas as receitas');
    const receitas = await ReceitaModel.getReceitas();
    console.log(`✅ ${receitas.length} receitas encontradas`);
    res.json(receitas);
  } catch (error) {
    console.error('❌ Erro ao buscar receitas:', error.message);
    res.status(500).json({ error: 'Erro ao buscar receitas' });
  }
};

// GET - Receita por ID
const getReceitaById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🔍 Buscando receita ID:', id);
    const receita = await ReceitaModel.getReceitaById(id);
    
    if (!receita) {
      console.log('❌ Receita não encontrada');
      return res.status(404).json({ error: 'Receita não encontrada' });
    }
    
    console.log('✅ Receita encontrada:', receita.titulo);
    res.json(receita);
  } catch (error) {
    console.error('❌ Erro ao buscar receita:', error.message);
    res.status(500).json({ error: 'Erro ao buscar receita' });
  }
};

// PUT - Atualizar receita
const updateReceita = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, ingredientes, modo_preparo, tempo_preparo, categoria_id, dificuldade, avaliacao } = req.body;
    
    console.log('🔄 Atualizando receita ID:', id);
    
    const dadosAtualizados = {
      titulo,
      descricao,
      ingredientes,
      modo_preparo,
      tempo_preparo,
      categoria_id,
      dificuldade,
      avaliacao: avaliacao ? parseInt(avaliacao) : null
    };
    
    if (req.file) {
      dadosAtualizados.imagem = req.file.filename;
      console.log('📸 Imagem atualizada:', req.file.filename);
    }
    
    const resultado = await ReceitaModel.updateReceita(id, dadosAtualizados);
    
    console.log('✅ Receita atualizada:', resultado.titulo);
    res.json({
      message: 'Receita atualizada com sucesso',
      receita: resultado
    });
  } catch (error) {
    console.error('❌ Erro ao atualizar receita:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar receita' });
  }
};

// DELETE - Deletar receita
const deleteReceita = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🗑️ Deletando receita ID:', id);
    
    const resultado = await ReceitaModel.deleteReceita(id);
    
    if (!resultado) {
      console.log('❌ Receita não encontrada');
      return res.status(404).json({ error: 'Receita não encontrada' });
    }
    
    console.log('✅ Receita deletada com sucesso');
    res.json({
      message: 'Receita deletada com sucesso',
      id: resultado.id
    });
  } catch (error) {
    console.error('❌ Erro ao deletar receita:', error.message);
    res.status(500).json({ error: 'Erro ao deletar receita' });
  }
};

// GET - Receitas Favoritas
const getReceitasFavoritas = async (req, res) => {
  try {
    console.log('⭐ Buscando receitas favoritas');
    const favoritas = await ReceitaModel.getReceitasFavoritas();
    console.log(`✅ ${favoritas.length} receitas favoritas encontradas`);
    res.json(favoritas);
  } catch (error) {
    console.error('❌ Erro ao buscar favoritas:', error.message);
    res.status(500).json({ error: 'Erro ao buscar receitas favoritas' });
  }
};

// PUT - Toggle Favorita
const toggleFavorita = async (req, res) => {
  try {
    const { id } = req.params;
    const { favorita } = req.body;

    console.log(`\n❤️ PUT /api/receitas/${id}/favorita`);
    console.log(`Body:`, req.body);

    if (typeof favorita !== 'boolean') {
      return res.status(400).json({ error: 'favorita deve ser boolean' });
    }

    const resultado = await ReceitaModel.toggleFavorita(id, favorita);

    console.log(`✅ Receita ${id} atualizada para favorita: ${favorita}`);

    res.json({
      message: favorita ? '❤️ Receita favoritada!' : '💔 Receita removida dos favoritos',
      receita: resultado
    });
  } catch (error) {
    console.error('❌ Erro ao atualizar favorita:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// PUT - Atualizar Avaliação
const updateAvaliacao = async (req, res) => {
  try {
    const { id } = req.params;
    const { avaliacao } = req.body;

    console.log(`\n⭐ PUT /api/receitas/${id}/avaliacao`);
    console.log(`Body:`, req.body);

    if (!avaliacao || avaliacao < 1 || avaliacao > 5) {
      return res.status(400).json({ error: 'Avaliação deve ser entre 1 e 5' });
    }

    const resultado = await ReceitaModel.updateAvaliacao(id, avaliacao);

    console.log(`✅ Receita ${id} avaliada com ${avaliacao} estrelas`);

    res.json({
      message: `⭐ Receita avaliada com ${avaliacao} estrelas!`,
      receita: resultado
    });
  } catch (error) {
    console.error('❌ Erro ao atualizar avaliação:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllReceitas,
  getReceitaById,
  createReceita,
  updateReceita,
  deleteReceita,
  getReceitasFavoritas,
  toggleFavorita,
  updateAvaliacao
};