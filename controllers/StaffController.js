const StaffService = require("../models/services/StaffServices");
const moment = require("moment");
exports.index = async (req, res, next) => {
    var staffs = await StaffService.getStaffList();
    res.render("pages/admin/staffs", { staff: staffs, page: "staff" });
};

exports.getAdd = async (req, res, next) => {
    res.render("pages/admin/staffDetail", { page: "staff" });
};

exports.postAdd = async (req, res, next) => {
    StaffService.addStaff(req.boby).catch((err) => res.json(err));
    res.json({ log: "success" });
};

exports.getEdit = async (req, res, next) => {
    const staff = await StaffService.getStaffById(req.params.id);
    res.render("pages/admin/staffDetail", { staff: staff, page: "staff" });
};

exports.postEdit = async (req, res, next) => {
    await StaffService.updateStaff(req.params.id, req.body).catch((err) => {
        res.json(err);
    });
    res.json({ log: "success" });
};

exports.remove = async (req, res, next) => {
    await StaffService.deleteStaff(req.params.id);
    res.json({ log: "success" });
};
