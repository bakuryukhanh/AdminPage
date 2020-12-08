const { ProductModel } = require("../productModel");
const { mongoose } = require("../mongoose");
const getProductList = async () => {
    const list = await ProductModel.find();
    return list;
};

const updateProduct = async (id, data) => {
    const product = await getProductByID(id);
    console.log(product);
    product.name = data.name;
    product.price = data.price;
    data.imgSrc
        ? (product.imgSrc = data.imgSrc)
        : (product.imgSrc = product.imgSrc);
    product.type = data.type;
    product.more = data.more;
    product.description = data.description;
    product.formula = data.formula;
    console.log(product);
    await product.save();
};
const getProductByID = async (id) => {
    const product = await ProductModel.findOne({
        _id: mongoose.mongo.ObjectId(id),
    });
    return product;
};
const deleteProduct = async (id) => {
    const product = await getProductByID(id);
    product.remove();
};
const addProduct = async (data) => {
    const newProduct = new ProductModel(data);
    await newProduct.save();
};
const listPageProduct = async (page, itemPerPage, sort = {}, filter = {}) => {
    const options = {
        page: page,
        limit: itemPerPage,
        sort: sort,
    };
    console.log(filter);
    var products = await ProductModel.paginate(filter, options).catch((err) =>
        console.log(err)
    );
    return products;
};

module.exports = {
    getProductList,
    getProductByID,
    updateProduct,
    deleteProduct,
    addProduct,
    listPageProduct,
};
