const express = require("express");
const verificarToken = require("../middlewares/auth");
const {
   adicionarAosFavoritos,
   removerDosFavoritos,
   atualizarProgresso,
   retornarTempoTotalDeTreinoDeExercicio,
   retornarTempoTotalAbsoluto,
} = require("../controllers/actions.controller");

const actionsRoute = express.Router();

// Rotas privadas
actionsRoute.use(verificarToken);

actionsRoute.post("/adicionarAosFavoritos", adicionarAosFavoritos);

actionsRoute.delete("/removerDosFavoritos", removerDosFavoritos);

actionsRoute.patch("/atualizarProgresso", atualizarProgresso);

actionsRoute.get("/retornarTempoTotalDeTreinosDeExercicio", retornarTempoTotalDeTreinoDeExercicio);

actionsRoute.get("/retornarTempoTotalAbsoluto", retornarTempoTotalAbsoluto);

module.exports = actionsRoute;
