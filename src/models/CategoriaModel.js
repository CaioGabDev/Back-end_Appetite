const pool = require("../config/database");

const getPersonagens = async () => {
    const result = await pool.query("SELECT * FROM personagens");
    return result.rows;
};

const getPersonagemById = async (id) => {
    const result = await pool.query("SELECT * FROM personagens WHERE id = $1", [id]);
    return result.rows[0];
};

const createPersonagem = async (nome, descricao, imagem_url, filmes, curiosidades) => {
    const result = await pool.query(
        `INSERT INTO personagens (nome, descricao, imagem_url, filmes, curiosidades) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [nome, descricao, imagem_url, filmes, curiosidades]
    );
    return result.rows[0];
};

const updatePersonagem = async (id, nome, descricao, imagem_url, filmes, curiosidades) => {
    const result = await pool.query(
        `UPDATE personagens 
         SET nome = $1, descricao = $2, imagem_url = $3, filmes = $4, curiosidades = $5 
         WHERE id = $6 RETURNING *`,
        [nome, descricao, imagem_url, filmes, curiosidades, id]
    );
    return result.rows[0];
};

const deletePersonagem = async (id) => {
    const result = await pool.query("DELETE FROM personagens WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
        return { error: "Personagem não encontrado." };
    }
    return { message: "Personagem deletado com sucesso." };
};

module.exports = { getPersonagens, getPersonagemById, createPersonagem, updatePersonagem, deletePersonagem };
