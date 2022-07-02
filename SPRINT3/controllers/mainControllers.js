
const path = require('path');




const mainController = {
    index: (req,res)=>{
       res.render('index',);
   },
    about:(req,res)=>{
        res.render('index');
    },
    carrito:(req,res)=>{
        res.render('productCart');
    }/* ,
    nombreusuario=ADMIN&pass=ADMIN:(req,res)=>{
        res.render('productEdit');
    }, */
} 
module.exports = mainController;