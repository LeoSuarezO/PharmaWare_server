const express = require("express");
const router = express.Router();
const controller = require("../controllers/formats.controller");

router.post("/temp_humidity", controller.tempAndHumidity);
router.get("/temp_humidity", controller.getFormatTempHum);

module.exports = router;