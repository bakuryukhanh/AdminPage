const express = require("express");
const router = express.Router();
const StaffController = require("../controllers/StaffController");
router.get("/", StaffController.index);
router.get("/add", StaffController.getAdd);
router.get("/edit/:id", StaffController.getEdit);
module.exports = router;
