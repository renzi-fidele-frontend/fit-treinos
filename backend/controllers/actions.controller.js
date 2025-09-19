const Usuario = require("../models/Usuario");
const betterLog = require("../utils/betterLog");

const adicionarAosFavoritos = async (req, res) => {
   const { userId } = req;
   const { idExercicio } = req.body;
   try {
      const user = await Usuario.findById(userId);
      const favoritos = user.toObject().favoritos;

      // Caso já esteja favoritado
      if (favoritos.includes(idExercicio)) {
         return res.status(500).json({ message: "Este exercício já foi adicionado!" });
      }

      favoritos.push(idExercicio);
      const atualizar = await Usuario.findByIdAndUpdate(userId, { favoritos });
      res.json({ favoritos, message: "Adicionado aos favoritos com sucesso!" });
   } catch (error) {
      res.status(500).json({ message: "Erro ao adicionar aos favoritos!" });
   }
};

const removerDosFavoritos = async (req, res) => {
   const { userId } = req;
   const { idExercicio } = req.body;
   try {
      const user = await Usuario.findById(userId);
      const favoritos = user.toObject().favoritos;
      const favoritosAtualizados = favoritos.filter((v) => v !== idExercicio);
      const atualizar = await Usuario.findByIdAndUpdate(userId, { favoritos: favoritosAtualizados });
      res.json({ message: "Removido dos favoritos com sucesso!", favoritos: favoritosAtualizados });
   } catch (error) {
      res.status(500).json({ message: "Erro ao remover o exercício!" });
   }
};

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
         console.log("Já treinou hoje");
         // Caso o treino seja no mesmo dia
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
      const user = await Usuario.findById(userId);
      // Calculando o tempo total de treino do exercício
      let tempoTotalDeTreino = 0;
      user.progresso.forEach((v) => {
         v.treinos.forEach((v) => {
            if (v.idExercicio === idExercicio) tempoTotalDeTreino += Number(v.tempoDeTreino);
         });
      });
      res.json({ tempoTotalDeTreino });
   } catch (error) {
      res.status(500).json({ message: "Erro ao retornar o tempo de treino" });
   }
};

const retornarDadosTreinamento = async (req, res) => {
   const { userId } = req;

   try {
      const user = await Usuario.findById(userId);
      // Caso ainda não haja nenhum progresso do treinamento
      if (user.progresso.length === 0)
         return res.json({
            nrTreinosHoje: 0,
            diferencialPercentual: 0,
            mediaTempoPorDia: 0,
            diferencialPercentualTempo: 0,
            tempoTotalAbsoluto: 0,
            estatisticasDaSemana: [],
            partesDoCorpoTreinadas: [],
            exercicioMaisTreinado: false,
            ultimosExerciciosPraticados: [],
         });

      // Calculando o tempo total absoluto
      let tempoTotalAbsoluto = 0;
      user.progresso.forEach((v) => {
         v.treinos.forEach((v) => {
            tempoTotalAbsoluto += Number(v.tempoDeTreino);
         });
      });

      // Calculando o nr de treinos feitos hoje
      const date = new Date();
      let nrTreinosHoje = 0;
      user.progresso.forEach((v) => {
         if (v.dataDoTreino === date.toDateString()) nrTreinosHoje += v.treinos.length;
      });

      // Calculando diferencial percentual do nr de treino por dia
      let totalTreinos = 0;
      user.progresso.forEach((v) => {
         totalTreinos += v.treinos.length;
      });
      const nrDiasTreinados = user.progresso.length;
      const mediaTreinosPorDia = totalTreinos / nrDiasTreinados;
      const diferencialPercentual = ((nrTreinosHoje - mediaTreinosPorDia) / mediaTreinosPorDia) * 100;

      // Calculando a média do tempo(segundos) de treino por dia e o seu diferencial percentual
      let tempoTotalHoje = 0;
      user.progresso.forEach((v) => {
         if (v.dataDoTreino === date.toDateString()) {
            v.treinos.forEach((treino) => {
               tempoTotalHoje += Number(treino.tempoDeTreino);
            });
         }
      });
      let tempoTotal = 0;
      user.progresso.forEach((v) => {
         v.treinos.forEach((treino) => {
            tempoTotal += Number(treino.tempoDeTreino);
         });
      });
      const mediaTempoPorDia = tempoTotal / nrDiasTreinados;
      const diferencialPercentualTempo = ((tempoTotalHoje - mediaTempoPorDia) / mediaTempoPorDia) * 100;

      // Calculando a estatística da dedicação semanal
      const hoje = new Date();
      const ultimaSemana = [];
      for (let i = 6; i >= 0; i--) {
         const dia = new Date(hoje);
         dia.setDate(hoje.getDate() - i);
         ultimaSemana.push(dia);
      }
      function verificarDiaDaSemana(dia) {
         switch (dia) {
            case 0:
               return "Dom";
            case 1:
               return "Seg";
            case 2:
               return "Ter";
            case 3:
               return "Qua";
            case 4:
               return "Qui";
            case 5:
               return "Sex";
            case 6:
               return "Sab";
            default:
               return "";
         }
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

      // Calculando o dia da semana no qual se treinou por mais tempo
      const tempoPorDiaDaSemana = {};
      user.progresso.forEach((v) => {
         const diaSemana = verificarDiaDaSemana(new Date(v.dataDoTreino).getDay());
         if (!tempoPorDiaDaSemana[diaSemana]) {
            tempoPorDiaDaSemana[diaSemana] = 0;
         }
         v.treinos.forEach((treino) => {
            tempoPorDiaDaSemana[diaSemana] += Number(treino.tempoDeTreino);
         });
      });
      const diaMaisTreinado = Object.keys(tempoPorDiaDaSemana).reduce((a, b) => (tempoPorDiaDaSemana[a] > tempoPorDiaDaSemana[b] ? a : b));

      // Verificar o exercício mais treinado de todos (de acordo com o tempo Treinado)
      const exerciciosTreinados = {};
      user.progresso.forEach((v) => {
         v.treinos.forEach((treino) => {
            if (!exerciciosTreinados[treino.idExercicio]) {
               exerciciosTreinados[treino.idExercicio] = 0;
            }
            exerciciosTreinados[treino.idExercicio] += Number(treino.tempoDeTreino);
         });
      });
      const exercicioMaisTreinado = Object.keys(exerciciosTreinados).reduce((a, b) => (exerciciosTreinados[a] > exerciciosTreinados[b] ? a : b));

      // Calculando o tempo total de treino do exercício mais treinado
      let tempoTotalDeTreinoMaisPraticado = 0;
      user.progresso.forEach((v) => {
         v.treinos.forEach((treino) => {
            if (treino.idExercicio === exercicioMaisTreinado) tempoTotalDeTreinoMaisPraticado += treino.tempoDeTreino;
         });
      });

      const progresso = {
         nrTreinosHoje,
         diferencialPercentual,
         mediaTempoPorDia,
         diferencialPercentualTempo,
         tempoTotalAbsoluto,
         estatisticasDaSemana,
         partesDoCorpoTreinadas: user.partesDoCorpoTreinadas,
         exercicioMaisTreinado: {
            id: exercicioMaisTreinado,
            tempoTotalDeTreinoMaisPraticado,
         },
         ultimosExerciciosPraticados: user.ultimosExerciciosPraticados,
         diaMaisTreinado,
      };

      res.json(progresso);
   } catch (error) {
      res.status(500).json({ message: "Erro ao retornar os dados do progresso de treino" });
   }
};

const retornarUsuariosClassificados = async (req, res) => {
   try {
      let usuarios = await Usuario.find({}, "-password -email -favoritos");
      const usuariosClassificados = usuarios.map((usuario, k) => {
         let tempoTotalAbsoluto = 0;
         let nrTreinosRealizados = 0;

         usuario.progresso.forEach((v) => {
            // Calculando o tempo total absoluto
            v.treinos.forEach((v) => {
               tempoTotalAbsoluto += Number(v.tempoDeTreino);
            });
            // Calculando o número total de treinamentos
            nrTreinosRealizados += Number(v.treinos.length);
         });

         return { ...usuario.toObject(), tempoTotalAbsoluto, nrTreinosRealizados };
      });
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
