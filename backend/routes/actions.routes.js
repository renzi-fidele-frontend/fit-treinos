const express = require("express");
const verificarToken = require("../middlewares/auth");
const {
   adicionarAosFavoritos,
   removerDosFavoritos,
   atualizarProgresso,
   retornarTempoTotalDeTreinoDeExercicio,
   retornarDadosTreinamento,
   retornarUsuariosClassificados,
   guardarGinasioNosFavoritos,
} = require("../controllers/actions.controller");

const actionsRoute = express.Router();

// Rotas públicas
actionsRoute.get("/retornarUsuariosClassificados", retornarUsuariosClassificados);
actionsRoute.get("/retornarDadosTreinamento/:uid", retornarDadosTreinamento);

// Rotas privadas
actionsRoute.use(verificarToken);
actionsRoute.post("/adicionarAosFavoritos", adicionarAosFavoritos);
actionsRoute.delete("/removerDosFavoritos", removerDosFavoritos);
actionsRoute.patch("/atualizarProgresso", atualizarProgresso);
actionsRoute.get("/retornarTempoTotalDeTreinoDeExercicio/:idExercicio", retornarTempoTotalDeTreinoDeExercicio);
actionsRoute.get("/retornarDadosTreinamento", retornarDadosTreinamento);
actionsRoute.post("/guardarGinasioNosFavoritos", guardarGinasioNosFavoritos )

module.exports = actionsRoute;
