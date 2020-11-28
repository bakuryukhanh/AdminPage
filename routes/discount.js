const express = require("express");
const { authUser, authAdmin } = require("../authorize/authUser");
const router = express.Router();
const DiscountController = require("../controllers/DiscountController");
router.get("/", authUser, authAdmin, DiscountController.index);
router.get("/add", authUser, authAdmin, DiscountController.getAdd);
router.post("/add", authUser, authAdmin, DiscountController.postAdd);
router.get("/edit/:id", authUser, authAdmin, DiscountController.getEdit);
router.post("/edit/:id", authUser, authAdmin, DiscountController.postEdit);
router.post("/remove/:id", authUser, authAdmin, DiscountController.remove);
module.exports = router;
