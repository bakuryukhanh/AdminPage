const { getStaffList } = require("../models/services/StaffServices");
const moment = require("moment");
exports.index = async (req, res, next) => {
    var staffs = await getStaffList();
    res.render("pages/admin/home", {
        staff: staffs,
        page: "dashboard",
    });
};
