const express = require("express");
const bodyparser = require("body-parser");

const PORT = process.env.port || 3000;

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json);


// app.use('/offer',require('./routes/products.routes'));
// app.use('/offer',require('./routes/lot.routes'));
// app.use('/user',require('./routes/user.routes'));
// app.use('/auth',require('./routes/auth.routes'));

module.exports = app;  