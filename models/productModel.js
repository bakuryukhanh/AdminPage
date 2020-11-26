const { mongoose } = require("./mongoose");
const productsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    imgSrc: String,
    type: String,
    more: String,
});
let productModel = mongoose.model("product", productsSchema);

exports.ProductModel = productModel;
