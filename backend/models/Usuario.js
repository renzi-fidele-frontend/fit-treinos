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
      // TODO: Estender modelo para suportar rastreiamento do progresso do treino

      // {id: number, objetivo: string, titulo: string, exercicios: [{id: string}]}
      sessoesDeTreino: { type: Array },
      progresso: { type: Array },
      // {id: number}
      ultimosExerciciosPraticados: { type: Array },

      // {id}
      favoritos: { type: Array },
   },
   { collection: "Usuarios" }
);

const Usuario = mongoose.model("Usuario", schemaDoUsuario);

module.exports = Usuario;
