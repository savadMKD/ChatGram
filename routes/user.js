var express = require("express");
const authController = require("../app/http/controllers/authController");
const homeController = require("../app/http/controllers/homeController");
var router = express.Router();

router.get("/", homeController().home);

router.get("/register", authController().doRegister);
router.post("/register", authController().postRegister);

router.get("/login", authController().doLogin);
router.post("/login", authController().postLogin);

module.exports = router;
