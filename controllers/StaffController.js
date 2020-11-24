const { StaffModel } = require("../models/staffModel");
exports.index = async (req, res, next) => {
    const staffs = await StaffModel.find({});
    await res.render("staffs", { staff: staffs });
};
