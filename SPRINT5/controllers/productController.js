const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productController = {
   view: (req,res)=>{
      res.render('productos/productDetail',{productos: products, user: req.session.userLogged});
   },
	create: (req, res) => {
		res.render('productos/productCreate');
		
	},
	edit: (req, res) => {
		res.render('productos/productCreate');
	},
    carrito:(req,res)=>{
     res.render('productos/productCart');
     },		
	store: (req, res) => {

		let file = req.file;
		
		let nuevoProducto =  {
			 id:  req.body.id,
			 name: req.body.name,
			 price : req.body.price,
			 discount :req.body.discount,
			 category : req.body.category,
			 offer : req.body.oferta,
			 stock : req.body.stock,
			 description : req.body.description,
			 image : req.file.originalname
		 }
		 
	
		 products.push(nuevoProducto);
		 let productoJson = JSON.stringify(products, null, 3);
		 fs.writeFileSync(productsFilePath,productoJson)
		 res.render('productos/productList',{productos: products}); 

	},

	// Update - Method to update
	update: (req, res) => {

		//let indexOfProduct = products.findIndex(product => product.id == req.body.id);

		let indexProducto = products[req.params.id];	//index del producto dentro del array

		indexProducto.id= req.body.id;
		indexProducto.name= req.body.name;
		indexProducto.price = req.body.price;
		indexProducto.discount = req.body.discount;
		indexProducto.category = req.body.category;
		indexProducto.offer = req.body.offer,
		indexProducto.stock = req.body.stock;
		indexProducto.description = req.body.description;

		let file = req.file;

		if(!file){
			//res.send("Selecciona un archivo");
		}else
			indexProducto.image = req.file.originalname;

		//console.log(indexProducto.image);

		let productoJson = JSON.stringify(products);

		fs.writeFileSync(productsFilePath,productoJson)
		//res.render('productos/productList',{productos: products}); 

		res.redirect('productList');
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {

		console.log("borrando.."+req.params.id);

		//products = products.filter(producto => producto.id != req.params.id);
		products.splice(req.params.id, 1);  //borra solo el elemento indicado del arra

		console.log(products);
		let productoJson = JSON.stringify(products);
		fs.writeFileSync(productsFilePath,productoJson);

		res.render('productos/productList',{productos: products});
	},

	list: (req, res) => {
		 
		res.render('productos/productList',{productos: products});
		
	},
	detail: (req, res) => {
		
		let indexProducto = req.params.id;

		productoID =  products[indexProducto]
		
		res.render ('productos/productEdit',{items: productoID, indexProducto: indexProducto}) 
	//	console.log(indexProducto);	
	//	console.log(items)

	}
} 
	

module.exports = productController;
