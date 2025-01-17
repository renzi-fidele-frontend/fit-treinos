const express = require("express");
const { cadastrarUsuario, loginUsuario } = require("../controllers/auth-controller");
const multer = require("../middlewares/multer");

const authRoute = express.Router();

// Rotas públicas
authRoute.post("/cadastro", multer.single("foto"), cadastrarUsuario);
authRoute.post("/login", loginUsuario);

module.exports = authRoute;
