const express = require("express");
const app = express();
const db = require("./database")
const bodyparser = require('body-parser');

app.set("port", process.env.port || 3000);

var jsonParser = bodyparser.json()
var urlencodedParser = bodyparser.urlencoded({ extended: false })

app.get('/products', (req, res) => {
  connection.query('select * from PRODUCTOS', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results)    
  })
})

app.post('/createProduct', jsonParser, function(req, res) {

  console.log(req.body.nombre)
  let id = req.body.idProducto
  let name = req.body.nombre
  let category = req.body.categoria
  let lab = req.body.laboratorio
  let price = req.body.precio
  let unitSell = req.body.unidadVenta
  let location = req.body.ubicacion
  let tax = req.body.grabadoImpuesto
  let barCode = req.body.codigoBarras
  let minQuant = req.body.cantidadMinima
  let quant = req.body.cantidad

    connection.query(`insert into PRODUCTOS (idProductos, nombre, categoria, laboratorio, precio, unidad_venta, ubicacion,\
     grabado_impuesto, codigo_barras, cantidad_minima, cantidad) values (${id}, '${name}', '${category}', '${lab}', ${price}, '${unitSell}', '${location}', ${tax}, '${barCode}', ${minQuant}, ${quant})`, 
     (error, response) =>{
      if(error)throw error
      else{
        res.sendStatus(200)
      }
     })
     res.sendStatus(200)
  })

// const tables = connection.query("show tables",(err, body)=>{
//     console.log(body)
// })

// const desc = connection.query("select * from PRODUCTOS", (err, body) => {
//   console.log(body)
// })

module.exports = app