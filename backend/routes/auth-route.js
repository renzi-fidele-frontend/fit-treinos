const express = require("express");
const { cadastrarUsuario } = require("../controllers/auth-controller");
const multer = require("../middlewares/multer");

const authRoute = express.Router();

// Rotas públicas

// TODO: Adicionar feat de cadastrar
authRoute.post("/cadastro", multer.single("foto"), cadastrarUsuario);

// TODO: Adicionar feat de login
authRoute.post("/login", (req, res, next) => {
   console.log("Fazendo login...");
});

module.exports = authRoute;
