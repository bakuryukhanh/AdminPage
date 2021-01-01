const { StaffModel } = require("../models/staffModel");

exports.index = async (req, res, next) => {
    res.render("login");
};
exports.login = async (req, res, next) => {
    if (req.user.role == "manager") {
        res.json({ dest: "/" });
    } else {
        res.json({ dest: "/info" });
    }
};
exports.logout = async (req, res, next) => {
    req.logout();
    res.redirect("/");
};
