const { ProductModel } = require("../models/productModel");
const { ObjectID } = require("mongodb");

exports.index = async (req, res, next) => {
    const products = await ProductModel.find();
    res.render("pages/staff/formula", { products: products });
};
exports.detail = async (req, res, next) => {
    const product = await ProductModel.findOne({
        _id: ObjectID(req.params.id),
    });
    res.render("pages/staff/formulaDetail", { product: product });
};
