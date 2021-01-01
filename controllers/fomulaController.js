const ProductService = require("../models/services/ProductServices");
function getSortType(index) {
    var sort = 0;
    switch (index) {
        case "0":
            sort = {};
            break;
        case "1":
            sort = { name: 1 };
            break;
        case "2":
            sort = { price: -1 };
            break;
        case "3":
            sort = { price: 1 };
            break;
    }
    return sort;
}
exports.index = async (req, res, next) => {
    var page = +req.query.page || 1;
    var sortIndex = req.query.sort || 0;
    var minPrice = +req.query.minPrice || 0;
    var maxPrice = +req.query.maxPrice || 100000;
    var Filter = {};

    var re = new RegExp(req.query.keyword, "i");
    req.query.keyword ? (Filter.name = { $regex: re }) : 0;
    Filter.price = { $gte: minPrice, $lte: maxPrice };
    const products = await ProductService.listPageProduct(
        page,
        process.env.ITEM_PER_PAGE,
        getSortType(sortIndex),
        Filter
    );
    res.render("pages/staff/formula", {
        page: "shop",
        products: products.docs,
        login: req.user,
        sortType: sortIndex,
        minPrice: minPrice,
        maxPrice: maxPrice,
        currentPage: products.page,
        nextPage: products.nextPage,
        prevPage: products.prevPage,
        hasNextPage: products.hasNextPage,
        hasPrevPage: products.hasPrevPage,
        totalPages: products.totalPages,
        totalProducts: products.totalDocs,
    });
};
exports.detail = async (req, res, next) => {
    const product = await ProductService.getProductByID(req.params.id);
    res.render("pages/staff/formulaDetail", { product: product });
};
