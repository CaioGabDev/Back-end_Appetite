const pool = require("../config/database");

const getCategorias = async () => {
    const result = await pool.query(`
        SELECT * FROM categorias ORDER BY nome ASC
    `);
    return result.rows;
};

const getCategoriaById = async (id) => {
    const result = await pool.query(`
        SELECT * FROM categorias WHERE id = $1
    `, [id]);
    return result.rows[0];
};

const createCategoria = async (nome) => {
    const result = await pool.query(`
        INSERT INTO categorias (nome) 
        VALUES ($1) RETURNING *
    `, [nome]);
    
    return result.rows[0];
};

const updateCategoria = async (id, nome) => {
    const result = await pool.query(`
        UPDATE categorias 
        SET nome = $1 
        WHERE id = $2 
        RETURNING *
    `, [nome, id]);
    
    return result.rows[0] || null;
};

const deleteCategoria = async (id) => {
    const result = await pool.query(`
        DELETE FROM categorias WHERE id = $1 RETURNING *
    `, [id]);
    
    return result.rowCount > 0;
};

const getReceitasByCategoria = async (nomeCategoria) => {
    const result = await pool.query(`
        SELECT r.*, c.nome as categoria_nome 
        FROM receitas r 
        LEFT JOIN categorias c ON r.categoria_id = c.id 
        WHERE c.nome = $1 
        ORDER BY r.data_criacao DESC
    `, [nomeCategoria]);
    return result.rows;
};

const getReceitas = async () => {
    const result = await pool.query(`
        SELECT r.*, c.nome as categoria_nome 
        FROM receitas r 
        LEFT JOIN categorias c ON r.categoria_id = c.id 
        ORDER BY r.data_criacao DESC
    `);
    return result.rows;
};

module.exports = { 
    getCategorias, 
    getCategoriaById, 
    createCategoria, 
    updateCategoria, 
    deleteCategoria, 
    getReceitas, 
    getReceitasByCategoria, 
    getReceitasFavoritas,
    getReceitaById, 
    createReceita, 
    updateReceita, 
    deleteReceita 
};
