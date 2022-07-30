const express = require("express");
const router = express.Router();
const controller = require('../controllers/report.controller')

router.get('/daily', controller.dailyReport)
router.get('/monthly', controller.monthlyReport)
router.get('/anual', controller.anualReport)

module.exports = router