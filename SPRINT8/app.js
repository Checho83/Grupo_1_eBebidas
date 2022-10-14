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
const userApiRouter = require('./routers/api/userApiRouter');
const productApiRouter = require('./routers/api/productApiRouter');

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

//apis

app.use('/api/users/',userApiRouter);
app.use('/api/products/',productApiRouter);

app.use((req , res , next)=>{
    res.status(404).render('user/error');
})


app.listen(puerto, ()=>{
    console.log("Esta corriendo en el puerto " + puerto);
});




