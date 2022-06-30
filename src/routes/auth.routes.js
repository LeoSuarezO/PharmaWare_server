const express = require("express");
const router = express.Router();
const controller = require('../controllers/auth.controller')
const { verifyReg } = require("../middlewares");


router.post("/login", controller.login);

router.post("/register", [verifyReg.checkExist], controller.register);

module.exports = router;