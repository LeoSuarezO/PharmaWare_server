const mysql = require("mysql2");

var db = mysql.createConnection({
  host: "bkr8uzegu9z4k52mgvt3-mysql.services.clever-cloud.com",
  user: "u24sbkla20yreep0",
  password: "mW8vDttJLo7NGu4oy6nZ",
  database: "bkr8uzegu9z4k52mgvt3",
  uri: "mysql://u24sbkla20yreep0:mW8vDttJLo7NGu4oy6nZ@bkr8uzegu9z4k52mgvt3-mysql.services.clever-cloud.com:3306/bkr8uzegu9z4k52mgvt3",
});

//Chek connect.
db.connect((error) => {
  if (error) throw error;
  console.log("Database server running...");
});

const tables = db.query("show tables", (err, data) => {
  console.log(data);
});

module.exports = db;
