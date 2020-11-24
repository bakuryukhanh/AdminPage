const express = require("express");
const router = express.Router();
const RegisterController = require("../controllers/RegisterController");
router.get("/", RegisterController.index);
module.exports = router;
