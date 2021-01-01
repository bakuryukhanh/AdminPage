const { getStaffList } = require("../models/services/StaffServices");
const moment = require("moment");
exports.index = async (req, res, next) => {
    if (!req.user) {
        res.status(401);
        return res.redirect("/login");
    }
    if (req.user.role != "manager") {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    var staffs = await getStaffList();
    res.render("pages/admin/home", {
        staff: staffs,
        page: "dashboard",
    });
};
