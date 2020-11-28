const { ProductModel } = require("../models/productModel");

const { ObjectID } = require("mongodb");
exports.index = async (req, res, next) => {
    const products = await ProductModel.find({});
    res.render("pages/admin/product", { products: products, page: "product" });
};
exports.getAddProduct = (req, res, next) => {
    res.render("pages/admin/productDetail");
};

exports.addProduct = async (req, res, next) => {
    const product = await new ProductModel(req.body);
    await product.save().catch((err) => console.error(err));
    res.json({ log: "success" });
};

exports.getedit = async (req, res, next) => {
    console.log(req.params.id);
    const product = await ProductModel.findOne({
        _id: ObjectID(req.params.id),
    });
    res.render("pages/admin/productDetail", {
        product: product,
        page: "product",
    });
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
    product.description = req.body.description;
    product.formula = req.body.formula;
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
