const express = require('express');
const router = express.Router(); 


const userApiController = require('../../controllers/api/userApiController');

//Rutas
//Listado de todos los usuarios
router.get('/', userApiController.list);
//Detalle del usuario
router.get('/:id', userApiController.detail);


module.exports = router;
