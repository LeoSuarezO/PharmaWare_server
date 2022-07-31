const express = require("express");
const router = express.Router();
const controller = require('../controllers/report.controller')

router.post('/daily', controller.dailyReport)
router.post('/monthly', controller.monthlyReport)
router.post('/anual', controller.anualReport)

module.exports = router
