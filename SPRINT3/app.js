const path = require("path");
const express = require("express");
const app= express();
const puerto = 3030;
app.set('view engine','ejs');
app.use(express.static('public'));

const mainRouter = require('./routers/mainRouter');
const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter');
//const productCart = require('./routers/productCart');

app.use("/", mainRouter);
app.use("/user", userRouter);
app.use("/productos", productRouter);
//app.use("/", productCart);




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
app.listen(puerto, ()=>{
    console.log("Esta corriendo en el puerto " + puerto);
});

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

