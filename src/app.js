const express = require("express");
const app = express();
const db = require("./database");
const morgan = require("morgan");
const cors = require("cors"); 
const bcrypt = require("bcrypt")

app.set("port", process.env.port || 3000);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/products", (req, res) => {
  connection.query("select * from PRODUCTOS", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results);
  });
});

app.post("/createProduct", function (req, res) {
  console.log(req.body.nombre);
  let id = req.body.idProducto;
  let name = req.body.nombre;
  let category = req.body.categoria;
  let lab = req.body.laboratorio;
  let price = req.body.precio;
  let unitSell = req.body.unidadVenta;
  let location = req.body.ubicacion;
  let tax = req.body.grabadoImpuesto;
  let barCode = req.body.codigoBarras;
  let minQuant = req.body.cantidadMinima;
  let quant = req.body.cantidad;

  db.query(
    `insert into PRODUCTOS (idProductos, nombre, categoria, laboratorio, precio, unidad_venta, ubicacion,\
     grabado_impuesto, codigo_barras, cantidad_minima, cantidad) values (${id}, '${name}', '${category}', '${lab}', ${price}, '${unitSell}', '${location}', ${tax}, '${barCode}', ${minQuant}, ${quant})`,
    (error, response) => {
      if (error) throw error;
      else {
        res.sendStatus(200);
      }
    }
  );
  res.sendStatus(200);
});

app.get("/", async (req, res)=>{
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash("123", salt)
  console.log(pass);
  console.log(await bcrypt.compare("123", pass))
})

//Routes
app.use('/auth',require('./routes/auth.routes'));

module.exports = app;
