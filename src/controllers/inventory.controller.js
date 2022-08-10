import { contentSecurityPolicy } from "helmet";
import db from "../database";

export const getProductList = async (req, res) => {
  const result = await db.query("SELECT * FROM PRODUCTOS");
  console.log(users);
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
  if (result[0]) res.status(200).json(result);
  else res.status(404).json({ message: "Product not found" });
};

export const serachByCategory = async (req, res) => {
  const result = await db.query(
    "SELECT * FROM PRODUCTOS WHERE LOWER(categoria) = LOWER(?)",
    [req.body.category]
  );
  if (result[0]) res.status(200).json(result);
  else res.status(404).json({ message: "Product not found" });
};

export const deleteProduct = async (req, res) => {
  const foundProduct = await productExist(req.body.barCode);
  if (foundProduct) {
    await db.query("DELETE FROM PRODUCTOS WHERE codigo_barras = ?", [
      req.body.barCode,
    ]);
    res.sendStatus(200);
  } else {
    res.status(404).json({ message: "Product not found" });
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

export const sales = async (req, res) => {
  const { products } = req.body;
  const last_sale = await createSale(req);
  createItems(products, last_sale, res);
};

async function createSale(req) {
  const { date, total, user, client } = req.body;
  console.log("fecha que ingresa: " + req.body.date);
  await db.query(
    "INSERT INTO VENTAS (fecha, valor_total, id_usuario, id_cliente) VALUES (?,?,?,?)",
    [date, total, user, client]
  );

  const last_id = await db.query("SELECT MAX(id_venta) AS sale FROM VENTAS");
  return last_id[0].sale;
}

function createItems(products, sale, res) {
  products.forEach(async (element) => {
    const result = await db.query(
      "SELECT id_producto, cantidad FROM PRODUCTOS WHERE id_producto = ?",
      [element.product]
    );

    let quantity = parseInt(result[0].cantidad) - parseInt(element.quantity);

    if (quantity >= 0) {
      await db.query(
        "INSERT INTO ITEM_VENTA(id_venta, id_producto, cantidad, valor_total) VALUES (?,?,?,?)",
        [sale, element.product, element.quantity, element.total]
      );

      await db.query(
        "UPDATE PRODUCTOS SET cantidad = ? WHERE id_producto = ?",
        [quantity, result[0].id_producto]
      );
    }
  });
  res.sendStatus(200);
}

export const getPrice = async (req, res) => {
  const result = await db.query(
    "SELECT codigo_barras, precio FROM PRODUCTOS WHERE id_producto = ?",
    [req.body.id_product]
  );
  const foundProduct = await productExist(result[0].codigo_barras);
  if (foundProduct) res.status(200).json(parseInt(result[0].precio));
  else res.sendStatus(400).json({ message: "Product not found" });
};

export const updatePrice = async (req, res) => {
  const { id_product, price } = req.body;
  await db.query("UPDATE PRODUCTOS SET precio = ? WHERE id_producto = ?", [
    price,
    id_product,
  ]);
  res.sendStatus(200);
};

export const getReceipt = async (req, res) => {
  const result = await db.query(
    "SELECT * FROM VENTAS WHERE fecha = date_format(?, '%Y-%m-%d')",
    [req.body.date]
  );
  res.status(200).json(result);
};

export const getItemSale = async (req, res) => {
  const result = await db.query(
    "SELECT V.id_venta, P.nombre, I.id_producto, I.cantidad, I.valor_total FROM VENTAS V, ITEM_VENTA I, PRODUCTOS P WHERE I.id_venta = V.id_venta AND V.id_venta = ? AND P.id_producto = I.id_producto",
    [req.body.saleId]
  );
  res.json(result);
};

export const getName = async (productId) => {
  const result = db.query(
    "SELECT nombre FROM PRODUCTOS WHERE id_producto = ?",
    [productId]
  );
  return result;
};

export const getInfoProduct = async (req, res) => {
  const result = await db.query(
    "SELECT nombre, precio, unidad_venta, ubicacion FROM PRODUCTOS WHERE id_producto = ?",
    [req.body.id_product]
  );
  if (result[0]) res.status(200).json(result);
  else res.status(404).json({ message: "Product not found" });
};

export const createSupplier = async (req, res) => {
  const name = req.body.name;
  const result = await db.query(
    "SELECT id_proveedor FROM PROVEEDORES WHERE LOWER(nombre) = LOWER(?)",
    [name]
  );
  if (result[0]) {
    res.status(409).json({ message: "Supplier already exists" });
  } else {
    await db.query("INSERT INTO PROVEEDORES (nombre) VALUES (?)", [name]);
    res.sendStatus(200);
  }
};

export const getSupplier = async (req, res) => {
  const result = await db.query("SELECT id_proveedor, nombre FROM PROVEEDORES");
  res.status(200).json(result);
};

export const getBatch = async (req, res) => {
  const result = await db.query("SELECT * FROM LOTES WHERE id_producto = ?", [
    req.body.idProduct,
  ]);
  if (result[0]) res.status(200).json(result);
  else res.status(404).json({ message: "Product not found" });
};

export const deleteBatch = async (req, res) => {
  const result = await db.query("DELETE FROM LOTES WHERE id_lote = ?;", [
    req.body.idProduct,
  ]);
  if (result.affectedRows > 0)
    res.status(200).json({ message: "Batch has been removed" });
  else res.status(404).json({ message: "Batch not found" });
};

export const updateQuantity = async (req, res) => {
  const { id_product, quantity } = req.body;
  await db.query(
    "UPDATE PRODUCTOS SET cantidad = cantidad+? WHERE id_producto = ?",
    [quantity, id_product]
  );
  res.sendStatus(200);
};
