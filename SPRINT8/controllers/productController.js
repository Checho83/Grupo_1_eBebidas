const fs = require('fs');
const path = require('path');

//const productsFilePath = path.join(__dirname, '../data/products.json');

const { validationResult } = require('express-validator');

//let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const db = require('../src/database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


const product = db.product;
const brand = db.brand;
const category = db.category;
const shoppingcart = db.shoppingcart;
const shoppingcartproduct = db.shoppingcartproduct;



const productController = {
   view: (req,res)=>{
	

	let catSearch;
	let oneProduct = false;
	let indexProduct;

	switch (req.path){
		case '/vinos': 	filterSearch = {};
						catSearch = {association: "product_category", where: {name: 'Vinos'}};
						break;
		case '/cervezas': catSearch = {association: "product_category", where: {name: 'Cervezas'}};
						break;
		case '/destilados': catSearch = {association: "product_category", where: {name: ['Licores','Whisky','Vodka','Ron','Tequila']}};
						break;
		case '/cocteleria': catSearch = {association: "product_category", where: {name: 'Cervezas'}};
						break;
		case '/productDetail': catSearch = {association: "product_category"};
						break;			
		default: 	indexProduct = req.path.substring(7);
					//console.log(result);
					oneProduct = true;				
					break;			
	}

	
	if (oneProduct){
		product.findAll({where:{id:indexProduct}},{
			include:[{association: "product_brand"},catSearch]
		})
		.then(product => {
			return res.render('productos/productDetail', {productos: product,userlog: req.session.userLogged});
		});

	}	else{
		product.findAll({
			include:[{association: "product_brand"},catSearch]
		})
		.then(products => {
	  		return res.render('productos/productDetail', {productos: products,userlog: req.session.userLogged});
		})
	}

   },
	create: (req, res) => {

		var brand_data;
		var category_data;
		
		brand.findAll()
		.then( brand =>{
			brand_data= brand;
			return brand;
		})
		.then( object =>{		
			return category.findAll()
			.then(category =>{
				category_data= category;
				return category;
			});			
		})
		.then(()=>{

		  return res.render('productos/productCreate',{brands:brand_data,categories:category_data,userlog: req.session.userLogged });
		});
		
	},
	edit: (req, res) => {
		return res.render('productos/productCreate');
	},
    cart:(req,res)=>{
	

		let ProductCart = {
			products_id: req.params.id,
			qty: req.body.cantidad,
			shoppingCart_id : 1,
		}

		shoppingcartproduct.findOne({ where: { products_id: req.params.id, shoppingCart_id : 1 } })
		.then(product=>{

			if (product === null) {

				shoppingcartproduct.create(ProductCart)
				.then(()=> {
				  console.log('Producto agregado');
				  return res.redirect('../productDetail');
				})     //volvemos a la pagina de productos       
				.catch(error => res.send(error))
			} else{

				console.log(product.dataValues.qty );
				ProductCart.qty = product.dataValues.qty + parseInt(req.body.cantidad);		//actualizamos la cantidad si el product_id se repite

				product.update(ProductCart,{
					where:{products_id: req.params.id}})
				.then(() => {
					
					return res.redirect('../productDetail')
				 // res.render('user/userEdit',{user:client.dataValues, indexClient});
				});	
			}
		})


     	return;
     },	
	 cartview: (req, res) => {

		console.log("En el carrito2");

		shoppingcartproduct.findAll({where:{shoppingCart_id : 1},include:[{association: "cartProducts"}]})
		.then(productsCart=> {
		//	console.log(productsCart[0].qty);
		// console.log(productsCart[0].cartProducts.dataValues.image);
		// return res.redirect('../productDetail')
		 return res.render('productos/productCart',{productos:productsCart,userlog: req.session.userLogged});
		})     //volvemos a la pagina de productos       
		.catch(error => res.send(error))

	 },	
	store: (req, res) => {
	
//	console.log(req.session.userLogged);

	let resultvalidation = validationResult(req);

	if (resultvalidation.errors.length > 0){    //mando los errores de vuelta a la vista

		var brand_data;
		var category_data;
		
		brand.findAll()
		.then( brand =>{
			brand_data= brand;
			return brand;
		})
		.then( object =>{		
			return category.findAll()
			.then(category =>{
				category_data= category;
				return category;
			});			
		})
		.then(()=>{
	
		  return res.render('productos/productCreate',{	brands:brand_data,
														categories:category_data,
														errors: resultvalidation.mapped(),
														oldData : req.body,
														userlog: req.session.userLogged });
		});

		} else{


		let newProduct =  {
			// id:  req.body.id,
			 name: req.body.name,
			 price : req.body.price,
			 discount :req.body.discount,
			 category_id:req.body.category,
			 brand_id:req.body.brand,
			 offer : req.body.oferta,
			 stock : req.body.stock,
			 description : req.body.description,
			 image : !req.file ? "productDefault.jpg" : req.file.originalname//req.file.originalname
		 }

		 
		 
		 product.create(newProduct)
		 .then(()=> {
		   console.log('Producto agregado');
		   return res.redirect('productList')})     //volvemos a la pagina de productos       
		 .catch(error => res.send(error))

		}
	
	},

	// Update - Method to update
	update: (req, res) => {

		productToedit = {
			id : req.body.id,
			name : req.body.name,
			price : req.body.price,
			discount : req.body.discount,
			category_id:req.body.category,
			brand_id:req.body.brand,
			offer : req.body.offer,
			stock : req.body.stock,
			description : req.body.description
		}


		if(req.file){
			productToedit.image = req.file.originalname;
		}

	//	console.log(productToedit.product_category.id);

		product.update(productToedit,{
			where:{id:req.params.id}})
		.then(() => {
			
		  return res.redirect('productList');
		 // res.render('user/userEdit',{user:client.dataValues, indexClient});
		});
	  

	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {

		product.destroy({where:{id:req.params.id}})
		.then(() => {

	   		return res.redirect('productList')
		})

	},

	list: (req, res) => {
		
		product.findAll({
			include:[{association: "product_brand"},{association: "product_category"}]
		})
		.then(products => {
		  return res.render('productos/productList', {productos: products,userlog: req.session.userLogged});
		})

	},
	parcialDetail:(req,res)=>{
	
		product.findAll({
			include:[{association: "product_brand"},{association: "product_category"}]
		})
		.then(products => {
		  return res.render('productos/productDetail', {productos: products,userlog: req.session.userLogged});
		})
	},
	detail: (req, res) => {
		
		let indexProduct = req.params.id;

		var brand_data;
		var category_data;
		
		brand.findAll()
		.then( brand =>{
			brand_data= brand;
			return brand;
		})
		.then( object =>{		
			return category.findAll()
			.then(category =>{
				category_data= category;
				return category;
			});			
		})
		.then(()=>{

		console.log(brand_data);
		console.log(category_data);
		product.findByPk(indexProduct, {include:[{association: "product_brand"},{association: "product_category"}]})
		.then(product => {
		  return res.render('productos/productEdit',{items:product.dataValues, indexProducto, brands:brand_data,categories:category_data,userlog: req.session.userLogged });
		});
		})


	}
} 
	

module.exports = productController;
