
const path = require('path');

/* function validacion(){

}
 */

const mainController = {
    index: (req,res)=>{
       res.render('index',);
   },
    about:(req,res)=>{
        res.render('index');
    },
    carrito:(req,res)=>{
        res.render('productCart');
    },
    nombreusuario:(req,res)=>{
      if ((req.query.nombreusuario == 'ADMIN')&&(req.query.pass == 'ADMIN'))
        res.render('productos/productEdit');
      else
       res.render('index');
    }
} 

module.exports = mainController;