const express = require("express");
const { authUser } = require("../authorize/authUser");
const router = express.Router();
const DrinkOrderController = require("../controllers/DrinkOrderController");
router.get("/", authUser, DrinkOrderController.index);
router.get("/detail/:id", authUser, DrinkOrderController.detail);

module.exports = router;
