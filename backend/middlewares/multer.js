const multer = require("multer");
const uuid = require("uuid").v4;

const storage = multer.diskStorage({
   filename: (req, file, cb) => {
      cb(null, file.originalname + uuid());
   },
});

const upload = multer({ storage });

module.exports = upload;
