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

module.exports = { 
    getCategorias, 
    getCategoriaById, 
    createCategoria, 
    updateCategoria, 
    deleteCategoria 
};
