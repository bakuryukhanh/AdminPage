const { ProductModel } = require("../productModel");
const { ObjectId } = require("mongodb");

const getProductList = async () => {
    const list = await ProductModel.find();
    return list;
};

const updateProduct = async (id, data) => {
    const product = await getProductByID(id);
    product.name = data.name;
    product.price = data.price;
    product.imgSrc = data.imgSrc;
    product.type = data.type;
    product.more = data.more;
    product.description = data.description;
    product.formula = data.formula;
    await product.save();
};
const getProductByID = async (id) => {
    const product = await ProductModel.findOne({ _id: ObjectId(id) });
    return product;
};
const deleteProduct = async (id) => {
    const product = await getProductByID(id);
    product.remove();
};
const addProduct = async (data) => {
    const newProduct = ProductModel(data);
    await newProduct.save();
};
module.exports = {
    getProductList,
    getProductByID,
    updateProduct,
    deleteProduct,
    addProduct,
};
