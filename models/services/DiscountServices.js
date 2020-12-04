const { DiscountModel } = require("../discountModel");
const { ObjectId } = require("mongodb");
const getDiscountList = async () => {
    const list = await DiscountModel.find();
    return list;
};
const getDiscountByID = async (id) => {
    const discount = await DiscountModel.findOne({ _id: ObjectId(id) });
    return discount;
};

const deleteDiscount = async (id) => {
    const discount = await getDiscountByID(id);
    discount.remove();
};
const updateDiscount = async (id, data) => {
    const discount = await getDiscountByID(id);
    discount.name = data.name;
    discount.code = data.code;
    discount.value = data.value;
    discount.startDate = data.startDate;
    discount.endDate = data.endDate;
    await discount.save();
};
const addDiscount = async (data) => {
    const discount = new DiscountModel(data);
    await discount.save();
};
module.exports = {
    getDiscountList,
    getDiscountByID,
    addDiscount,
    updateDiscount,
    deleteDiscount,
};
