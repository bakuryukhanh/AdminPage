const { mongoose } = require("./mongoose");
const billSchema = new mongoose.Schema({
    customerName: String,
    customerAddress: String,
    customerPhone: String,
    customerEmail: String,
    productList: Array,
    state: String,
});

let billModel = mongoose.model("bills", billSchema);

exports.BillModel = billModel;
