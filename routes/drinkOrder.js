const express = require("express");
const router = express.Router();
const DrinkOrderController = require("../controllers/DrinkOrderController");
router.get("/", DrinkOrderController.index);
router.get("/detail/:id", DrinkOrderController.detail);

module.exports = router;
