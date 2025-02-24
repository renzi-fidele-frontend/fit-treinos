const Usuario = require("../models/Usuario");

// TODO: Fazer patch ao perfil do usuário para adicionar aos favoritos
const adicionarAosFavoritos = async (req, res) => {
   const { userId } = req;
   const { idExercicio } = req.body;
   console.log(idExercicio);
   try {
      const user = await Usuario.findById(userId);
      const favoritos = user.toObject().favoritos;
      favoritos.push(idExercicio);
      const atualizar = await Usuario.updateOne({ id: userId }, { favoritos });
      res.json({ favoritos, message: "Adicionado aos favoritos com sucesso!" });
   } catch (error) {
      res.status(500).json({ message: "Erro ao adicionar aos favoritos" });
   }
};

exports.adicionarAosFavoritos = adicionarAosFavoritos;
