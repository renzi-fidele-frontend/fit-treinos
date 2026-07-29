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

      const atualizar = await Usuario.findByIdAndUpdate(userId, {
         ...user.toObject(),
         progresso,
         partesDoCorpoTreinadas,
         ultimosExerciciosPraticados,
      });

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

      const apanharDados = await Usuario.aggregate([
         { $match: { _id: new mongoose.Types.ObjectId(userId) } },
         { $unwind: "$progresso" },
         { $unwind: "$progresso.treinos" },
         {
            $facet: {
               tempoTotalAbsoluto: [
                  {
                     $group: {
                        _id: null,
                        tempoDeTreino: { $sum: "$progresso.treinos.tempoDeTreino" },
                        nrTreinosRealizados: { $sum: 1 },
                     },
                  },
               ],
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
            },
         },
      ]);

      // Armazenando os resultados
      const tempoTotalTreinado = apanharDados[0].tempoTotalAbsoluto[0]?.tempoDeTreino || 0;
      const nrTreinosRealizados = apanharDados[0].tempoTotalAbsoluto[0]?.nrTreinosRealizados || 0;
      const nrTreinosHoje = apanharDados[0].nrTreinosHoje[0]?.nrTreinos || 0;
      const tempoTotalHoje = apanharDados[0].nrTreinosHoje[0]?.tempoDeTreino || 0;
      const diaDaSemanaMaisTreinado = apanharDados[0].diaDaSemanaMaisTreinado[0]?._id;
      const exercicioMaisTreinado = apanharDados[0].exercicioMaisTreinado[0] || null;
      const mediaTempoPorDia = apanharDados[0].medias[0]?.mediaTempoPorDia || 0;
      const mediaTreinosPorDia = apanharDados[0].medias[0]?.mediaTreinosPorDia || 0;
      const diferencialPercentualDeTreinos = ((nrTreinosHoje - mediaTreinosPorDia) / mediaTreinosPorDia) * 100;
      const diferencialPercentualDoTempo = ((tempoTotalHoje - mediaTempoPorDia) / mediaTempoPorDia) * 100;

      // Calculando as estatísticas da dedicação do treinamento
      const hoje = new Date();
      // Semana passada
      const ultimaSemana = [];
      for (let i = 6; i >= 0; i--) {
         const dia = new Date(hoje);
         dia.setDate(hoje.getDate() - i);
         ultimaSemana.push(dia);
      }
      const estatisticasDaSemana = ultimaSemana.map((dia) => {
         let tempoTreinadoNoDia = 0;
         user.progresso.forEach((v) => {
            if (v.dataDoTreino === dia.toDateString()) {
               v.treinos.forEach((treino) => {
                  tempoTreinadoNoDia += Number(treino.tempoDeTreino);
               });
            }
         });
         return { tempoTreinadoNoDia, dia: verificarDiaDaSemana(dia.getDay()) };
      });

      // Mês passado ------------------------------
      const ultimaMes = [];
      for (let i = 30; i >= 0; i--) {
         const dia = new Date(hoje);
         dia.setDate(hoje.getDate() - i);
         ultimaMes.push(dia);
      }
      const estatisticasDoMes = ultimaMes.map((dia) => {
         let tempoTreinadoNoDia = 0;
         user.progresso.forEach((v) => {
            if (v.dataDoTreino === dia.toDateString()) {
               v.treinos.forEach((treino) => {
                  tempoTreinadoNoDia += Number(treino.tempoDeTreino);
               });
            }
         });
         return { tempoTreinadoNoDia, dia: dia.toDateString() };
      });

      // Ano passado
      const ultimoAno = [];
      for (let i = 365; i >= 0; i--) {
         const dia = new Date(hoje);
         dia.setDate(hoje.getDate() - i);
         ultimoAno.push(dia);
      }
      const estatisticasDoAno = ultimoAno.map((dia) => {
         let tempoTreinadoNoDia = 0;
         user.progresso.forEach((v) => {
            if (v.dataDoTreino === dia.toDateString()) {
               v.treinos.forEach((treino) => {
                  tempoTreinadoNoDia += Number(treino.tempoDeTreino);
               });
            }
         });
         return { tempoTreinadoNoDia, dia: dia.toDateString() };
      });
      // ------------------------------------------

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

         // TODO: Mais tarde investigar a possiibilidade de usar o aggregate para calcular essas estatísticas
         estatisticasDaSemana,
         estatisticasDoMes,
         estatisticasDoAno,

         // TODO: Calcular as partes do corpo treinadas via aggregate e remover daqui
         partesDoCorpoTreinadas: user.partesDoCorpoTreinadas,
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
