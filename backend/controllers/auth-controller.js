const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
   const { email, password, nome } = req.body;
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
         const usuarioAdicionado = new Usuario({ foto: "asdad", nome, email, password: senhaSecreta });
         usuarioAdicionado.save();

         // TODO: Fazer upload da foto de perfil no cloudinary
         // Adicionando o user ao DB
         // TODO: Gerar o token de autenticação com JWT

         res.json({ usuario: usuarioAdicionado });
      }
   } catch (error) {}
   return;
};

exports.cadastrarUsuario = cadastrarUsuario;
