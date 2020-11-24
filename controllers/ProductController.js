const { ProductModel } = require("../models/productModel");
exports.index = async (req, res, next) => {
    const products = await ProductModel.find({});
    await res.render("product", { products: products });
};
