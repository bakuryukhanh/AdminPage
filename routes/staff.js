const express = require("express");
const router = express.Router();
const StaffController = require("../controllers/StaffController");
router.get("/", StaffController.index);
module.exports = router;
