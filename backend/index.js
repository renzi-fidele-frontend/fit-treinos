const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { default: mongoose } = require("mongoose");

const app = express();

app.use(express.json());

// Permitindo operações no servidor
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   res.header("Access-Control-Allow-Methods", "*");
   next();
});

// Permitindo qualquer domínio de accesar o servidor
app.use(cors());

app.get("/", (req, res) => {
   res.send("Servidor está rodando");
});

// Caso se navegue para uma rota inexistente
app.use((req, res) => {
   res.status(404).json({ mensagem: "Essa rota não foi configurada" });
});

mongoose
   .connect(process.env.MONGO_URI)
   .then(() => {
      app.listen(process.env.PORT, () => console.log("Conectado ao MongoDB"));
   })
   .catch((err) => console.error("Erro ao conectar"));
