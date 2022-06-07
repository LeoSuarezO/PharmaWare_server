const express = require("express");
const mysql = require("mysql2");

const bodyparser = require("body-parser");

const PORT = process.env.port || 3000;

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json);

var connection = mysql.createConnection({
  host: "bkr8uzegu9z4k52mgvt3-mysql.services.clever-cloud.com",
  user: "u24sbkla20yreep0",
  password: "mW8vDttJLo7NGu4oy6nZ",
  database: "bkr8uzegu9z4k52mgvt3",
  uri: "mysql://u24sbkla20yreep0:mW8vDttJLo7NGu4oy6nZ@bkr8uzegu9z4k52mgvt3-mysql.services.clever-cloud.com:3306/bkr8uzegu9z4k52mgvt3"
});

//Chek connect.
connection.connect((error) => {
  if (error) throw error;
  console.log("Database server running...");
});

const tables = connection.query("show tables",(err, data)=>{
    console.log(data)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
