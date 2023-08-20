const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../../controllers/productsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
      cd(null, 'public/img/')
    },
    filename: (req, file, cd) => {
      cd(null, Date.now() + '-' + file.originalname)
    },
  })
  
const upload = multer({ storage: storage })


router.route('/').get(productController.getAllProducts)

router.get('/limited', productController.getLimitedProducts);
   
router.get('/:gender', productController.getProductsByGender);
router.get('/tipo/:type', productController.getProductsByType);
    

router.route('/:id')
    .get(productController.getProduct)
    
    
    

    

module.exports = router;