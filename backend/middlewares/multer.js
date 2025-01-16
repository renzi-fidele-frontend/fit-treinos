const multer = require("multer");

const storage = multer.diskStorage({
   filename: (req, file, cb) => {
      cb(null);
   },
});

const upload = multer({ storage });

module.exports = upload;
