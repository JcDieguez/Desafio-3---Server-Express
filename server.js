let express = require("express");
const Contenedor = require("./contenedor");
const PORT = 8080;
let app = express();


const products = new Contenedor('products.txt');

app.get("/productos", async (req, res)=>{
    const productos = await products.getAll();
    res.send(productos);
});

app.get("/productoRandom", async (req, res)=>{
    const productos = await products.getAll();
    let numeroRandom = Math.floor(Math.random() * productos.length);
    res.send(productos[numeroRandom]);
});


app.listen(PORT, ()=> console.log(`Server on http://localhost:${PORT}`));