const express = require("express");
const verificarToken = require("../middlewares/auth");
const { adicionarAosFavoritos, removerDosFavoritos, atualizarProgresso } = require("../controllers/actions.controller");

const actionsRoute = express.Router();

// Rotas privadas
actionsRoute.use(verificarToken);

actionsRoute.post("/adicionarAosFavoritos", adicionarAosFavoritos);

actionsRoute.delete("/removerDosFavoritos", removerDosFavoritos);

actionsRoute.patch("/atualizarProgresso", atualizarProgresso);

module.exports = actionsRoute;
