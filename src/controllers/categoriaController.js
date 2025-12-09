const CategoriaModel = require('../models/CategoriaModel');

// GET - Todas as categorias
const getCategorias = async (req, res) => {
  try {
    console.log('🔍 Buscando todas as categorias');
    const categorias = await CategoriaModel.getCategorias();
    console.log(`✅ ${categorias.length} categorias encontradas`);
    res.json(categorias);
  } catch (error) {
    console.error('❌ Erro ao buscar categorias:', error.message);
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
};

// GET - Categoria por ID
const getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🔍 Buscando categoria ID:', id);
    const categoria = await CategoriaModel.getCategoriaById(id);
    
    if (!categoria) {
      console.log('❌ Categoria não encontrada');
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    
    console.log('✅ Categoria encontrada:', categoria.nome);
    res.json(categoria);
  } catch (error) {
    console.error('❌ Erro ao buscar categoria:', error.message);
    res.status(500).json({ error: 'Erro ao buscar categoria' });
  }
};

// POST - Criar categoria
const createCategoria = async (req, res) => {
  try {
    const { nome } = req.body;
    
    console.log('\n✏️ CRIANDO NOVA CATEGORIA:', nome);
    
    if (!nome) {
      return res.status(400).json({ error: 'Nome da categoria é obrigatório' });
    }

    const resultado = await CategoriaModel.createCategoria(nome);
    
    console.log('✅ Categoria criada com sucesso! ID:', resultado.id);
    res.status(201).json({ 
      message: 'Categoria criada com sucesso',
      categoria: resultado
    });
  } catch (error) {
    console.error('❌ ERRO ao criar categoria:', error.message);
    res.status(500).json({ 
      error: 'Erro ao criar categoria',
      details: error.message 
    });
  }
};

// PUT - Atualizar categoria
const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;
    
    console.log('🔄 Atualizando categoria ID:', id);
    
    if (!nome) {
      return res.status(400).json({ error: 'Nome da categoria é obrigatório' });
    }

    const resultado = await CategoriaModel.updateCategoria(id, nome);
    
    if (!resultado) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    
    console.log('✅ Categoria atualizada:', resultado.nome);
    res.json({
      message: 'Categoria atualizada com sucesso',
      categoria: resultado
    });
  } catch (error) {
    console.error('❌ Erro ao atualizar categoria:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar categoria' });
  }
};

// DELETE - Deletar categoria
const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🗑️ Deletando categoria ID:', id);
    
    const resultado = await CategoriaModel.deleteCategoria(id);
    
    if (!resultado) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    
    console.log('✅ Categoria deletada com sucesso');
    res.json({ message: 'Categoria deletada com sucesso' });
  } catch (error) {
    console.error('❌ Erro ao deletar categoria:', error.message);
    res.status(500).json({ error: 'Erro ao deletar categoria' });
  }
};

// ✅ Exportar TODAS as funções
module.exports = {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria
};
