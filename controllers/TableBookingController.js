const { TableBookingModel } = require("../models/TableBookingModel");
exports.index = async (req, res, next) => {
    const TableBookingList = await TableBookingModel.find();
    console.log(TableBookingList);

    res.render("pages/staff/TableBooking", {
        page: "table-booking",
        bookingOrders: TableBookingList,
    });
};
