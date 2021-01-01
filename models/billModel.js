const { mongoose } = require("./mongoose");
const billSchema = new mongoose.Schema({
    customerName: String,
    customerAddress: String,
    customerPhone: String,
    customerEmail: String,
    date: String,
    productList: Array,
    discountCode: String,
    shipping: Number,
    total: Number,
    status: String,
});

let billModel = mongoose.model("bills", billSchema);

exports.BillModel = billModel;
