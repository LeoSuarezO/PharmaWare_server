const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const { isAdmin } = require("../middlewares/authjwt");

router.post("/create_user", [isAdmin], controller.createUser);

module.exports = router;
