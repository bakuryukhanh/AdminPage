const express = require("express");
const router = express.Router();
const DiscountController = require("../controllers/DiscountController");
router.get("/", DiscountController.index);
module.exports = router;
