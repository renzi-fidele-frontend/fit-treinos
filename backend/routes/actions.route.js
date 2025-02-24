const express = require("express");
const verificarToken = require("../middlewares/auth");
const { adicionarAosFavoritos, removerDosFavoritos } = require("../controllers/actions.controller");

const actionsRoute = express.Router();

// Rotas privadas
actionsRoute.use(verificarToken);

actionsRoute.post("/adicionarAosFavoritos", adicionarAosFavoritos);

actionsRoute.delete("/removerDosFavoritos", removerDosFavoritos)

module.exports = actionsRoute;
