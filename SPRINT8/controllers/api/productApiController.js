
const db = require('../../src/database/models');
const sequelize = db.sequelize;

const product = db.product;
const brand = db.brand;
const category = db.category;


const productApiController = {

    list:(req, res) =>{
      
    var category_data;

	product.findAll({
        attributes: [
            [sequelize.col('product_category.name'),'name'],
            [sequelize.fn('COUNT', sequelize.col('product.id')), 'total'],
        ], 
        group: ['product_category.name'], 
          include:[{association: "product_category",attributes:[], right: true}]  //right join, para traer los datos vacios
      }).then(category =>{
        category_data= category;
       // console.log(category_data);
        return category;

      }).then(() =>{

    product.findAll( {attributes: ['id', 'name', 'description'],include:[{association: "product_brand",attributes:['name']},{association: "product_category",attributes:['name']}]})
      .then(product => {
        product.forEach(product => {
           product.dataValues.detail = 'http://' + req.rawHeaders[1] + '/api/products/' + product.dataValues.id;
        });


        let answer = {
            meta: {
                status : 200,
                url: 'http://' + req.rawHeaders[1] + '/api/products'
            },
            count:product.length,
            countByCategory: category_data,
            products: product
        }
            res.json(answer);
        })

    })
    },
    detail:(req, res) =>{

      let indexProduct = req.params.id;

      product.findByPk(indexProduct,{attributes: ['id', 'name', 'price', 'discount', 'offer', 'stock', 'description', 'image'],include:[{association: "product_brand",attributes:['name']},{association: "product_category",attributes:['name']}]})
      .then(product => {

        if (product == null){
            product = 'Producto no registrado. Ver api/products para los productos disponibles ';
        } else{
             product.dataValues.image = 'http://' + req.rawHeaders[1] + '/images/' 
            + product.dataValues.image;
        }

        let answer = {
            meta: {
                status: 200,
                total: 1,
                url: 'http://' + req.rawHeaders[1] + '/api/products/' + indexProduct,
            },
            product: product
        }
        res.json(answer);
    });
      
    }

} 

module.exports = productApiController;
