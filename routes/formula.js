const express = require("express");
const router = express.Router();
const formulaController = require("../controllers/fomulaController");
router.get("/", formulaController.index);
router.get("/view/:id", formulaController.detail);

module.exports = router;
