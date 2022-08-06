const express = require("express");
const router = express.Router();
const controller = require("../controllers/formats.controller");

router.post("/temp_humidity", controller.tempAndHumidity);

module.exports = router;