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
      const progresso = user.progresso;
      const treinos = progresso.treinos;

      // Caso nada tenha sido criado
      if (progresso.length === 0) {
         progresso.push({ dataDoTreino: dataDoTreino, treinos: [{ tempoDeTreino, idExercicio }] });
      } else if (1) {
         // Caso o treino seja no mesmo dia
      } else if (2) {
         // Caso o treino seja em um dia diferente
      }

      const atualizar = await Usuario.findByIdAndUpdate(userId, {
         ...user.toObject(),
         progresso,
      });

      console.log(progresso[0].dataDoTreino, progresso[0].treinos);

      // Adicionar ao progresso do usuário o seguinte: {dataDoTreino: Date, treinos: [{tempoDeTreino: 0, idExercicio: 123}]}
      // const atualizar = await Usuario.findByIdAndUpdate(user, {})
   } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar o progresso de treino" });
   }
};

exports.adicionarAosFavoritos = adicionarAosFavoritos;
exports.removerDosFavoritos = removerDosFavoritos;
exports.atualizarProgresso = atualizarProgresso;
