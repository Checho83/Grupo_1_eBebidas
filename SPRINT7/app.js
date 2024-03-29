const path = require("path");
const express = require("express");
const session = require('express-session');
var cookieParser = require('cookie-parser');
const app= express();
const puerto = 3030;

const methodOverride = require('method-override')
app.use(methodOverride('_method'));

app.set('view engine','ejs');
app.use(express.static('public'));

const mainRouter = require('./routers/mainRouter');
const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter');

var userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: "frase secreta",
    resave: false,
    saveUninitialized:false
}));

app.use(cookieParser());

app.use(userLoggedMiddleware);

app.use("/", mainRouter);
app.use("/user", userRouter);
app.use("/productos", productRouter);
//app.use("/", productCart);

app.use((req , res , next)=>{
    res.status(404).render('user/error');
})

app.listen(puerto, ()=>{
    console.log("Esta corriendo en el puerto " + puerto);
});



/* app.get("/Quienes_somos", (req, res)=> {
    res.sendFile(path.join(__dirname, "./views/error.html"))
})

app.get("/Contacto", (req, res)=> {
    res.sendFile(path.join(__dirname, "./views/error.html"))
}) */

/* 
app.get("/productCart", (req, res)=> {
    res.sendFile(path.join(__dirname, "./views/productCart.html"))
})

 */

/*
app.get("/", (req, res)=> {
    res.sendFile(path.join(__dirname, "./views/index.html"))
})
app.get("/home", (req, res)=> {
    res.sendFile(path.join(__dirname, "./views/index.html"))
})

app.get("/register", (req, res)=> {
    res.sendFile(path.join(__dirname, "./views/register.html"))
})
app.get("/login", (req, res)=> {
    res.sendFile(path.join(__dirname, "./views/login.html"))
})

app.get("/productDetail", (req, res)=> {
    res.sendFile(path.join(__dirname, "./views/productDetail.html"))
})

¨*/

