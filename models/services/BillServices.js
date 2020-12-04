const { BillModel } = require("../billModel");
const { ObjectId } = require("mongodb");

const BillList = async () => {
    const billList = await BillModel.find({}).lean();
    return billList;
};

const getBillByID = async (id) => {
    const bill = await BillModel.find({ _id: ObjectId(id) }).lean();
    return bill;
};

const saveBill = async (bill) => {
    const newBill = new BillModel(bill);
    await newBill.save();
};

exports = { BillList, getBillByID, saveBill };
