const express = require("express");
const path = require("path");

//Inicializaciones
const app = express();


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.use("/api/productos",require("./productosController"));


//Listen
app.listen(8080,(req,res)=>{
    console.log("Servidor escuchando en el puerto 8080");
})