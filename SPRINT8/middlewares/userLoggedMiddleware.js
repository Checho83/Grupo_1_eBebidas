//const User = require('../models/User')

const db = require('../src/database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const client = db.client;
const shoppingcart = db.shoppingcart;

function userLoggedMiddleware(req, res, next){

    console.log('en el middleware ahora');

    if (req.cookies.recordame != undefined && req.session.userLogged == undefined){

        client.findOne({ where: { email: req.cookies.recordame } })
        .then((userToLogin) => {
            console.log('cliente recordado...');
     //    console.log(userToLogin);
  
        if (userToLogin){
            userToLogin = userToLogin.dataValues; 
            res.locals.isLogged = true;
            req.session.userLogged = userToLogin;
        //    res.locals.userLogged = req.session.userLogged;
        }   

        
        shoppingcart.findOne({ where: { client_id : req.session.userLogged.id } })
        .then(shopCart =>{

          if(shopCart){       //veo que las variables esten disponibles en toda la sesion
            req.session.userLogged.shoppingCartId = shopCart.id
            req.session.userLogged.shoppingCartQty = shopCart.qtyItems;
            
          } 
          })
          .then(()=>{
            next();
          })      

        })

    } else {
        next();
    }
    
}

module.exports = userLoggedMiddleware;