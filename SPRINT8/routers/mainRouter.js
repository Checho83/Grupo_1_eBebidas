const express = require('express');
const router = express.Router(); 
const path = require('path');


const mainController = require('../controllers/mainControllers')

const adminMiddleware = require('../middlewares/adminMiddleware')

router.get('/', mainController.index);
//router.get('/home', mainController.nombreusuario);
// router.get('/productCart', mainController.carrito);
router.get('/createEdit',adminMiddleware, mainController.createEdit);
module.exports = router;
