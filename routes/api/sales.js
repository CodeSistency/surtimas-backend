const express = require('express');
const router = express.Router();
const salesController = require('../../controllers/salesController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const upload = require("../../middleware/upload")

router.route('/').post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), salesController.newSale).get(salesController.getAllSales)
    // .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), productController.updateProduct)
    // .delete(verifyRoles(ROLES_LIST.Admin), productController.deleteProduct);
    

router.route('/:id').delete(salesController.deleteSale)
//     .get(productController.getProduct)
//     .delete(verifyRoles(ROLES_LIST.Admin),  productController.deleteProduct)
//     .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), productController.updateProduct)
//     // .put(verifyRoles(ROLES_LIST.Admin), productController.updateProduct);

module.exports = router;