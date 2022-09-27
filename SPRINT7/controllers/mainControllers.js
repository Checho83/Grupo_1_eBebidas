const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



const mainController = {
    index: (req,res)=>{
       // console.log(req.session.userLogged);
       //console.log('entrando...')
        return res.render('index',{productos: products, userlog: req.session.userLogged});
   },
    about:(req,res)=>{
        return res.render('index');
    },
    carrito:(req,res)=>{
        return res.render('productCart');
    },
    createEdit:(req,res)=>{
        return res.render('createEdit',{userlog: req.session.userLogged});
    }

} 

module.exports = mainController;