const express = require("express");
const { authUser } = require("../authorize/authUser");
const router = express.Router();
const formulaController = require("../controllers/fomulaController");
router.get("/", authUser, formulaController.index);
router.get("/view/:id", authUser, formulaController.detail);

module.exports = router;
