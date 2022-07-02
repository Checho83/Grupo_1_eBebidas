
const path = require('path');

const productController = {
    view: (req,res)=>{
       res.render('productos/productDetail');
    },
    edit:(req,res)=>{
        res.render('productos/productEdit');
     }
      
    
    

} 
module.exports = productController;
