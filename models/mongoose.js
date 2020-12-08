const mongoose = require("mongoose");
const server = process.env.DB_URL;
console.log(server);
const option = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
    .connect(server, option)
    .then(() => {
        console.log("Database connection successful");
    })
    .catch((err) => {
        console.error("Database connection error");
    });
exports.mongoose = mongoose;
