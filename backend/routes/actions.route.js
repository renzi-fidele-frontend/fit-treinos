const express = require("express");
const verificarToken = require("../middlewares/auth");
const { adicionarAosFavoritos } = require("../controllers/actions.controller");

const actionsRoute = express.Router();

// Rotas privadas
actionsRoute.use(verificarToken);

actionsRoute.post("/adicionarAosFavoritos", adicionarAosFavoritos);

module.exports = actionsRoute;
