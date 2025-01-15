const mongoose = require("mongoose");

const schemaDoUsuario = new mongoose.Schema(
   {
      nome: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true, minLength: 6 },
      foto: { type: String, required: true },
      criadoEm: { type: Date, default: Date.now },
   },
   { collection: "usuarios" }
);

const Usuario = mongoose.model("Usuario", schemaDoUsuario);

module.exports = Usuario;
