const express = require("express");
const { cadastrarUsuario, loginUsuario, editarPerfil } = require("../controllers/auth.controller");
const multer = require("../middlewares/multer");
const passport = require("../middlewares/passport");
const Usuario = require("../models/Usuario");
const verificarToken = require("../middlewares/auth");

const authRoute = express.Router();

// Rotas públicas ---------------------
authRoute.post("/cadastro", multer.single("foto"), cadastrarUsuario);
authRoute.post("/login", loginUsuario);

authRoute.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRoute.get("/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
   res.redirect(`${process.env.CLIENT_URL}/?token=${req.user.token}`);
});

// Caso hava erro no login por google
authRoute.get("/login/failed", (req, res) => {
   res.status(401).json({ error: true, message: "Falha ao fazer login" });
});

authRoute.get("/facebook", passport.authenticate("facebook"));
authRoute.get("/facebook/callback", passport.authenticate("facebook", { session: false }), function (req, res) {
   res.redirect(`${process.env.CLIENT_URL}/?token=${req.user.token}`);
});

// Rotas privadas ------------------------
authRoute.use(verificarToken);

// Caso haja sucesso ao se logar via rede social retornar as credenciais
authRoute.get("/success/social", async (req, res) => {
   console.log(req?.userId);
   try {
      const user = await Usuario.findById(req?.userId);
      if (user) {
         res.json({ user });
      }
   } catch (error) {
      res.status(500).json({ message: "Erro ao encontrar o usuário logado na rede social!" });
   }
});

authRoute.patch("/editarPerfil", multer.single("foto"), editarPerfil);

module.exports = authRoute;
