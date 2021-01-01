const StaffService = require("../models/services/StaffServices");
exports.index = async (req, res, next) => {
    if (!req.user) {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    if (req.user.role != "manager") {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    var staffs = await StaffService.getStaffList();
    res.render("pages/admin/staffs", { staff: staffs, page: "staff" });
};
exports.getAdd = async (req, res, next) => {
    if (!req.user) {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    if (req.user.role != "manager") {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    res.render("pages/admin/staffDetail", { page: "staff" });
};
exports.getEdit = async (req, res, next) => {
    if (!req.user) {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    if (req.user.role != "manager") {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    const staff = await StaffService.getStaffById(req.params.id);
    res.render("pages/admin/updateStaff", { staff: staff, page: "staff" });
};
exports.remove = async (req, res, next) => {
    await StaffService.deleteStaff(req.params.id);
    res.json({ log: "success" });
};
