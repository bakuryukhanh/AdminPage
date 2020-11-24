const { DiscountModel } = require("../models/discountModel");
exports.index = async (req, res, next) => {
    const discounts = await DiscountModel.find({});
    await res.render("discount", { discounts: discounts });
};
