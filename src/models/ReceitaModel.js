const pool = require("../config/database");

const getFavoritos = async () => {
    const result = await pool.query(`
        SELECT * FROM favoritos
    `);
    return result.rows;
};

const getFavoritoById = async (id) => {
    const result = await pool.query(`
        SELECT * FROM favoritos WHERE id = $1
    `, [id]);
    return result.rows[0];
};

const createFavorito = async (personagem_id) => {
    const result = await pool.query(`
        INSERT INTO favoritos (personagem_id) VALUES ($1) RETURNING *
    `, [personagem_id]);
    return result.rows[0];
};

const updateFavorito = async (id, personagem_id) => {
    const result = await pool.query(`
        UPDATE favoritos SET personagem_id = $1 WHERE id = $2 RETURNING *
    `, [personagem_id, id]);
    if (result.rowCount === 0) {
        return { error: "Favorito não encontrado." };
    }
    return result.rows[0];
};

const deleteFavorito = async (id) => {
    const result = await pool.query(`
        DELETE FROM favoritos WHERE id = $1 RETURNING *
    `, [id]);
    if (result.rowCount === 0) {
        return { error: "Favorito não encontrado." };
    }
    return { message: "Favorito deletado com sucesso." };
};

module.exports = { getFavoritos, getFavoritoById, createFavorito, updateFavorito, deleteFavorito };
