const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



const db = require('../src/database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


const product = db.product;
const brand = db.brand;
const category = db.category;




const mainController = {
    index: (req,res)=>{

    product.findAll({
		include:[{association: "product_brand"}]
	})
	.then(products => {
	  return res.render('index', {productos: products,userlog: req.session.userLogged});
	})

    },
    about:(req,res)=>{
        return res.render('index');
    },

    createEdit:(req,res)=>{
        return res.render('createEdit',{userlog: req.session.userLogged});
    }

} 

module.exports = mainController;