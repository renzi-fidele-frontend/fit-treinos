const Usuario = require("../models/Usuario");
const betterLog = require("../utils/betterLog");
const verificarDiaDaSemana = require("../utils/verificarDiaDaSemana");
const mongoose = require("mongoose");

const adicionarAosFavoritos = async (req, res) => {
   const { userId } = req;
   const { idExercicio } = req.body;
   try {
      const adicionar = await Usuario.updateOne({ _id: userId }, { $addToSet: { favoritos: idExercicio } });
      res.json({ message: "Adicionado aos favoritos com sucesso!" });
   } catch (error) {
      res.status(500).json({ message: "Erro ao adicionar aos favoritos!" });
   }
};

const removerDosFavoritos = async (req, res) => {
   const { userId } = req;
   const { idExercicio } = req.body;
   try {
      const remover = await Usuario.updateOne({ _id: userId }, { $pull: { favoritos: idExercicio } });
      res.json({ message: "Removido dos favoritos com sucesso!" });
   } catch (error) {
      res.status(500).json({ message: "Erro ao remover o exercício!" });
   }
};

const guardarGinasioNosFavoritos = async (req, res) => {
   const { userId } = req;
   // Apanhar a id do ginásio no body do request
   const { place_id, name, vicinity, international_phone_number, rating, user_ratings_total, photo, lat, lng } = req.body;
   try {
      const guardar = await Usuario.updateOne(
         { _id: userId },
         {
            $addToSet: {
               ginasiosFavoritos: { place_id, name, vicinity, international_phone_number, rating, user_ratings_total, photo, lat, lng },
            },
         },
      );
      res.json({ message: "Adicionado aos favoritos com sucesso!" });
   } catch (error) {
      res.status(500).json({ message: "Erro ao adicionar o ginásio aos favorito!" });
   }
};

const removerGinasioDosFavoritos = async (req, res) => {
   const { userId } = req;
   const { place_id } = req.body;
   try {
      const remover = await Usuario.updateOne({ _id: userId }, { $pull: { ginasiosFavoritos: { place_id } } });
      res.json({ message: "Removido dos favoritos com sucesso!" });
   } catch (error) {
      betterLog(error.message);
      res.status(500).json({ message: "Erro ao remover o ginásio dos favoritos!" });
   }
};

// TODO: Refatorar essa função utilizando métodos atomicos do mongoose para melhoria da performance
const atualizarProgresso = async (req, res) => {
   const { userId } = req;
   const { idExercicio, dataDoTreino, tempoDeTreino, parteDoCorpo } = req.body;
   try {
      const user = await Usuario.findById(userId);
      let progresso = user.progresso;
      let treinos;

      // Caso o treino seja em um dia diferente
      const treinoNodiaDiferente = progresso.some((obj) => obj.dataDoTreino === dataDoTreino);
      if (!treinoNodiaDiferente) {
         console.log("Treinou pela primeira vez hoje");
         progresso.push({ dataDoTreino, treinos: [{ tempoDeTreino, idExercicio }] });
      } else {
         // Caso o treino seja no mesmo dia
         console.log("Já treinou hoje");
         progresso = progresso.map((v) => {
            if (v.dataDoTreino === dataDoTreino) {
               // Caso seja a primeira vez a se praticar o exercício
               const primeiroTreino = v.treinos.some((obj) => obj.idExercicio === idExercicio);
               if (!primeiroTreino) {
                  console.log("Exercício treinando pela primeira vez no dia");
                  treinos = [...v.treinos, { idExercicio, tempoDeTreino }];
                  betterLog(treinos);
               } else {
                  console.log("Atualizando o tempo de treino do exercício já praticado...");
                  // Caso o exercício já tenha sido treinado no tal dia
                  treinos = v.treinos.map((v) => {
                     if (v.idExercicio === idExercicio) {
                        // Atualizando o tempo de treino
                        return { ...v, tempoDeTreino: tempoDeTreino + v.tempoDeTreino };
                     } else {
                        // Retornando os restantes
                        return v;
                     }
                  });
               }

               return { ...v, treinos };
            } else {
               return v;
            }
         });
      }

      // Calculando o tempo total de treino do exercício
      let tempoTotalDeTreino = 0;
      progresso.forEach((v) => {
         v.treinos.forEach((v) => {
            if (v.idExercicio === idExercicio) tempoTotalDeTreino += Number(v.tempoDeTreino);
         });
      });

      // Calculando a parte do corpo mais treinada
      // Caso seja a primeira vez
      let partesDoCorpoTreinadas = user.partesDoCorpoTreinadas;
      if (partesDoCorpoTreinadas.length === 0) {
         partesDoCorpoTreinadas = [
            { nome: "back", tempoDeTreino: 0 },
            { nome: "cardio", tempoDeTreino: 0 },
            { nome: "chest", tempoDeTreino: 0 },
            { nome: "lower arms", tempoDeTreino: 0 },
            { nome: "lower legs", tempoDeTreino: 0 },
            { nome: "neck", tempoDeTreino: 0 },
            { nome: "shoulders", tempoDeTreino: 0 },
            { nome: "upper arms", tempoDeTreino: 0 },
            { nome: "upper legs", tempoDeTreino: 0 },
            { nome: "waist", tempoDeTreino: 0 },
         ];
      }
      partesDoCorpoTreinadas = partesDoCorpoTreinadas.map((v) => {
         if (v.nome === parteDoCorpo) {
            return { ...v, tempoDeTreino: v.tempoDeTreino + tempoDeTreino };
         } else {
            return v;
         }
      });

      // Atualizando os últimos exercícios praticados
      const data = new Date();
      let ultimosExerciciosPraticados = user.ultimosExerciciosPraticados;
      if (ultimosExerciciosPraticados.slice(-1)[0]?.idExercicio !== idExercicio) {
         ultimosExerciciosPraticados = [...ultimosExerciciosPraticados, { idExercicio, data }];
      } else {
         ultimosExerciciosPraticados.pop();
         ultimosExerciciosPraticados = [...ultimosExerciciosPraticados, { idExercicio, data }];
      }

      const atualizar = await Usuario.updateOne(
         { _id: userId },
         {
            ...user.toObject(),
            progresso,
            partesDoCorpoTreinadas,
            ultimosExerciciosPraticados,
         },
      );

      res.json({ progresso, message: "Progresso atualizado com sucesso", tempoTotalDeTreino });
   } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar o progresso de treino" });
   }
};

const retornarTempoTotalDeTreinoDeExercicio = async (req, res) => {
   const { userId } = req;
   const { idExercicio } = req.params;
   try {
      // Retornando o tempo total de treino do exercício
      const tempoTotal = await Usuario.aggregate([
         { $match: { _id: new mongoose.Types.ObjectId(userId) } },
         { $unwind: "$progresso" },
         { $unwind: "$progresso.treinos" },
         { $group: { _id: "$progresso.treinos.idExercicio", total: { $sum: "$progresso.treinos.tempoDeTreino" } } },
         { $match: { _id: idExercicio } },
      ]);
      res.json({ tempoTotalDeTreino: tempoTotal[0]?.total });
   } catch (error) {
      res.status(500).json({ message: "Erro ao retornar o tempo de treino" });
   }
};

// Retorna os dados de treino do usuário autenticado ou de um usuário especifico
const retornarDadosTreinamento = async (req, res) => {
   let userId;
   if (req?.userId) {
      userId = req.userId;
   } else {
      userId = req.params.uid;
   }

   try {
      const user = await Usuario.findById(userId);
      const _hoje = new Date();
      const umAnoAtras = new Date(_hoje.getFullYear() - 1, _hoje.getMonth(), _hoje.getDate());
      console.log(_hoje, umAnoAtras);
      // Caso ainda não haja nenhum progresso do treinamento
      if (user.progresso.length === 0) {
         return res.json({
            nrTreinosHoje: 0,
            diferencialPercentual: 0,
            mediaTempoPorDia: 0,
            diferencialPercentualTempo: 0,
            tempoTotalAbsoluto: 0,
            estatisticasDaSemana: [],
            partesDoCorpoTreinadas: [],
            exercicioMaisTreinado: null,
            ultimosExerciciosPraticados: [],
         });
      }

      // Analisando o progresso do treinamento
      const apanharDados = await Usuario.aggregate([
         { $match: { _id: new mongoose.Types.ObjectId(userId) } },
         { $unwind: "$progresso" },
         { $unwind: "$progresso.treinos" },
         {
            $facet: {
               // Calculando o tempo total e número de treinos realizados desde o cadastro
               tempoTotalAbsoluto: [
                  {
                     $group: {
                        _id: null,
                        tempoDeTreino: { $sum: "$progresso.treinos.tempoDeTreino" },
                        nrTreinosRealizados: { $sum: 1 },
                     },
                  },
               ],
               // Calculando o tempo total e número de treinos realizados hoje
               nrTreinosHoje: [
                  {
                     $group: {
                        _id: "$progresso.dataDoTreino",
                        nrTreinos: { $sum: 1 },
                        tempoDeTreino: { $sum: "$progresso.treinos.tempoDeTreino" },
                     },
                  },
                  { $match: { _id: new Date().toDateString() } },
               ],
               // Calculando o dia da semana mais treinado de todos
               diaDaSemanaMaisTreinado: [
                  {
                     $addFields: {
                        diaDaSemana: {
                           $dayOfWeek: {
                              $toDate: "$progresso.dataDoTreino",
                           },
                        },
                     },
                  },
                  {
                     $group: {
                        _id: "$diaDaSemana",
                        tempoDeTreino: { $sum: "$progresso.treinos.tempoDeTreino" },
                     },
                  },
                  { $sort: { tempoDeTreino: -1 } },
                  { $limit: 1 },
               ],
               // Calculando o exercício mais treinado de todos
               exercicioMaisTreinado: [
                  {
                     $group: {
                        _id: "$progresso.treinos.idExercicio",
                        tempoDeTreino: { $sum: "$progresso.treinos.tempoDeTreino" },
                     },
                  },
                  { $sort: { tempoDeTreino: -1 } },
                  { $limit: 1 },
               ],
               // Calculando as médias do número de treinos e do tempo de treino por dia
               medias: [
                  {
                     $group: {
                        _id: "$progresso.dataDoTreino",
                        tempoDeTreino: { $sum: "$progresso.treinos.tempoDeTreino" },
                        nrTreinos: { $sum: 1 },
                     },
                  },
                  {
                     $group: {
                        _id: null,
                        mediaTempoPorDia: { $avg: "$tempoDeTreino" },
                        mediaTreinosPorDia: { $avg: "$nrTreinos" },
                     },
                  },
               ],
               // Calculando as estatísticas da dedicação no treino
               estatisticasGerais: [
                  {
                     $group: {
                        _id: { $dateTrunc: { date: { $toDate: "$progresso.dataDoTreino" }, unit: "day", timezone: "Africa/Maputo" } },
                        tempoTreinado: {
                           $sum: "$progresso.treinos.tempoDeTreino",
                        },
                     },
                  },
                  {
                     $densify: {
                        field: "_id",
                        range: {
                           step: 1,
                           unit: "day",
                           bounds: [umAnoAtras, _hoje],
                        },
                     },
                  },
                  {
                     $fill: {
                        output: {
                           tempoTreinado: {
                              value: 0,
                           },
                        },
                     },
                  },
                  {
                     $project: {
                        dia: { $dateToString: { format: "%Y-%m-%d", date: "$_id" } },
                        tempoTreinado: 1,
                     },
                  },
                  { $sort: { _id: -1 } },
               ],
            },
         },
      ]);

      // Armazenando os resultados
      const tempoTotalTreinado = apanharDados[0].tempoTotalAbsoluto[0]?.tempoDeTreino || 0;
      const nrTreinosRealizados = apanharDados[0].tempoTotalAbsoluto[0]?.nrTreinosRealizados || 0;
      const nrTreinosHoje = apanharDados[0].nrTreinosHoje[0]?.nrTreinos || 0;
      const tempoTotalHoje = apanharDados[0].nrTreinosHoje[0]?.tempoDeTreino || 0;
      const diaDaSemanaMaisTreinado = verificarDiaDaSemana(apanharDados[0].diaDaSemanaMaisTreinado[0]?._id);
      const exercicioMaisTreinado = apanharDados[0].exercicioMaisTreinado[0] || null;
      const mediaTempoPorDia = apanharDados[0].medias[0]?.mediaTempoPorDia || 0;
      const mediaTreinosPorDia = apanharDados[0].medias[0]?.mediaTreinosPorDia || 0;
      const estatisticasGerais = apanharDados[0].estatisticasGerais;
      const _ultimaSemana = estatisticasGerais.slice(0, 7).map((v) => ({ ...v, dia: verificarDiaDaSemana(new Date(v.dia).getDay()) }));
      const _ultimoMes = estatisticasGerais.slice(0, 30);
      const _ultimoAno = estatisticasGerais;

      // Calculando o diferencial percentual do nr de treinos e do tempo de treino
      const diferencialPercentualDeTreinos = mediaTreinosPorDia === 0 ? 0 : ((nrTreinosHoje - mediaTreinosPorDia) / mediaTreinosPorDia) * 100;
      const diferencialPercentualDoTempo = mediaTreinosPorDia === 0 ? 0 : ((tempoTotalHoje - mediaTempoPorDia) / mediaTempoPorDia) * 100;

      // Retornando todos os dados do progresso do treinamento
      const progresso = {
         nrTreinosHoje,
         diferencialPercentualDeTreinos,
         mediaTempoPorDia,
         diferencialPercentualDoTempo,
         tempoTotalTreinado,
         nrTreinosRealizados,
         exercicioMaisTreinado,
         diaDaSemanaMaisTreinado,
         partesDoCorpoTreinadas: user.partesDoCorpoTreinadas,
         _ultimaSemana,
         _ultimoMes,
         _ultimoAno,
         // TODO: Calcular os últimos exercícios praticados via aggregate e remover daqui
         ultimosExerciciosPraticados: user.ultimosExerciciosPraticados,
      };

      res.json(progresso);
   } catch (error) {
      betterLog(error);
      res.status(500).json({ message: "Erro ao retornar os dados do progresso de treino" });
   }
};

const retornarUsuariosClassificados = async (req, res) => {
   try {
      const usuariosClassificados = await Usuario.aggregate([
         { $unwind: "$progresso" },
         { $unwind: "$progresso.treinos" },
         {
            $group: {
               _id: "$_id",
               nrTreinosRealizados: { $sum: 1 },
               tempoTotalAbsoluto: { $sum: "$progresso.treinos.tempoDeTreino" },
               // Preservando o restante dos dados
               nome: { $first: "$nome" },
               foto: { $first: "$foto" },
               ultimosExerciciosPraticados: { $first: "$ultimosExerciciosPraticados" },
               criadoEm: { $first: "$criadoEm" },
               pais: { $first: "$pais" },
               location: { $first: "$location" },
            },
         },
      ]);
      res.json({ usuariosClassificados });
   } catch {
      res.status(401).json({ mensagem: "Erro ao apanhar os usuários classificados" });
   }
};

exports.adicionarAosFavoritos = adicionarAosFavoritos;
exports.removerDosFavoritos = removerDosFavoritos;
exports.atualizarProgresso = atualizarProgresso;
exports.retornarTempoTotalDeTreinoDeExercicio = retornarTempoTotalDeTreinoDeExercicio;
exports.retornarDadosTreinamento = retornarDadosTreinamento;
exports.retornarUsuariosClassificados = retornarUsuariosClassificados;
exports.guardarGinasioNosFavoritos = guardarGinasioNosFavoritos;
exports.removerGinasioDosFavoritos = removerGinasioDosFavoritos;
