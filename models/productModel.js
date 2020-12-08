const { mongoose } = require("./mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const productsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    imgSrc: String,
    type: String,
    more: String,
    description: String,
    formula: String,
});
productsSchema.plugin(mongoosePaginate);
productsSchema.index({ name: "text" });
let productModel = mongoose.model("product", productsSchema);

exports.ProductModel = productModel;
