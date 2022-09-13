const express = require('express');
const router = express.Router(); 
const path = require('path');


const mainController = require('../controllers/mainControllers')

router.get('/', mainController.index);
//router.get('/home', mainController.nombreusuario);
router.get('/productCart', mainController.carrito);
router.get('/createEdit', mainController.createEdit);
module.exports = router;
