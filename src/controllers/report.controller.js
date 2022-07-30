import db from "../database";

export const anualReport = async (req, res) => {
    const date = req.body.date;
    const result = await db.query(
      `SELECT DN.total total19, CN.total total5, CR.total total0 FROM
      (SELECT SUM(I.valor_total) total
      FROM bkr8uzegu9z4k52mgvt3.VENTAS V,  bkr8uzegu9z4k52mgvt3.ITEM_VENTA I, bkr8uzegu9z4k52mgvt3.PRODUCTOS P
      WHERE DATE_FORMAT(V.fecha, '%Y') = ?
      AND I.id_venta = V.id_venta
      AND I.id_producto = P.id_producto
      AND P.grabado_impuesto = 19) DN,
      (SELECT SUM(I.valor_total) total
      FROM bkr8uzegu9z4k52mgvt3.VENTAS V,  bkr8uzegu9z4k52mgvt3.ITEM_VENTA I, bkr8uzegu9z4k52mgvt3.PRODUCTOS P
      WHERE DATE_FORMAT(V.fecha, '%Y') = ?
      AND I.id_venta = V.id_venta
      AND I.id_producto = P.id_producto
      AND P.grabado_impuesto = 5) CN,
      (SELECT SUM(I.valor_total) total
      FROM bkr8uzegu9z4k52mgvt3.VENTAS V,  bkr8uzegu9z4k52mgvt3.ITEM_VENTA I, bkr8uzegu9z4k52mgvt3.PRODUCTOS P
      WHERE DATE_FORMAT(V.fecha, '%Y') = ?
      AND I.id_venta = V.id_venta
      AND I.id_producto = P.id_producto
      AND P.grabado_impuesto = 0) CR`,
      [date, date, date]
    );
    if (result[0]) {
      res.status(200).json(result[0]);
    } else {
      res.status(409).json({ message: "Report failure" });
    }
};

export const monthlyReport = async (req, res) => {
  const date = req.body.date;
  const result = await db.query(
    `SELECT DN.total total19, CN.total total5, CR.total total0 FROM
    (SELECT SUM(I.valor_total) total
    FROM bkr8uzegu9z4k52mgvt3.VENTAS V,  bkr8uzegu9z4k52mgvt3.ITEM_VENTA I, bkr8uzegu9z4k52mgvt3.PRODUCTOS P
    WHERE DATE_FORMAT(V.fecha, '%m-%Y') = ?
    AND I.id_venta = V.id_venta
    AND I.id_producto = P.id_producto
    AND P.grabado_impuesto = 19) DN,
    (SELECT SUM(I.valor_total) total
    FROM bkr8uzegu9z4k52mgvt3.VENTAS V,  bkr8uzegu9z4k52mgvt3.ITEM_VENTA I, bkr8uzegu9z4k52mgvt3.PRODUCTOS P
    WHERE DATE_FORMAT(V.fecha, '%m-%Y') = ?
    AND I.id_venta = V.id_venta
    AND I.id_producto = P.id_producto
    AND P.grabado_impuesto = 5) CN,
    (SELECT SUM(I.valor_total) total
    FROM bkr8uzegu9z4k52mgvt3.VENTAS V,  bkr8uzegu9z4k52mgvt3.ITEM_VENTA I, bkr8uzegu9z4k52mgvt3.PRODUCTOS P
    WHERE DATE_FORMAT(V.fecha, '%m-%Y') = ?
    AND I.id_venta = V.id_venta
    AND I.id_producto = P.id_producto
    AND P.grabado_impuesto = 0) CR`,
    [date, date, date]
  );
  if (result[0]) {
    res.status(200).json(result[0]);
  } else {
    res.status(409).json({ message: "Report failure" });
  }
};

export const dailyReport = async (req, res) => {
    const date = req.body.date;
  const result = await db.query(
    `SELECT DN.total total19, CN.total total5, CR.total total0 FROM
    (SELECT SUM(I.valor_total) total
    FROM bkr8uzegu9z4k52mgvt3.VENTAS V,  bkr8uzegu9z4k52mgvt3.ITEM_VENTA I, bkr8uzegu9z4k52mgvt3.PRODUCTOS P
    WHERE DATE_FORMAT(V.fecha, 'd%-%m-%Y') = ?
    AND I.id_venta = V.id_venta
    AND I.id_producto = P.id_producto
    AND P.grabado_impuesto = 19) DN,
    (SELECT SUM(I.valor_total) total
    FROM bkr8uzegu9z4k52mgvt3.VENTAS V,  bkr8uzegu9z4k52mgvt3.ITEM_VENTA I, bkr8uzegu9z4k52mgvt3.PRODUCTOS P
    WHERE DATE_FORMAT(V.fecha, 'd%-%m-%Y') = ?
    AND I.id_venta = V.id_venta
    AND I.id_producto = P.id_producto
    AND P.grabado_impuesto = 5) CN,
    (SELECT SUM(I.valor_total) total
    FROM bkr8uzegu9z4k52mgvt3.VENTAS V,  bkr8uzegu9z4k52mgvt3.ITEM_VENTA I, bkr8uzegu9z4k52mgvt3.PRODUCTOS P
    WHERE DATE_FORMAT(V.fecha, 'd%-%m-%Y') = ?
    AND I.id_venta = V.id_venta
    AND I.id_producto = P.id_producto
    AND P.grabado_impuesto = 0) CR`,
    [date, date, date]
  );
  if (result[0]) {
    res.status(200).json(result[0]);
  } else {
    res.status(409).json({ message: "Report failure" });
  }
};
