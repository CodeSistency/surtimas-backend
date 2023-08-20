const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/cartController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');




router.route('/')
    .put(cartController.updateCart)
    // .get(productController.getAllProducts)
    
    

router.route('/:username')
    .get(cartController.getAllCartProducts)

router.route('/:username/:id')
    .delete(cartController.deleteCartProduct)


module.exports = router;