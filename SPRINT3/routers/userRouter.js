const express = require('express');
const router = express.Router(); 
const path = require('path');

const userController = require('../controllers/userController')

router.get('/login', userController.login);
router.get('/register', userController.register);
router.get('/contacto', userController.error);
router.get('/Quienes_somos', userController.error);


module.exports = router;
