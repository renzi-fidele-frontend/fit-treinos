const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
   // Lidando com o erro de CORS
   if (req.method === "OPTIONS") return next();

   const token = req.header("Authorization")?.split(" ")[1];

   if (!token) {
      res.status(401).json({ mensagem: "Acesso negado! Faça a autenticação como deve ser." });
   } else {
      try {
         const decodificado = jwt.verify(token, process.env.JWT_SECRET);
         console.log(decodificado.userId)
         req.userId = decodificado.userId;
         req.password = decodificado?.password;
         next();
      } catch (error) {
         res.status(500).json({ message: "Erro de autenticação, tente novamente." });
      }
   }
};

module.exports = verificarToken;