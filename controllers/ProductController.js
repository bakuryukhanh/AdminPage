const { ProductModel } = require("../models/productModel");

const { ObjectID } = require("mongodb");
exports.index = async (req, res, next) => {
    const products = await ProductModel.find({});
    res.render("product", { products: products });
};
exports.getAddProduct = (req, res, next) => {
    res.render("productDetail");
};

exports.addProduct = async (req, res, next) => {
    const product = await new ProductModel(req.body);
    product
        .save()
        .then(res.json({ log: "success" }))
        .catch((err) => console.error(err));
};

exports.getedit = async (req, res, next) => {
    console.log(req.params.id);
    const product = await ProductModel.findOne({
        _id: ObjectID(req.params.id),
    });
    res.render("productDetail", { product: product });
};
exports.postedit = async (req, res, next) => {
    console.log(req.params.id);
    const product = await ProductModel.findOne({
        _id: ObjectID(req.params.id),
    });
    product.name = req.body.name;
    product.price = req.body.price;
    product.imgSrc = req.body.imgSrc;
    product.type = req.body.type;
    product.more = req.body.more;
    product
        .save()
        .then(res.json({ log: "success" }))

        .catch((err) => console.error(err));
};
exports.remove = async (req, res, next) => {
    const product = await ProductModel.deleteOne({
        _id: ObjectID(req.params.id),
    }).catch((err) => console.error(err));

    res.json({ log: "success" });
};
