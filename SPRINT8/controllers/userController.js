const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');


const db = require('../src/database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const client = db.client;
const shoppingcart = db.shoppingcart;
const shoppingcartproduct = db.shoppingcartproduct;



const productsFilePath = path.join(__dirname, '../data/products.json');
const usuariosFilePath = path.join(__dirname, '../data/user.json');

let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
let usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));


const userController = {
  login: (req, res) => {

    res.render('user/login');
  },
  processlogin: (req, res) => {

    let resultvalidation = validationResult(req);

    if (resultvalidation.errors.length > 0) {
      //console.log(resultvalidation.errors);
      return res.render('user/login', {
        errors: resultvalidation.mapped(),
        oldData: req.body
      })
    }


      client.findOne({ where: { email: req.body.email } })
      .then((userToLogin) => {

        if (userToLogin) {      //si no es null...

          userToLogin = userToLogin.dataValues; 

          let passOK = bcrypt.compareSync(req.body.pass, userToLogin.pass)
          if (passOK) {


            shoppingcart.findOne({ where: { client_id : userToLogin.id } })
            .then(shopCart =>{

              delete userToLogin.pass;

              res.locals.isLogged = true;

              if(shopCart){       //veo que las variables esten disponibles en toda la sesion
                userToLogin.shoppingCartId = shopCart.id
                userToLogin.shoppingCartQty = shopCart.qtyItems;

              } else {      //no existe el shopping cart para ese ID, lo creamos

/*                 let shopCart = {
                  qtyItems:0,
                  totalPrice:0,
                  client_id:userToLogin.id
                }
      
                shoppingcart.create(shopCart)     //creo e inicializo las variables de la sesion
                .then(()=>{

                  shoppingcart.findOne({ where:{client_id:userToLogin.id}})
                  .then(shopCart=>{
                    userToLogin.shoppingCartId = shopCart.id
                    userToLogin.shoppingCartQty = shopCart.qtyItems;
                  })

                }) */

              }

              req.session.userLogged = userToLogin;
            //  console.log (req.session.userLogged);

            console.log(req.session.userLogged.shoppingCartId);

              if (req.body.recordame != undefined)
                res.cookie('recordame', userToLogin.email, { maxAge: 100000 })

              if (userToLogin.email == 'admin@admin.com') {
                return res.render('createEdit',{userlog: req.session.userLogged});
              } else {
                console.log("reenviando a home");
                return res.redirect('../');
              }

            })
            

          } else {
            return res.render('user/login', {
              errors: {
                email: {
                  msg: 'Credenciales inválidas'
                }
              }
            });
          }
        } else {

          return res.render('user/login', {
            errors: {
              email: {
                msg: 'Email no registrado'
              }
            }    
          });

        }
  

      })
      .catch(error => res.send(error));

    },
    register:(req,res)=>{
      res.render('user/register');
     
    },
    error:(req,res)=>{
     // res.redirect('user/error');
      res.render('user/error',{userlog: req.session.userLogged});
     
    },
    quienesSomos:(req,res)=>{
      res.render('user/quienesSomos', {userlog: req.session.userLogged});
     
    },
    storeUser:(req,res)=>{

      let resultvalidation = validationResult(req);


      client.findOne({ where: { email: req.body.email } })
      .then((userToLogin) => {

          if (userToLogin){           //existe usuario...
            console.log('existe');
            resultvalidation.errors.push({
              value: req.body.email,
              msg: 'Email ya registrado',
              param: 'email',
              location: 'body'
            })
          } 

          if (resultvalidation.errors.length > 0){    //mando los errores de vuelta a la vista
            return res.render('user/register',{
              errors: resultvalidation.mapped(),
              oldData : req.body
            })       
          }

          let userToCreate = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone:req.body.phone,
            birthdate: req.body.birthdate,
            address: req.body.address,
            city:"cordoba",
            province:"cordoba",
            cp:5000,
            pass: bcrypt.hashSync(req.body.pass, 10),
            avatar: !req.file ? "userDefault.jpg" : req.file.originalname
          }
    
         console.log(userToCreate);
         
          client.create(userToCreate)
          .then(user=> {
           //   console.log(user);

            let shopCart = {    //ASIGNAMOS EL CARRITO DE COMPRAS A CADA USUARIO CREADO
              qtyItems:0,
              totalPrice:0,
              client_id:user.id
            }
  
            shoppingcart.create(shopCart)
            .then(()=>{
              console.log('Registro hecho');
              return res.redirect('/user/login')
            })     //volvemos a la pagina de productos     
            
          })    
          .catch(error => res.send(error))


      })  
     
    },
    list:(req, res) =>{
      console.log("en list")
      client.findAll()
      .then(clients => {
        res.render('user/userList', {users:clients,userlog: req.session.userLogged });
      })
    },
    update: (req, res) => {

      

      let userToedit = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone:req.body.phone,
        birthdate: req.body.birthdate,
        address: req.body.address,
        city:"cordoba",
        province:"cordoba",
        cp:req.body.cp
        //pass: bcrypt.hashSync(req.body.pass, 10),
        //avatar: !req.file ? "userDefault.jpg" : req.file.originalname
      }

      if (req.file){
        userToedit.avatar = req.file.originalname;
      }
 

     // console.log(userToedit);
      
      client.update(userToedit, {where:{id:req.params.id}})
      .then(() => {
        
        return res.redirect("userList");
       // res.render('user/userEdit',{user:client.dataValues, indexClient});
      });
    

    },
    userPanel:(req, res) =>{
      
      let indexClient = req.session.userLogged.id;

      client.findByPk(indexClient)
      .then(client => {
        console.log(client);
        res.render('user/userEdit',{user:client.dataValues, userlog:req.session.userLogged,indexClient});
      });

    },  
    delete:(req, res) =>{
    
    let indexClient = req.params.id;

    shoppingcart.findOne({where:{client_id:req.params.id}})     //busco el carrito de compras para saber el id del carrito de compras a borrar
      .then(ShopCart=>{

        if(ShopCart) {      //cliente con carrito de compras
          shoppingcartproduct.destroy({where:{shoppingCart_id: ShopCart.id}})
          .then(()=>{
            shoppingcart.destroy({where:{client_id:req.params.id}})
            .then(()=>{

              client.destroy({where:{id:indexClient}})
              .then(() => {
           //  console.log(client);
             return res.redirect("userList");
              });
            })

          })
        } else {          //sin carrito de compras, borro directamente el usuario
            client.destroy({where:{id:indexClient}})
            .then(() => {
            return res.redirect("userList");
          });
        }  


        })
  



    },
    detail:(req, res) =>{

      let indexClient = req.params.id;

      client.findByPk(indexClient)
      .then(client => {
        console.log(client);
        res.render('user/userEdit',{user:client.dataValues, userlog:req.session.userLogged,indexClient});
      });
      
    },


    contact:(req,res)=>{
      res.render('user/contact');
     
    },
    respuesta:(req,res)=>{
     console.log('entre');
     res.redirect('/');
    
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
