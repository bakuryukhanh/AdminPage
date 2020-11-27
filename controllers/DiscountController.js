const { DiscountModel } = require("../models/discountModel");
const { ObjectID } = require("mongodb");

exports.index = async (req, res, next) => {
    const discounts = await DiscountModel.find({});
    await res.render("discount", { discounts: discounts });
};
exports.getAdd = async (req, res, next) => {
    res.render("discountDetail");
};
exports.postAdd = async (req, res, next) => {
    const discount = await DiscountModel(req.body);
    await discount.save().catch((err) => {
        res.json(err);
        console.log(err);
    });
    res.json({ log: "success" });
};
exports.getEdit = async (req, res, next) => {
    const discount = await DiscountModel.findOne({
        _id: ObjectID(req.params.id),
    });
    res.render("discountDetail", { discount: discount });
};
exports.postEdit = async (req, res, next) => {
    console.log(req.params.id);
    const discount = await DiscountModel.findOne({
        _id: ObjectID(req.params.id),
    });

    discount.name = req.body.name;
    discount.code = req.body.code;
    discount.value = req.body.value;
    discount.startDate = req.body.startDate;
    discount.endDate = req.body.endDate;

    discount
        .save()
        .then(res.json({ log: "success" }))

        .catch((err) => console.error(err));
};
exports.remove = async (req, res, next) => {
    const discount = await DiscountModel.deleteOne({
        _id: ObjectID(req.params.id),
    });
    res.json({ log: "success" });
};
