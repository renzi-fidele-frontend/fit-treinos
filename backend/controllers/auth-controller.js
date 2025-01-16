const { uploadImage } = require("../middlewares/cloudinary");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cadastrarUsuario = async (req, res) => {
   const { email, password, nome } = req.body;
   const foto = req.file.path;
   try {
      const existeUsuario = await Usuario.findOne({ email });
      if (existeUsuario) {
         res.status(401).json({ message: "Este email já foi utilizada para criar uma conta!" });
      } else {
         let senhaSecreta;
         try {
            senhaSecreta = await bcrypt.hash(password, 10);
         } catch (error) {
            console.log("Erro ao tornar o password em secreto");
         }
         let fotoUpada;
         try {
            fotoUpada = await uploadImage(foto);
         } catch (error) {
            console.log("Erro ao fazer upload da foto");
         }

         // Adicionando o user ao DB
         const usuarioAdicionado = new Usuario({ foto: fotoUpada.url, nome, email, password: senhaSecreta });
         usuarioAdicionado.save();

         const token = jwt.sign({ userId: usuarioAdicionado._id, password }, process.env.JWT_SECRET);

         res.json({ usuario: { ...usuarioAdicionado.toObject(), password }, token });
      }
   } catch (error) {
      res.status(500).json({ message: "Erro ao cadastrar o usuário, tente mais tarde" });
   }
   return;
};

const loginUsuario = async (req, res) => {
   const { email, password } = req.body;
   try {
      const existeUsuario = await Usuario.findOne({ email });
      if (existeUsuario) {
         const senhaCorreta = await bcrypt.compare(password, existeUsuario.password);
         if (senhaCorreta) {
            const token = jwt.sign({ userId: existeUsuario._id, password }, process.env.JWT_SECRET);
            res.json({ usuario: { ...existeUsuario.toObject(), password }, token });
         } else {
            res.status(401).json({ message: "Senha incorreta!" });
         }
      } else {
         res.status(401).json({ message: "Este email não foi cadastrado!" });
      }
   } catch (error) {
      res.status(500).json({ message: "Erro ao fazer login, tente mais tarde" });
   }
};

exports.cadastrarUsuario = cadastrarUsuario;
exports.loginUsuario = loginUsuario;
