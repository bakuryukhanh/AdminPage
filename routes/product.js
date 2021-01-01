const express = require("express");

const router = express.Router();
const ProductController = require("../controllers/ProductController");
router.get("/", ProductController.index);
router.get("/add", ProductController.getAddProduct);
router.post("/add", ProductController.addProduct);
router.get("/edit/:id", ProductController.getEdit);
router.post("/edit/:id", ProductController.postEdit);
router.post("/remove/:id", ProductController.remove);
module.exports = router;
