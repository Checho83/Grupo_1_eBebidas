const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const productsFilePath = path.join(__dirname, '../data/products.json');
const usuariosFilePath = path.join(__dirname, '../data/user.json');

let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
let usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));


const userController = {
    login: (req,res)=>{
    //  res.render('index',{productos: products});
       res.render('user/login');
    },
    processlogin: (req,res)=>{

      let resultvalidation = validationResult(req);
      
      if (resultvalidation.errors.length > 0){
        //console.log(resultvalidation.errors);
        return res.render('user/login',{
          errors: resultvalidation.mapped(),
          oldData : req.body
        })
      }

      let userToLogin = User.findByField('email',req.body.email);

     // console.log(userToLogin);

      if (userToLogin){
        let passOK = bcrypt.compareSync(req.body.pass, userToLogin.pass )
        if (passOK){
          delete userToLogin.pass;   
          
          res.locals.isLogged = true;
          req.session.userLogged = userToLogin;

        //  res.locals.userLogged = req.session.userLogged;
        //  console.log (res.locals.userLogged);

          if(req.body.recordame != undefined) 
            res.cookie('recordame', userToLogin.email,{maxAge:100000})

          if (userToLogin.email == 'admin@admin.com'){
            res.render('productos/productCreateEdit');
          }else { 
            return res.redirect('../');
          } 
            
        }else {      
          return res.render('user/login', {
          errors:{
            email:{
              msg: 'Credenciales inválidas'
            }
          }
        });}
      }

      res.render('user/login', {
        errors:{
          email:{
            msg: 'Email no registrado'
          }
        }
      });
    },
    register:(req,res)=>{
      res.render('user/register');
     
    },
    error:(req,res)=>{
      res.render('user/error',{user: req.session.userLogged});
     
    },
    quienesSomos:(req,res)=>{
      res.render('user/quienesSomos', {user: req.session.userLogged});
     
    },
    storeUser:(req,res)=>{

      let resultvalidation = validationResult(req);
      console.log(resultvalidation.errors);
      if (resultvalidation.errors.length > 0){
        return res.render('user/register',{
          errors: resultvalidation.mapped(),
          oldData : req.body
        })
        
      }

      let userToCreate = {
       // name: req.body.name,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthdate: req.body.birthdate,
        address: req.body.address,
        pass: bcrypt.hashSync(req.body.pass, 10),
        image: !req.file ? "userDefault.jpg" : req.file.originalname
      }

      User.create(userToCreate);

     
      console.log('Registro hecho');
      res.redirect('/user/login');      //volvemos a la pagina de productos
     
    },
    logout:(req, res) =>{

      delete req.session.userLogged;
      res.clearCookie('recordame')    //borramos cookie
      res.locals.isLogged = false;
      res.redirect('../');
    },
    usuarios:usuarios     //datos usuarios

} 
module.exports = userController;
