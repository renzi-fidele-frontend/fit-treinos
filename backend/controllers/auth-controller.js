const { uploadImage } = require("../middlewares/cloudinary");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

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

         // TODO: Gerar o token de autenticação com JWT

         res.json({ usuario: usuarioAdicionado });
      }
   } catch (error) {
      res.status(500).json({ message: "Erro ao cadastrar o usuário, tente mais tarde" });
   }
   return;
};

exports.cadastrarUsuario = cadastrarUsuario;
