const express = require('express');
const router = express.Router(); 
const multer = require('multer'); 
const path = require('path');

const productController = require('../controllers/productController')

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
router.post('/productCreate',upload.single('image'), productController.store); 
router.post('/:id', upload.single('image'),productController.update); 
router.get('/productList', productController.list); 
router.get('/:id', productController.detail);
router.delete('/:id', productController.destroy); 

module.exports = router;
