const express = require("express");
const router = express.Router();
const StaffController = require("../controllers/StaffController");
router.get("/", StaffController.index);
router.get("/add", StaffController.getAdd);
router.post("/add", StaffController.postAdd);
router.get("/edit/:id", StaffController.getEdit);
router.post("/edit/:id", StaffController.postEdit);
router.post("/remove/:id", StaffController.remove);
module.exports = router;
