const express = require('express');
const mysql = require('mysql');

const bodyparser = require('body-parser');

const PORT = process.env.port || 3080;

const app = express();

app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json);

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'my_db'
  });

  connection.connect();

  //Chek connect.
  connection.connect(error => {
      if(error) throw error;
      console.log('Database server running...')
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

