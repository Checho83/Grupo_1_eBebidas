const path = require("path");
const express = require("express");
const app= express();
const puerto = 3030;

app.use(express.static('public'));
/*app.use('/static', express.static(__dirname + '/public'));*/

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
app.get("/productCart", (req, res)=> {
    res.sendFile(path.join(__dirname, "./views/productCart.html"))
})

app.listen(puerto, ()=>{
    console.log("Esta corriendo en el puerto " + puerto);
});

