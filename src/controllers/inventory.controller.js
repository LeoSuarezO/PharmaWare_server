import db from "../database";

  export const getProductList = async (req, res) => {
   const result = await db.query("SELECT * FROM PRODUCTOS")

      res.status(200).json(result);
  }
  
 export const createProduct = async (req, res) => {
    const {id, name, category, lab, price, unitSell, location, tax, barCode, minQuant, quant} = req.body;
  
    await db.query(
      `INSERT INTO PRODUCTOS (idProductos, nombre, categoria, laboratorio, precio, unidad_venta, ubicacion,\
       grabado_impuesto, codigo_barras, cantidad_minima, cantidad) values (?,?,?,?,?,?,?,?,?,?,?)`, 
       [id, name, category, lab, price, unitSell, location, tax, barCode, minQuant, quant]
    );
    
    res.sendStatus(201);
  };

  export const getProductName = async (req, res) => {
   const result = await db.query('SELECT * FROM PRODUCTOS WHERE nombre = ?', [req.body.name])
   
   res.status(201).json(result);
  }

  export const getProductBar = async (req, res) => {
    const result = await db.query('SELECT * FROM PRODUCTOS WHERE codigo_barras = ?', [req.body.codeBar])
    res.status(201).json(result);
   }

  export const deleteProduct = async (req, res) => {
    const result = await db.query('DELETE FROM PRODUCTOS WHERE codigo_barras = ?', [req.body.codeBar])
    res.sendStatus(200)
  }
