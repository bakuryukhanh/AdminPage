const { StaffModel } = require("../models/staffModel");
const { ObjectId } = require("mongodb");
exports.index = async (req, res, next) => {
    var sess = req.session;
    const user = await StaffModel.findOne({ _id: ObjectId(sess.User._id) });
    res.render("pages/staff/staffInfor", { user: user, page: "info" });
};
exports.getUpdateInfor = (req, res, next) => {
    res.render("pages/staff/editInfor", {
        user: req.session.User,
        page: "info",
    });
};
exports.postUpdateInfor = async (req, res, next) => {
    var sess = req.session;
    const user = await StaffModel.findOne({ _id: ObjectId(sess.User._id) });
    user.name = req.body.name;
    user.address = req.body.address;
    user.phoneNumber = req.body.phoneNumber;
    user.birthday = req.body.birthday;
    user.username = req.body.username;
    user.password = req.body.password;
    await user.save().catch((err) => res.json(err));
    res.json({ log: "success" });
};
