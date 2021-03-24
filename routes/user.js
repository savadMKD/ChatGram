var express = require("express");
const authController = require("../app/http/controllers/authController");
const homeController = require("../app/http/controllers/homeController");
var router = express.Router();

router.get("/", homeController().home);
router.get("/register", authController().doRegister);
router.get("/login", authController().doLogin);

module.exports = router;
