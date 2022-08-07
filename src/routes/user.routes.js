const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/authjwt");

router.post("/create_user", [verifyToken], controller.createUser);

module.exports = router;
