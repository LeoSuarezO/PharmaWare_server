const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors"); 

app.set("port", process.env.port || 3001);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));


//Routes
app.use('/auth',require('./routes/auth.routes'));
app.use('/inventory', require('./routes/inventory.routes'));
app.use('/report', require('./routes/report.routes'));
app.use('/formats', require('./routes/formats.routes'));

module.exports = app;
