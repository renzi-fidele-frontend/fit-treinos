const express = require("express");
const { cadastrarUsuario, loginUsuario } = require("../controllers/auth-controller");
const multer = require("../middlewares/multer");

const authRoute = express.Router();

// Rotas públicas

// TODO: Adicionar feat de cadastrar
authRoute.post("/cadastro", multer.single("foto"), cadastrarUsuario);

// TODO: Adicionar feat de login
authRoute.post("/login", loginUsuario);

module.exports = authRoute;
