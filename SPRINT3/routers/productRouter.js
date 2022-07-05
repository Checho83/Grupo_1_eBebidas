const express = require('express');
const router = express.Router(); 
const path = require('path');

const productController = require('../controllers/productController')

router.get('/productDetail', productController.view);
//router.get('/productEdit', productController.edit);
router.get('/productCart', productController.carrito);

module.exports = router;
