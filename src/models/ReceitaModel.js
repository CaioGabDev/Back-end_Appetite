const pool = require("../config/database");

const getReceitas = async () => {
    const result = await pool.query(`
        SELECT * FROM receitas ORDER BY data_criacao DESC
    `);
    return result.rows;
};

const getReceitasFavoritas = async () => {
    const result = await pool.query(`
        SELECT * FROM receitas WHERE favorita = true ORDER BY data_criacao DESC
    `);
    return result.rows;
};

const getReceitaById = async (id) => {
    const result = await pool.query(`
        SELECT * FROM receitas WHERE id = $1
    `, [id]);
    return result.rows[0];
};

const createReceita = async (receita) => {
    const result = await pool.query(`
        INSERT INTO receitas (
            titulo, 
            descricao, 
            ingredientes, 
            modo_preparo, 
            imagem, 
            favorita, 
            avaliacao, 
            tempo_preparo, 
            dificuldade
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
    `, [
        receita.titulo, 
        receita.descricao, 
        receita.ingredientes, 
        receita.modo_preparo, 
        receita.imagem, 
        receita.favorita, 
        receita.avaliacao, 
        receita.tempo_preparo, 
        receita.dificuldade
    ]);
    
    return result.rows[0];
};

const updateReceita = async (id, titulo, descricao, ingredientes, modo_preparo, imagem, favorita, avaliacao, tempo_preparo, dificuldade) => {
    const result = await pool.query(
        `UPDATE receitas 
         SET titulo = $1, descricao = $2, ingredientes = $3, modo_preparo = $4, imagem = $5, favorita = $6, avaliacao = $7, tempo_preparo = $8, dificuldade = $9
         WHERE id = $10 RETURNING *`,
        [titulo, descricao, ingredientes, modo_preparo, imagem, favorita, avaliacao, tempo_preparo, dificuldade, id]
    );
    return result.rows[0];
};

const deleteReceita = async (id) => {
    const result = await pool.query(`
        DELETE FROM receitas WHERE id = $1 RETURNING *
    `, [id]);
    
    return result.rowCount > 0;
};

module.exports = { 
    getReceitas, 
    getReceitasFavoritas,
    getReceitaById, 
    createReceita, 
    updateReceita, 
    deleteReceita 
};
