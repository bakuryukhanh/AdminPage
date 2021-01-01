const DiscountServices = require("../models/services/DiscountServices");
exports.index = async (req, res, next) => {
    if (!req.user) {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    if (req.user.role != "manager") {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    const discounts = await DiscountServices.getDiscountList();
    await res.render("pages/admin/discount", {
        discounts: discounts,
        page: "discount",
    });
};
exports.getAdd = async (req, res, next) => {
    if (!req.user) {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    if (req.user.role != "manager") {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    res.render("pages/admin/discountDetail", { page: "discount" });
};
exports.postAdd = async (req, res, next) => {
    if (!req.user) {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    if (req.user.role != "manager") {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    await DiscountServices.addDiscount(req.body);
    res.json({ log: "success" });
};
exports.getEdit = async (req, res, next) => {
    if (!req.user) {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    if (req.user.role != "manager") {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    const discount = await DiscountServices.getDiscountByID(req.params.id);
    res.render("pages/admin/discountDetail", {
        discount: discount,
        page: "discount",
    });
};
exports.postEdit = async (req, res, next) => {
    if (!req.user) {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    if (req.user.role != "manager") {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    await DiscountServices.updateDiscount(
        req.params.id,
        req.body
    ).catch((err) => res.json(err));
    res.json({ log: "success" });
};
exports.remove = async (req, res, next) => {
    if (!req.user) {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    if (req.user.role != "manager") {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    await DiscountServices.deleteDiscount(req.params.id);
    res.json({ log: "success" });
};
