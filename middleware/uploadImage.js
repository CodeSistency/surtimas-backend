const path = require("path")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/img'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
      
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });

  module.exports = upload