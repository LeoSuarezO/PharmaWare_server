import db from "../database";

export const tempAndHumidity = async (req, res) => {
  const { temperature, humidity, date } = req.body;
  const result = await db.query(
    "SELECT * FROM REGIST_TEMP_HUMED WHERE fecha = CAST(? AS DATE)",
    [date]
  );
  if (!result[0]) {
    await db.query(
      "INSERT INTO REGIST_TEMP_HUMED(temperatura, humedad, fecha, id_formato) VALUES (?, ?, ?, 1)",
      [temperature, humidity, date]
    );
    res.sendStatus(200);
  }else{
    res.status(400).json({message: "The daily form has already been completed"})
  }
};

export const getFormatTempHum = async (req, res) => {
  const { initDate, endDate } = req.body;

  const result = await db.query(
    "SELECT * FROM REGIST_TEMP_HUMED WHERE fecha >= CAST(? AS DATE) AND fecha < CAST(? AS DATE)",
    [initDate, endDate]
  );
  res.status(200).json(result);
};

// export const createFormat = async (name, user) =>{
//     await db.query ("INSERT INTO FORMATOS(id_formato, nombre, id_usuario), VALUES (1, ?, ?)", [name, user]);
//     // const result = await db.query("SELECT id_formato"
// }
