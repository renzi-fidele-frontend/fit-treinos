const express = require("express");
const verificarToken = require("../middlewares/auth");
const {
   adicionarAosFavoritos,
   removerDosFavoritos,
   atualizarProgresso,
   retornarTempoTotalDeTreinoDeExercicio,
   retornarNrDeTreinosHoje,
   retornarDadosTreinamento,
} = require("../controllers/actions.controller");

const actionsRoute = express.Router();

// Rotas privadas
actionsRoute.use(verificarToken);

actionsRoute.post("/adicionarAosFavoritos", adicionarAosFavoritos);

actionsRoute.delete("/removerDosFavoritos", removerDosFavoritos);

actionsRoute.patch("/atualizarProgresso", atualizarProgresso);

actionsRoute.get("/retornarTempoTotalDeTreinoDeExercicio/:idExercicio", retornarTempoTotalDeTreinoDeExercicio);

actionsRoute.get("/retornarDadosTreinamento", retornarDadosTreinamento);

actionsRoute.get("/retornarNrDeTreinosHoje", retornarNrDeTreinosHoje);

module.exports = actionsRoute;
