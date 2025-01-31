const express = require("express");
const { cadastrarUsuario, loginUsuario } = require("../controllers/auth-controller");
const multer = require("../middlewares/multer");
const passport = require("../middlewares/passport");

const authRoute = express.Router();

// Rotas públicas
authRoute.post("/cadastro", multer.single("foto"), cadastrarUsuario);
authRoute.post("/login", loginUsuario);

// TODO: Adicionar auth via google
// TODO: Adicionar auth via facebook
authRoute.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRoute.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
   const token = jwt.sign({ id: req.user.id, password: req.user.password }, process.env.JWT_SECRET);
   res.json({ user: req.user, token });
});

// Caso hava erro no login por google
authRoute.get("/login/failed", (req, res) => {
   res.status(401).json({ error: true, message: "Falha ao fazer login" });
});

module.exports = authRoute;
