const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/LoginController");
router.get("/", LoginController.index);
router.post("/", LoginController.login);
module.exports = router;
