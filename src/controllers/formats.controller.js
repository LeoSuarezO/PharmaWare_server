import db from "../database";

export const tempAndHumidity = async (req, res) => {
  const { temperature, humidity, date } = req.body;
  const get_id = await db.query(
    "SELECT MAX(id_regis_tem_humed) AS id FROM REGIST_TEMP_HUMED"
  );
  const id = parseInt(get_id[0].id) + 1;
  console.log(id);
  await db.query(
    "INSERT INTO REGIST_TEMP_HUMED(id_regis_tem_humed, temperatura, humedad, fecha, id_formato) VALUES (?, ?, ?, ?, 1)",
    [id, temperature, humidity, date]
  );
  res.sendStatus(200);
};

// export const createFormat = async (name, user) =>{
//     await db.query ("INSERT INTO FORMATOS(id_formato, nombre, id_usuario), VALUES (1, ?, ?)", [name, user]);
//     // const result = await db.query("SELECT id_formato"
// }
