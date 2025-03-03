const Usuario = require("../models/Usuario");

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
   const { idExercicio, dataDoTreino, tempoDeTreino } = req.body;
   try {
      const user = await Usuario.findById(userId);
      let progresso = user.progresso;
      let treinos = progresso.treinos;

      // {dataDoTreino: Date, treinos: [{tempoDeTreino: 0, idExercicio: 123}]}

      // Caso nada tenha sido criado

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
                  treinos.push({ idExercicio, tempoDeTreino });
               } else {
                  console.log("Atualizando o tempo de treino do exercício já praticado...");
                  // Caso o exercício já tenha sido treinado no tal dia
                  treinos = v.treinos.map((v) => {
                     if (v.idExercicio === idExercicio) {
                        // Atualizando o tempo de treino
                        return { ...v, tempoDeTreino };
                        console.log("Tempo de treino atualizado");
                     } else {
                        // Retornando os restantes
                        return v;
                     }
                  });
               }
               return { ...v, treinos };
            } else {
               v;
            }
         });
      }

      const atualizar = await Usuario.findByIdAndUpdate(userId, {
         ...user.toObject(),
         progresso,
      });

      console.log(progresso);
   } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar o progresso de treino" });
   }
};

exports.adicionarAosFavoritos = adicionarAosFavoritos;
exports.removerDosFavoritos = removerDosFavoritos;
exports.atualizarProgresso = atualizarProgresso;
