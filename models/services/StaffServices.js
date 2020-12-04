const { StaffModel } = require("../staffModel");
const { ObjectId } = require("mongodb");

const getStaffList = async () => {
    const list = await StaffModel.find().lean();
    return list;
};

const getStaffById = async (id) => {
    const staff = await StaffModel.findOne({ _id: ObjectId(id) });
    return staff;
};

const updateStaff = async (id, data) => {
    const staff = await StaffModel.findOne({ _id: ObjectId(id) });
    if (!staff) {
        throw TypeError("No staff has ID: ", id);
    }
    staff.name = data.name;
    staff.username = data.username;
    staff.password = data.password;
    staff.phoneNumber = data.phoneNumber;
    staff.address = data.address;
    staff.birthday = data.birthday;
    staff.startDate = data.startDate;
    staff.salary = data.salary;
    staff.role = data.role;
    await staff.save();
};

const deleteStaff = async (id) => {
    await StaffModel.deleteOne({ _id: ObjectId(id) });
};

const addStaff = async (data) => {
    const staff = new StaffModel(data);
    await staff.save();
};

module.exports = {
    addStaff,
    getStaffById,
    getStaffList,
    updateStaff,
    deleteStaff,
};
