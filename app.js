const express = require('express');
const port = 3000;
const app = express();
const bodyparser = require('body-parser');

var jsonParser = bodyparser.json()
var urlencodedParser = bodyparser.urlencoded({ extended: false })

const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "bkr8uzegu9z4k52mgvt3-mysql.services.clever-cloud.com",
  user: "u24sbkla20yreep0",
  password: "mW8vDttJLo7NGu4oy6nZ",
  database: "bkr8uzegu9z4k52mgvt3",
  uri: "mysql://u24sbkla20yreep0:mW8vDttJLo7NGu4oy6nZ@bkr8uzegu9z4k52mgvt3-mysql.services.clever-cloud.com:3306/bkr8uzegu9z4k52mgvt3"
});

// Chek connect.
connection.connect((error) => {
  if (error) throw error;
  console.log("Database server running...");
});


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

app.listen(port, () => console.log(`Server running on port ${port}...`));
