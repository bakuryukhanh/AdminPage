const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/LoginController");
const { loginAuthenrize } = require("../authorize/authUser");
router.get("/", LoginController.index);
router.post("/", loginAuthenrize, LoginController.login);
router.get("/logout", LoginController.logout);
module.exports = router;
