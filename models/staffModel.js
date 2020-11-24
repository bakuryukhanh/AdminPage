const { mongoose } = require("./mongoose");
const staffSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    phoneNumber: String,
    address: String,
    birthday: {
        type: String,
    },
    startDate: String,
    salary: Number,
    role: String,
});

let staffModel = mongoose.model("staff", staffSchema);
exports.StaffModel = staffModel;
