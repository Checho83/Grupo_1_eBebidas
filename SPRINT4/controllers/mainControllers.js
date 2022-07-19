const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


/* function validacion(){

}
 */

const mainController = {
    index: (req,res)=>{
       res.render('index',{productos: products});
   },
    about:(req,res)=>{
        res.render('index');
    },
    carrito:(req,res)=>{
        res.render('productCart');
    },
    nombreusuario:(req,res)=>{
      if ((req.query.nombreusuario == 'ADMIN')&&(req.query.pass == 'ADMIN'))
        res.render('productos/productCreateEdit');
      else
       res.render('index');
    }
} 

module.exports = mainController;