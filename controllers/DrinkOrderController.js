const { BillModel } = require("../models/billModel");
const { ObjectID } = require("mongodb");
const { DiscountModel } = require("../models/discountModel");

exports.index = async (req, res, next) => {
    const bills = await BillModel.find();

    res.render("pages/staff/drinkOrder", { bills: bills });
};
exports.detail = async (req, res, next) => {
    const bill = await BillModel.findOne({
        _id: ObjectID(req.params.id),
    });
    const discountValue = await DiscountModel.findOne({
        code: bill.discountCode,
    });
    bill.discountValue = discountValue.value;
    console.log(bill.discountValue);
    res.render("pages/staff/drinkOrderDetail", { bill: bill });
};
