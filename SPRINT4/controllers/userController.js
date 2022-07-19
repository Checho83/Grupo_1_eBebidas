
const path = require('path');

const userController = {
    login: (req,res)=>{
       res.render('user/login');
   },
    register:(req,res)=>{
      res.render('user/register');
     
    },
    error:(req,res)=>{
      res.render('user/error');
     
    },
    quienesSomos:(req,res)=>{
      res.render('user/quienesSomos');
     
    }

} 
module.exports = userController;