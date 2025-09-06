const { uploadImage, removerFoto } = require("../middlewares/cloudinary");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cadastrarUsuario = async (req, res) => {
   const { email, password, nome } = req?.body;
   const foto = req?.file?.path;
   console.log(foto, email, password, nome);
   try {
      const existeUsuario = await Usuario.findOne({ email });
      if (existeUsuario) {
         res.status(401).json({ message: "O email já foi utilizado para criar uma conta!" });
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
         const usuarioAdicionado = new Usuario({
            foto: fotoUpada.url,
            nome,
            email,
            password: senhaSecreta,
         });
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

const editarPerfil = async (req, res) => {
   const uid = req.userId;
   const { nome, password } = req.body;
   // No caso de se adicionar uma nova foto de perfil
   const fotoRemovida = req?.body?.fotoRemovida;
   const foto = req?.file?.path;

   // Criando a nova sennha encriptada e novo token
   let novaSenhaEncriptada;
   let token;
   try {
      novaSenhaEncriptada = await bcrypt.hash(password, 10);
      token = jwt.sign({ userId: uid, password }, process.env.JWT_SECRET);
   } catch (error) {
      console.log("Erro ao encriptar nova senha");
   }

   let dadosAtualizados = {
      nome,
      password: novaSenhaEncriptada,
   };
   // Carregando a nova foto de perfil no cloudinary
   if (foto) {
      const carregarFoto = await uploadImage(foto);
      dadosAtualizados.foto = carregarFoto.url;
   }

   try {
      const perfilAtualizado = await Usuario.findByIdAndUpdate(uid, dadosAtualizados, { new: true });
      if (foto) {
         const removerFotoDePerfilAntiga = await removerFoto(fotoRemovida.split("/").slice(-1)[0].split(".")[0]);
      }
      res.json({ message: "Perfil atualizado com sucesso!", usuario: { ...perfilAtualizado.toObject(), password }, token });
   } catch (error) {
      res.status(500).json({ mensagem: "Erro ao atualizar o perfil" });
   }
};

const deletarPerfil = async (req, res) => {
   const uid = req.userId;
   const { accessToken } = req;
   try {
      const contaRemovida = await Usuario.findByIdAndDelete(uid);
      const removerFotoDePerfilAntiga = await removerFoto(contaRemovida.foto.split("/").slice(-1)[0].split(".")[0]);
      if (contaRemovida.facebookId) {
         const removerPermissoesDoFacebook = await fetch(`https://graph.facebook.com/v23.0/${uid}/permissions?access_token=${accessToken}`, {
            method: "DELETE",
         });
      }
      res.json({ message: "Conta removida com sucesso" });
   } catch (error) {
      res.status(500).json({ message: "Erro ao remover a conta!" });
   }
};

exports.cadastrarUsuario = cadastrarUsuario;
exports.loginUsuario = loginUsuario;
exports.editarPerfil = editarPerfil;
exports.deletarPerfil = deletarPerfil;
