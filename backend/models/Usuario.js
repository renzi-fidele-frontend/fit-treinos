const mongoose = require("mongoose");

const schemaDoUsuario = new mongoose.Schema(
   {
      nome: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, minLength: 6 }, // Somente para usuários normais
      googleId: { type: String },
      facebookId: { type: String },
      foto: { type: String, required: true },
      criadoEm: { type: Date, default: Date.now },
      progresso: { type: Array },
      favoritos: { type: Array },
      partesDoCorpoTreinadas: { type: Array },
      ultimosExerciciosPraticados: { type: Array },
      sessoesDeTreino: { type: Array },
   },
   { collection: "Usuarios" }
);

const Usuario = mongoose.model("Usuario", schemaDoUsuario);

module.exports = Usuario;
