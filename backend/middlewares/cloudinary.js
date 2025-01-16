const cloudinary = require("cloudinary").v2;

cloudinary.config({
   secure: true,
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.CLOUDINARY_KEY,
   api_secret: process.env.CLOUDINARY_SECRET,
});

async function uploadImage(file) {
   try {
      const data = await cloudinary.uploader.upload(file, {
         resource_type: "image",
         use_filename: true,
      });
      return data;
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao fazer upload da imagem" });
   }
}

async function removerFoto(idFoto) {
   try {
      const res = await cloudinary.uploader.destroy(idFoto);
      return res;
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao remover a foto" });
   }
}

exports.uploadImage = uploadImage;
exports.removerFoto = removerFoto;
exports.cloudinary = cloudinary;