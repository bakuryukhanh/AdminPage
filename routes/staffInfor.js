const express = require("express");
const { authUser } = require("../authorize/authUser");
const router = express.Router();
const staffInforController = require("../controllers/staffInforController");
router.get("/", authUser, staffInforController.index);
router.get("/edit", authUser, staffInforController.getUpdateInfor);
router.post("/edit", authUser, staffInforController.postUpdateInfor);
module.exports = router;
