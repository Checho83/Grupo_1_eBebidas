const User = require('../models/User')

function userLoggedMiddleware(req, res, next){

   // res.locals.isLogged = false;

    console.log('en el middleware ahora');

    if (req.cookies.recordame != undefined && req.session.userLogged == undefined){

        let userToLogin = User.findByField('email',req.cookies.recordame);

        
      //  console.log(userToLogin);
  
        if (userToLogin){
            res.locals.isLogged = true;
            req.session.userLogged = userToLogin;
        //    res.locals.userLogged = req.session.userLogged;
        }   
    }
    

    next();
}

module.exports = userLoggedMiddleware;