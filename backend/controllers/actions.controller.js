const Usuario = require("../models/Usuario");

const adicionarAosFavoritos = async (req, res) => {
   const { userId } = req;
   const { idExercicio } = req.body;

   try {
      const user = await Usuario.findById(userId);
      const favoritos = user.toObject().favoritos;
      console.log(favoritos);
      if (favoritos.includes(idExercicio)) {
         return res.status(500).json({ message: "Este exercício já foi adicionado!" });
      }
      favoritos.push(idExercicio);
      console.log(favoritos);
      const atualizar = await Usuario.findByIdAndUpdate(userId, { favoritos });
      res.json({ favoritos, message: "Adicionado aos favoritos com sucesso!" });
   } catch (error) {
      res.status(500).json({ message: "Erro ao adicionar aos favoritos" });
   }
};

exports.adicionarAosFavoritos = adicionarAosFavoritos;
