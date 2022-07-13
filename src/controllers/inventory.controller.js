import db from "../database";

export const getProductList = async (req, res) => {
  const result = await db.query("SELECT * FROM PRODUCTOS");
  res.status(200).json(result);
};

export const productExist = async (barCode) => {
  const result = await db.query(
    "SELECT * FROM PRODUCTOS WHERE codigo_barras = ?",
    [barCode]
  );
  if (!result[0]) return false;
  return result[0];
};

export const searchByName = async (req, res) => {
  const result = await db.query(
    "SELECT * FROM PRODUCTOS WHERE LOCATE(?, nombre) > 0",
    [req.body.name]
  );
  res.status(201).json(result);
};

export const createProduct = async (req, res) => {
  const {
    id,
    name,
    category,
    lab,
    price,
    unitSell,
    location,
    tax,
    barCode,
    minQuant,
    quant,
  } = req.body;
  const foundProduct = await productExist(barCode);
  if (foundProduct) {
    res.status(409).json({ message: "Product already exists" });
  } else {
    await db.query(
      "INSERT INTO PRODUCTOS (id_producto, nombre, categoria, laboratorio, precio, unidad_venta, ubicacion,\
       grabado_impuesto, codigo_barras, cantidad_minima, cantidad) values (?,?,?,?,?,?,?,?,?,?,?)",
      [
        id,
        name,
        category,
        lab,
        price,
        unitSell,
        location,
        tax,
        barCode,
        minQuant,
        quant,
      ]
    );
    res.sendStatus(201);
  }
};

export const serachByBar = async (req, res) => {
  const result = await db.query(
    "SELECT * FROM PRODUCTOS WHERE codigo_barras = ?",
    [req.body.barCode]
  );
  if(result[0]) res.status(200).json(result);
  else res.status(404).json({message: "Product not found"})
};

export const serachByCategory = async (req, res) => {
  const result = await db.query(
    "SELECT * FROM PRODUCTOS WHERE LOWER(categoria) = LOWER(?)",
    [req.body.category]
  );
  if(result[0]) res.status(200).json(result);
  else res.status(404).json({message: "Product not found"});
};

export const deleteProduct = async (req, res) => {
  const foundProduct = await productExist(req.body.barCode)
  if(foundProduct){
  await db.query("DELETE FROM PRODUCTOS WHERE codigo_barras = ?", [
    req.body.barCode,
  ]);
  res.sendStatus(200);
  }else{
    res.status(404).json({message: "Product not found"})
  }
};

export const updateProduct = async (req, res) => {
  const {
    name,
    category,
    lab,
    price,
    unitSell,
    location,
    tax,
    barCode,
    minQuant,
    quant,
  } = req.body;
  const foundProduct = await productExist(barCode);
  if (foundProduct) {
    await db.query(
      "UPDATE PRODUCTOS SET nombre = ?, categoria = ?, laboratorio = ? , precio = ?, unidad_venta = ?, ubicacion = ?,\
    grabado_impuesto = ?, cantidad_minima = ?, cantidad = ? WHERE codigo_barras = ?",
      [
        name,
        category,
        lab,
        price,
        unitSell,
        location,
        tax,
        minQuant,
        quant,
        barCode,
      ]
    );
    res.sendStatus(200);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

export const addBatch = async (req, res) => {
  const { barCode, fecha_vencimiento, cantidad, id_proveedor } = req.body;
  const result = await db.query(
    "SELECT id_producto, cantidad FROM PRODUCTOS WHERE codigo_barras = ?",
    [barCode]
  );
  const foundProduct = await productExist(barCode);
  if (foundProduct) {
    await db.query(
      "INSERT INTO LOTES (fecha_vencimiento,cantidad,id_producto,id_proveedor) VALUES (?,?,?,?)",
      [fecha_vencimiento, cantidad, result[0].id_producto, id_proveedor]
    );

    let quantity = parseInt(result[0].cantidad) + parseInt(cantidad);

    await db.query("UPDATE PRODUCTOS SET cantidad = ? WHERE id_producto = ?", [
      quantity,
      result[0].id_producto,
    ]);
    res.sendStatus(200);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};
