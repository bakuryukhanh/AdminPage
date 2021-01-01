const express = require("express");
const router = express.Router();
const staffInforController = require("../controllers/staffInforController");
router.get("/", staffInforController.index);
router.get("/edit", staffInforController.getUpdateInfor);
router.post("/edit", staffInforController.postUpdateInfor);
module.exports = router;
