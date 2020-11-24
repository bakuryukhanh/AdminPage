const express = require("express");
const router = express.Router();
const ChartController = require("../controllers/ChartController");
router.get("/", ChartController.index);
module.exports = router;
