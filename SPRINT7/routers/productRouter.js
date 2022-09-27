const express = require('express');
const {body, check} = require('express-validator');
const router = express.Router(); 
const multer = require('multer'); 
const path = require('path');

const productController = require('../controllers/productController')


const validateProduct = [
  check('name')
    .notEmpty().withMessage('Debes escribir un nombre'),  //puede haber productos de menos de 5 caracteres
  check('description')
    .notEmpty().withMessage('Debes escribir una descripcion')
    .isLength({ min:22}).withMessage('La descripción debe tener mas de 20 caracteres'),       
]


var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,path.join(__dirname, '../public/images'))
    },
    filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})




const upload = multer({ storage: storage });


router.get('/productDetail', productController.view);
router.get('/productEdit', productController.edit);
router.get('/productCreate', productController.create);
router.get('/productCart', productController.carrito);
router.post('/productCreate',upload.single('image'), validateProduct, productController.store); 
router.get('/productList', productController.list); 
router.post('/:id', upload.single('image'),productController.update);
router.get('/:id', productController.detail);           ///detalle de un producto, desde ProdcutEdit
router.delete('/:id', productController.destroy); 

module.exports = router;
