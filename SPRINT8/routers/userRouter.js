const express = require('express');
const router = express.Router(); 
const path = require('path');
const multer = require('multer');
const guestMiddleware = require('../middlewares/guestMiddleware')

const {check} = require('express-validator');

const userController = require('../controllers/userController')
const adminMiddleware = require('../middlewares/adminMiddleware')


function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}


const validateRegister = [
   check('firstName')
      .notEmpty().withMessage('Debes escribir un nombre')
      .custom(firstName => {
        if (firstName =='Debes escribir un nombre') {
          throw new Error('Debes escribir un nombre')}
          return true;}),

  check('lastName')
      .notEmpty().withMessage('Debes escribir tu apellido')
      .custom(firstName => {
        if (firstName =='Debes escribir tu apellido') {
          throw new Error('Debes escribir tu apellido')}
          return true;}),

    check('email').notEmpty().withMessage('Escribir un email').isEmail().withMessage('Formato de Email no valido'),
        
    check('birthdate').notEmpty().withMessage('Selecciona una fecha de nacimiento').custom(birthdate => {    
      if (getAge(birthdate)<18) {     
        throw new Error('Debe ser mayor de 18 para continuar')}
        return true;}),

    check('address').notEmpty().withMessage('Ingrese una direccion')
    .custom(address => {
      if (address =='Ingrese una direccion') {
        throw new Error('Ingrese una direccion')}
        return true;}),

     check('isOld').notEmpty().withMessage('Seleccionar una opción')
         .custom(isOld => {
          if ((isOld)==='NO') {
          throw new Error('Debe ser mayor de 18 para continuar')}
          return true;}), 

    check('pass').notEmpty().withMessage('Ingrese una contraseña adecuada')
                 .isLength({ min:8}).withMessage('Ingrese una contraseña de mas de 8 caracteres'),
    
    check('passVerif').notEmpty().withMessage('Reingrese la contraseña')
                  .custom((passVerif, { req}) => {
                        if (passVerif!=req.body.pass) {
                         throw new Error('La confirmación debe ser igual a la contraseña')}
                   return true;})
  ]

  const validateLogin = [
    check('email').isEmail().withMessage('Escribir un email'),
    check('pass').notEmpty().withMessage('Ingrese una contraseña').isLength({ min:3}).withMessage('Ingrese una contraseña')
  ]

  

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,path.join(__dirname, '../public/images/users'))
    },
    filename: function (req, file, cb) {

    cb(null, file.originalname)
  }

})


const upload = multer({ storage: storage });



router.get('/login',guestMiddleware, userController.login);
router.get('/logout', userController.logout);
router.post('/login', validateLogin , userController.processlogin);
//router.get('/userEdit', userController.edit);
router.get('/userList',adminMiddleware, userController.list);
router.post('/register', upload.single('avatar'),validateRegister, userController.storeUser);
router.get('/register',guestMiddleware, userController.register);
router.get('/contacto', userController.error);
router.get('/Quienes_somos', userController.quienesSomos);
router.get('/:id', adminMiddleware,userController.detail);
router.post('/:id', upload.single('avatar'),userController.update);
//router.post('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;
