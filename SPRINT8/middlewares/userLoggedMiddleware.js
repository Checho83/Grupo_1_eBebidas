//const User = require('../models/User')

const db = require('../src/database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const client = db.client;

function userLoggedMiddleware(req, res, next){

    console.log('en el middleware ahora');

    if (req.cookies.recordame != undefined && req.session.userLogged == undefined){

        client.findOne({ where: { email: req.cookies.recordame } })
        .then((userToLogin) => {

         console.log(userToLogin);
  
        if (userToLogin){
            userToLogin = userToLogin.dataValues; 
            res.locals.isLogged = true;
            req.session.userLogged = userToLogin;
        //    res.locals.userLogged = req.session.userLogged;
        }   
  
        });      

    }
    
    next();
}

module.exports = userLoggedMiddleware;