const express = require('express');
const router = express.Router(); 


const productApiController = require('../../controllers/api/productApiController');

//Rutas
//Listado de todos los usuarios
router.get('/', productApiController.list);
//Detalle del usuario
router.get('/:id', productApiController.detail);


module.exports = router;
