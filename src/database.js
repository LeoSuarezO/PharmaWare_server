const mysql = require("mysql2");
const { promisify } = require('util');
const { database } = require("./keys");

const db = mysql.createPool(database);

db.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("DATABASE HAS TO MANY CONNECTONS");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("DATABASE CONNECTION WAS REFUSED");
    }
  }
  if (connection) connection.release();
  console.log("DB is Connected");
  return;
});

db.query = promisify(db.query);

module.exports = db
