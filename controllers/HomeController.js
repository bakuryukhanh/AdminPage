const { StaffModel } = require("../models/staffModel");
const moment = require("moment");
exports.index = async (req, res, next) => {
    var staffs = await StaffModel.find({}).map((staffs) => {
        staffs.forEach((staff) => {
            staff.age =
                moment().year() - moment(staff.birthday, "DD/MM/YYYY").year();
        });
        return staffs;
    });
    res.render("pages/admin/home", {
        staff: staffs,
        page: "dashboard",
    });
};
