const multer = require('multer');
const uploadMiddleware = multer({ dest: 'public/img' });

module.exports = uploadMiddleware