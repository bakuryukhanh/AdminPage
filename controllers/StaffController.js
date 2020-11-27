const { StaffModel } = require("../models/staffModel");
const { ObjectID } = require("mongodb");
const moment = require("moment");
exports.index = async (req, res, next) => {
    var staffs = await StaffModel.find({}).map((staffs) => {
        staffs.forEach((staff) => {
            staff.age =
                moment().year() - moment(staff.birthday, "DD/MM/YYYY").year();
        });
        return staffs;
    });
    res.render("staffs", { staff: staffs });
};
exports.getAdd = async (req, res, next) => {
    res.render("staffDetail");
};
exports.postAdd = async (req, res, next) => {
    const staff = await StaffModel(req.body);
    await staff.save().catch((err) => {
        res.json(err);
        console.log(err);
    });
    res.json({ log: "success" });
};
exports.getEdit = async (req, res, next) => {
    const staff = await StaffModel.findOne({ _id: ObjectID(req.params.id) });
    res.render("staffDetail", { staff: staff });
};
exports.postEdit = async (req, res, next) => {
    console.log(req.params.id);
    const staff = await StaffModel.findOne({
        _id: ObjectID(req.params.id),
    });

    staff.name = req.body.name;
    staff.address = req.body.address;
    staff.phoneNumber = req.body.phoneNumber;
    staff.birthday = req.body.birthday;
    staff.startDate = req.body.startDate;
    staff.role = req.body.role;
    staff.salary = req.body.salary;
    staff.username = req.body.username;
    staff.password = req.body.password;

    staff
        .save()
        .then(res.json({ log: "success" }))

        .catch((err) => console.error(err));
};
exports.remove = async (req, res, next) => {
    const staff = await StaffModel.deleteOne({
        _id: ObjectID(req.params.id),
    });
    res.json({ log: "success" });
};
