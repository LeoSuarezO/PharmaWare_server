const express = require("express");
const router = express.Router();
const controller = require('../controllers/user.controller')


router.post("/create_user", controller.createUser);

module.exports = router;