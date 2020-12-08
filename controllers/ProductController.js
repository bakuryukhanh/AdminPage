const formidable = require("formidable");
const ProductServices = require("../models/services/ProductServices");
const { uploadImg } = require("../models/services/uploadImgService");

exports.index = async (req, res, next) => {
    const products = await ProductServices.getProductList();
    res.render("pages/admin/product", { products: products, page: "product" });
};
exports.getAddProduct = (req, res, next) => {
    res.render("pages/admin/productDetail");
};

exports.addProduct = async (req, res, next) => {
    const form = formidable({ multiples: true });
    var product;
    await form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }

        if (files.imgSrc && files.imgSrc.size > 0) {
            await uploadImg(files.imgSrc.path).then(
                (url) => (fields.imgSrc = url)
            );
        } else {
            fields.imgSrc =
                "https://lallahoriye.com.tirzee.com/wp-content/uploads/2019/04/Product_Lg_Type.jpg";
        }
        product = fields;
        await ProductServices.addProduct(product);
        res.json({ log: "success" });
    });
};

exports.getedit = async (req, res, next) => {
    console.log(req.params.id);
    const product = await ProductServices.getProductByID(req.params.id);
    res.render("pages/admin/productDetail", {
        product: product,
        page: "product",
    });
};
exports.postedit = async (req, res, next) => {
    const form = formidable({ multiples: true });
    var product;
    await form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        if (files.imgSrc && files.imgSrc.size > 0) {
            await uploadImg(files.imgSrc.path).then(
                (url) => (fields.imgSrc = url)
            );
        }
        product = fields;
        console.log(product);
        await ProductServices.updateProduct(req.params.id, product);
        res.json({ log: "success" });
    });
};
exports.remove = async (req, res, next) => {
    await ProductServices.deleteProduct(req.params.id);
    res.json({ log: "success" });
};
