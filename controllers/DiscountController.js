const DiscountServices = require("../models/services/DiscountServices");
exports.index = async (req, res, next) => {
    const discounts = await DiscountServices.getDiscountList();
    await res.render("pages/admin/discount", {
        discounts: discounts,
        page: "discount",
    });
};
exports.getAdd = async (req, res, next) => {
    res.render("pages/admin/discountDetail", { page: "discount" });
};
exports.postAdd = async (req, res, next) => {
    await DiscountServices.addDiscount(req.body);
    res.json({ log: "success" });
};
exports.getEdit = async (req, res, next) => {
    const discount = await DiscountServices.getDiscountByID(req.params.id);
    res.render("pages/admin/discountDetail", {
        discount: discount,
        page: "discount",
    });
};
exports.postEdit = async (req, res, next) => {
    await DiscountServices.updateDiscount(
        req.params.id,
        req.body
    ).catch((err) => res.json(err));
    res.json({ log: "success" });
};
exports.remove = async (req, res, next) => {
    await DiscountServices.deleteDiscount(req.params.id);
    res.json({ log: "success" });
};
