require("dotenv").config();
const express = require("express");
const cors = require("cors");
const receitaRoutes = require("./src/routes/receitaRoutes");
const categoriaRoutes = require("./src/routes/categoriaRoutes");

const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", receitaRoutes);
app.use("/api", categoriaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});