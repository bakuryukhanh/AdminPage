const Router = require("express").Router();
const StaffServices = require("../models/services/StaffServices");
const { StaffModel } = require("../models/staffModel");
const { to } = require("await-to-js");
const bcrypt = require("bcryptjs");
Router.get("/", async (req, res, next) => {
    console.log(req.user);
    if (!req.user) {
        res.status(401);
        return res.json({ err: "access denied" });
    }
    if (req.user.role != "manager") {
        res.status(401);
        return res.json({ err: "access denied only manager can access" });
    }
    const [err, Staffs] = await to(StaffServices.getStaffList());
    if (err) {
        return res.json(err);
    }
    return res.json(Staffs);
});
Router.post("/", async (req, res, next) => {
    // if (!req.user || req.user.role != "manager") {
    //     res.status(401);
    //     return res.json({ err: "access denied" });
    // }
    var newStaff = req.body;
    var [error, hash] = await to(bcrypt.hash(newStaff.password, 10));
    newStaff.password = hash;
    [error, newStaff] = await to(StaffServices.addStaff(newStaff));
    if (error) {
        return res.json(error);
    }
    return res.json({ log: "success" });
});
Router.delete("/", async (req, res, next) => {
    var [err] = await to(StaffModel.deleteMany({}));
    if (err) {
        return res.json(err);
    }
    return res.json({ log: "success" });
});
Router.get("/:id", async (req, res, next) => {
    if (!req.user || req.user.role != "manager") {
        res.status(401);
        return res.json({ err: "access denied" });
    }
    const [err, Staff] = await to(StaffServices.getStaffById(req.params.id));
    if (err) {
        return res.json(err);
    }
    return res.json(Staff);
});
Router.put("/:id", async (req, res, next) => {
    if (!req.user || req.user.role != "manager") {
        res.status(401);
        return res.json({ err: "access denied" });
    }
    const [err, Staff] = await to(
        StaffServices.updateStaff(req.params.id, req.body)
    );

    if (err) {
        return res.json(err);
    }
    return res.json({ log: "success" });
});
Router.delete("/:id", async (req, res, next) => {
    // if (!req.user || req.user.role != "manager") {
    //     res.status(401);
    //     return res.json({ err: "access denied" });
    // }
    const [err, Staff] = await to(StaffServices.deleteStaff(req.params.id));

    if (err) {
        return res.json(err);
    }
    return res.json({ log: "success" });
});
module.exports = Router;
