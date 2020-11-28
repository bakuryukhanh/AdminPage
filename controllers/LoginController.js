const { StaffModel } = require("../models/staffModel");

exports.index = async (req, res, next) => {
    res.render("login");
};
exports.login = async (req, res, next) => {
    console.log(req.body);
    const staff = await StaffModel.findOne(req.body);
    console.log(staff);
    if (staff == null) {
        return res.json({ log: "username or password wrong" });
    }
    sess = req.session;
    sess.User = staff;
    if (staff.role == "manager") {
        res.json({ dest: "/" });
    } else {
        res.json({ dest: "/info" });
    }
};
