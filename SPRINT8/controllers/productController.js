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
    cart:(req,res)=>{		//agrega productos en el carrito
	
		console.log("en el carrito")

		if(req.session.userLogged){

		//	shoppingcart.findOne({ where: { client_id: req.session.userLogged.id},include:[{association: "cart_client"}]})
			shoppingcart.findOne({ where: { client_id: req.session.userLogged.id}})
			.then(shopCart=>{
				
				if(shopCart){			//si hay shopping cart para el id del cliente, entonces almacenamos los datos del shopping cart product

					req.session.userLogged.shoppingCartId = shopCart.id;  //el ID del carrito pasa a estar disponible en toda la sesion

					let ProductCart = {
						products_id: req.params.id,
						qty: req.body.cantidad,
						shoppingCart_id : shopCart.id,
					}
			
					shoppingcartproduct.findOne({ where: { products_id: req.params.id, shoppingCart_id : shopCart.id} })
					.then(product=>{
			
						if (product === null) {			//si es NULL, el producto no esta en el carrito, aumento el contador
		

							shoppingcartproduct.create(ProductCart)
							.then(()=> {
							  console.log('Producto agregado');
							  return res.redirect('../productDetail');
							})     //volvemos a la pagina de productos       
							.catch(error => res.send(error))

							req.session.userLogged.shoppingCartQty = req.session.userLogged.shoppingCartQty + 1;

							let cartUpdate ={			
								qtyItems : req.session.userLogged.shoppingCartQty
							}

							shoppingcart.update(cartUpdate,{where:{id: req.session.userLogged.shoppingCartId}})

						} else {
			
						//	console.log(product.dataValues.qty );
							ProductCart.qty = product.dataValues.qty + parseInt(req.body.cantidad);		//actualizamos la cantidad si el product_id se repite
			
							product.update(ProductCart,{
								where:{products_id: req.params.id}})
							.then(() => {
								
								return res.redirect('../productDetail')
							})
							.catch(error => res.send(error))	
						}
					})
/* 					.then(()=>{

						shoppingcartproduct.findAll({ where: {shoppingCart_id : shopCart.id} })			//para actualizar la cantidad de productos
						.then(shopCartQty=>{
							console.log("Cantidad de productos para el ID");		
							console.log(shopCartQty.length);		//cantidad de productos en el carrito
							shopCart.qtyItems = shopCartQty.length;

						})

					}) */

				} else {  //si NO hay shopping cart para el id del cliente, creamos el id para el cliente y almacenamos el producto

					let shopCart = {
						qtyItems:1,		//al menos estamos agregando 1
						totalPrice:0,
						client_id:req.session.userLogged.id
					}

					shoppingcart.create(shopCart)
					.then(shopCart=>{

						req.session.userLogged.shoppingCartId = shopCart.id;  //el ID del carrito pasa a estar disponible en toda la sesion

						let ProductCart = {
							products_id: req.params.id,
							qty: req.body.cantidad,
							shoppingCart_id : shopCart.id,
						}
					//	console.log(ProductCart);

						shoppingcartproduct.create(ProductCart)
						.then(()=> {
						  console.log('Producto agregado');
						  req.session.userLogged.shoppingCart = req.session.userLogged.shoppingCart + 1;
						  return res.redirect('../productDetail');
						})     //volvemos a la pagina de productos       
						.catch(error => res.send(error))
						

					})

						

				}


			})
		}


     	return;
     },	
	 cartview: (req, res) => {		//solo se muestra el carrito si esta logueado

		console.log("En el carrito");
		console.log(req.session.userLogged.shoppingCartId)

		shoppingcartproduct.findAll({where:{shoppingCart_id : req.session.userLogged.shoppingCartId},include:[{association: "cartProducts"}]})
		.then(productsCart=> {
			if 	(productsCart){
				return res.render('productos/productCart',{productos:productsCart,userlog: req.session.userLogged});
			} else {
				res.send("No hay items")
			}
		 		
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
	cartdelete: (req, res) => {

		shoppingcartproduct.destroy({where:{id:req.params.id}})
		.then(() => {
			shoppingcartproduct.findAll({where:{shoppingCart_id : req.session.userLogged.shoppingCartId},include:[{association: "cartProducts"}]})
			.then(productsCart=> {
				req.session.userLogged.shoppingCartQty = productsCart.length;

				let cartUpdate ={			
					qtyItems : req.session.userLogged.shoppingCartQty		//actualizo la cantidad de items en el shoppingCart
				}

				shoppingcart.update(cartUpdate,{where:{id: req.session.userLogged.shoppingCartId}})

				return res.redirect("/productos/productCart");
			// return res.render('productos/productCart',{productos:productsCart,userlog: req.session.userLogged});
			})     //volvemos a la pagina de productos       
			.catch(error => res.send(error))
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

		//console.log(brand_data);
		//console.log(category_data);
		product.findByPk(indexProduct, {include:[{association: "product_brand"},{association: "product_category"}]})
		.then(product => {
		  return res.render('productos/productEdit',{items:product.dataValues, indexProducto:indexProduct, brands:brand_data,categories:category_data,userlog: req.session.userLogged });
		});
		})


	},
	searchBar: (req, res) => {

	
	let searchStr = req.query.searchBar;

		product.findAll(
			{where: {
				[Op.or]: [
				{name:{[Op.substring]:searchStr}},
				{'$product_category.name$':{[Op.substring]:searchStr}}]
				},
			 include:[{association: "product_brand"},{association: "product_category"}]})
		.then(products => {
			//console.log(products);
			return res.render('productos/productDetail', {productos: products,userlog: req.session.userLogged});
	  	})

	},

	cocktail: (req , res) =>{
		console.log("en listaaa")

		res.render('productos/cocteleria');
	},

} 
	

module.exports = productController;
