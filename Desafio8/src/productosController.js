const express = require("express");
const Router = express.Router();
const Producto = require("./Producto");
const Archivo = require("./Archivo");
const { json } = require("body-parser");

//Inicializaciones
let archivo = new Archivo("./src/productos.txt")

//Rutas

Router.get("/listar", async (req, res) => {
    try {
        let productos = await archivo.getProductos();
        if (productos) {
            if (productos.length > 0) {
                res.status(200).json({ productos: productos });
            }
            else {
                res.send({ error: "No hay produtos cargados" })
            }
        }
        else{
            res.send({ error: "No hay produtos cargados" })
        }
    } catch (error) {
        console.log(error);
    }


});

Router.get("/listar/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let prod = await archivo.getProductosById(id)
        if (prod) {
            res.status(200).json({ producto: prod });
        }
        else {
            res.status(400).json({ error: "No existe el producto" })
        }
    } catch (error) {
        console.log("Error");
    }
})



Router.post("/guardar", async (req, res) => {
    try {
        let { title, price, thumbnail } = req.body;
        prod = new Producto(title, price, thumbnail);
        let resultado = await archivo.guardar(prod)
        if (resultado) {
            res.status(200).json({ data: prod });
        }
        else {
            res.status(400).json({ error: "No se pudo guardar el producto" })
        }
    } catch (error) {
        console.log(error);
    }
});

Router.delete("/borrar/:id", async(req, res) => {
    try {
        let id = req.params.id;
        let producto = await archivo.getProductosById(id);
        if (producto) {
            let result = await archivo.borrar(producto.id);
            res.status(200).json(producto);
        }
        else {
            res.status(400).json("No se encontro el producto")
        }

    }
    catch (err) {
        throw err;
    }
});

Router.put("/actualizar/:id",async(req,res)=>{
    try{
        let {price,title,thumbnail} = req.body;
        let producto = new Producto(title,price,thumbnail);
        let id = req.params.id;
        let prod = await archivo.getProductosById(id);
        if(prod){
            let act = await archivo.actualizar(id,producto);
                res.status(200).json(act);
        }
        else{
            res.status(400).json({error: "Producto no encontrado"})
        }
    }
    catch(err){
        console.log("Error: " + err)
    }
})


module.exports = Router;