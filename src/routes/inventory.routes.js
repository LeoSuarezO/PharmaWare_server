const express = require("express");
const router = express.Router();
const controller = require('../controllers/inventory.controller')

router.post('/create_product', controller.createProduct);
router.get('/products',  controller.getProductList);
router.post('/getProduct_name', controller.getProductName);
router.post('/getProduct_bar', controller.getProductBar);
router.post('/delete_product', controller.deleteProduct);
router.post('/update_product', controller.updateProduct);

module.exports = router