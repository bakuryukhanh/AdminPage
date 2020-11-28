const express = require("express");
const { authUser, authAdmin } = require("../authorize/authUser");
const router = express.Router();
const homeController = require("../controllers/HomeController");
router.get("/", authUser, authAdmin, homeController.index);
module.exports = router;
