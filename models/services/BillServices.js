const { BillModel } = require("../billModel");
const { ObjectId } = require("mongodb");
const moment = require("moment");

const BillList = async () => {
    const billList = await BillModel.find({}).catch((err) => {
        throw new Error("Get bill failed");
    });
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
const getTotalByMonths = async () => {
    const bills = await BillModel.find({}).catch((err) => {
        throw new Error("Get bill list failed!!");
    });
    var today = moment();
    arrLength = today.month();
    var months = Array(arrLength + 1);
    for (let i = 0; i < arrLength + 1; i++) {
        months[i] = {};
        months[i].total = 0;
        months[i].label = moment(i + 1, "MM").format("MMMM");
    }
    console.log(bills.length);
    bills.forEach((bill) => {
        if (moment(bill.date, "DD/MM/YYYY").year() == today.year()) {
            var month = moment(bill.date, "DD/MM/YYYY").month();
            months[month].total += bill.total;
        }
    });
    console.log(months);
    return months;
};
const getTotalByDays = async () => {
    const bills = await BillModel.find({}).catch((err) => {
        throw err;
    });

    var today = moment();
    arrLength = today.date();
    var days = Array(arrLength + 1);
    for (let i = 0; i < arrLength + 1; i++) {
        days[i] = {};
        days[i].label = i + 1;
        days[i].total = 0;
    }
    bills.forEach((bill) => {
        if (
            (moment(bill.date, "DD/MM/YYYY").month() == today.month()) &
            (moment(bill.date, "DD/MM/YYYY").year() == today.year())
        ) {
            var billDay = moment(bill.date, "DD/MM/YYYY").date();
            days[billDay].total += bill.total;
        }
    });
    return days;
};
const getDrinkStatistic = async () => {
    const bills = await BillModel.find({}).catch((err) => {
        throw err;
    });
    var productArray = [];
    var saleArray = [];
    bills.forEach((bill) => {
        var products = bill.productList;
        products.forEach((product) => {
            if (productArray.includes(product.name)) {
                var index = productArray.indexOf(product.name);
                saleArray[index] += product.quantity;
            } else {
                productArray.push(product.name);
                saleArray.push(product.quantity);
            }
        });
    });

    return { productArray, saleArray };
};

module.exports = {
    BillList,
    getBillByID,
    saveBill,
    getTotalByMonths,
    getTotalByDays,
    getDrinkStatistic,
};
