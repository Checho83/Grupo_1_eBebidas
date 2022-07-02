const express = require('express');
const router = express.Router(); 
const path = require('path');

const mainController = require('../controllers/mainControllers')

router.get('/', mainController.index);
router.get('/productCart', mainController.carrito);
module.exports = router;
