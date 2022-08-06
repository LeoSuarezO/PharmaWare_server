import db from "../database";

export const tempAndHumidity = async (req, res) =>{
    const {id, temperature, humidity, date} = req.body;
    await db.query("INSERT INTO REGIST_TEMP_HUMED(id_regis_tem_humed, temperatura, humedad, fecha, id_formato) VALUES (?, ?, ?, ?, 1)", [id, temperature, humidity, date])
    const result = await db.query("SELECT * FROM REGIST_TEMP_HUMED");
    console.log(result);
    res.sendStatus(200);
}

// export const createFormat = async (name, user) =>{
//     await db.query ("INSERT INTO FORMATOS(id_formato, nombre, id_usuario), VALUES (1, ?, ?)", [name, user]);
//     // const result = await db.query("SELECT id_formato"
// }