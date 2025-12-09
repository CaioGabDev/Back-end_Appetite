const pool = require("../config/database");

const createReceita = async (receita) => {
  try {
    const { titulo, descricao, ingredientes, modo_preparo, tempo_preparo, categoria_id, imagem, dificuldade, avaliacao } = receita;
    
    console.log('\n🔧 ReceitaModel.createReceita');
    console.log('Imagem:', imagem);
    console.log('Avaliação:', avaliacao);
    
    const query = `
      INSERT INTO receitas 
      (titulo, descricao, ingredientes, modo_preparo, tempo_preparo, categoria_id, imagem, dificuldade, avaliacao, data_criacao)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
      RETURNING *;
    `;
    
    const values = [
      titulo,
      descricao,
      ingredientes,
      modo_preparo,
      tempo_preparo || null,
      categoria_id,
      imagem || null,
      dificuldade || 'FACIL',
      avaliacao ? parseInt(avaliacao) : null
    ];
    
    console.log('Values:', values);
    
    const result = await pool.query(query, values);
    console.log('✅ Inserida receita ID:', result.rows[0].id);
    return result.rows[0];
  } catch (error) {
    console.error('❌ Erro ReceitaModel:', error.message);
    throw error;
  }
};

const getReceitas = async () => {
  try {
    const result = await pool.query(
      `SELECT r.*, c.nome as categoria_nome 
       FROM receitas r 
       LEFT JOIN categorias c ON r.categoria_id = c.id
       ORDER BY r.data_criacao DESC`
    );
    return result.rows;
  } catch (error) {
    console.error('❌ Erro ao buscar receitas:', error.message);
    throw error;
  }
};

const getReceitaById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT r.*, c.nome as categoria_nome 
       FROM receitas r 
       LEFT JOIN categorias c ON r.categoria_id = c.id
       WHERE r.id = $1`,
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('❌ Erro ao buscar receita:', error.message);
    throw error;
  }
};

const updateReceita = async (id, dados) => {
  try {
    const { titulo, descricao, ingredientes, modo_preparo, tempo_preparo, categoria_id, imagem, dificuldade, avaliacao } = dados;
    
    const query = `
      UPDATE receitas 
      SET titulo = $1, descricao = $2, ingredientes = $3, modo_preparo = $4, 
          tempo_preparo = $5, categoria_id = $6, dificuldade = $8, avaliacao = $9,
          imagem = COALESCE($7, imagem)
      WHERE id = $10
      RETURNING *;
    `;
    
    const values = [
      titulo, 
      descricao, 
      ingredientes, 
      modo_preparo, 
      tempo_preparo, 
      categoria_id, 
      imagem, 
      dificuldade, 
      avaliacao || null,
      id
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('❌ Erro updateReceita:', error.message);
    throw error;
  }
};

const deleteReceita = async (id) => {
  try {
    const query = 'DELETE FROM receitas WHERE id = $1 RETURNING id;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error('❌ Erro deleteReceita:', error.message);
    throw error;
  }
};

const getReceitasFavoritas = async () => {
  try {
    const result = await pool.query(
      `SELECT r.*, c.nome as categoria_nome 
       FROM receitas r 
       LEFT JOIN categorias c ON r.categoria_id = c.id
       WHERE r.favorita = true
       ORDER BY r.data_criacao DESC`
    );
    return result.rows;
  } catch (error) {
    console.error('❌ Erro ao buscar favoritas:', error.message);
    throw error;
  }
};

const toggleFavorita = async (id, favorita) => {
  try {
    const result = await pool.query(
      'UPDATE receitas SET favorita = $1 WHERE id = $2 RETURNING *',
      [favorita, id]
    );

    if (result.rows.length === 0) {
      throw new Error('Receita não encontrada');
    }

    return result.rows[0];
  } catch (error) {
    console.error('❌ Erro no model:', error.message);
    throw error;
  }
};

const updateAvaliacao = async (id, avaliacao) => {
  try {
    const result = await pool.query(
      'UPDATE receitas SET avaliacao = $1 WHERE id = $2 RETURNING *',
      [avaliacao, id]
    );

    if (result.rows.length === 0) {
      throw new Error('Receita não encontrada');
    }

    return result.rows[0];
  } catch (error) {
    console.error('❌ Erro no model:', error.message);
    throw error;
  }
};

module.exports = {
  getReceitas,
  getReceitaById,
  createReceita,
  updateReceita,
  deleteReceita,
  getReceitasFavoritas,
  toggleFavorita,
  updateAvaliacao
};
