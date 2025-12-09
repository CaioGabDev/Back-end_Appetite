const pool = require("../config/database");

// GET - Todas as categorias
const getCategorias = async () => {
  try {
    const result = await pool.query(
      'SELECT * FROM categorias ORDER BY nome ASC'
    );
    return result.rows;
  } catch (error) {
    console.error('❌ Erro ao buscar categorias:', error.message);
    throw error;
  }
};

// GET - Categoria por ID
const getCategoriaById = async (id) => {
  try {
    const result = await pool.query(
      'SELECT * FROM categorias WHERE id = $1',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('❌ Erro ao buscar categoria:', error.message);
    throw error;
  }
};

// POST - Criar categoria
const createCategoria = async (nome) => {
  try {
    const result = await pool.query(
      'INSERT INTO categorias (nome) VALUES ($1) RETURNING *',
      [nome]
    );
    return result.rows[0];
  } catch (error) {
    console.error('❌ Erro ao criar categoria:', error.message);
    throw error;
  }
};

// PUT - Atualizar categoria
const updateCategoria = async (id, nome) => {
  try {
    const result = await pool.query(
      'UPDATE categorias SET nome = $1 WHERE id = $2 RETURNING *',
      [nome, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('❌ Erro ao atualizar categoria:', error.message);
    throw error;
  }
};

// DELETE - Deletar categoria
const deleteCategoria = async (id) => {
  try {
    const result = await pool.query(
      'DELETE FROM categorias WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('❌ Erro ao deletar categoria:', error.message);
    throw error;
  }
};

// ✅ APENAS EXPORTE O QUE EXISTE NESTE ARQUIVO
module.exports = {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria
};
