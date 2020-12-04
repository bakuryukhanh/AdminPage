const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const hbs = require("hbs");
const HomeRoute = require("./routes/home");
const LoginRoute = require("./routes/login");
const RegisterRoute = require("./routes/register");
const StaffRoute = require("./routes/staff");
const DiscountRoute = require("./routes/discount");
const ProductRoute = require("./routes/product");
const StaffInforRoute = require("./routes/staffInfor");
const formulaRoute = require("./routes/formula");
const drinkOrder = require("./routes/drinkOrder");
const { authUser } = require("./authorize/authUser");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
var blocks = {};
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("extend", function (name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this));
});
hbs.registerHelper("block", function (name) {
    var val = (blocks[name] || []).join("\n");

    // clear the block
    blocks[name] = [];
    return val;
});
hbs.registerHelper("checked", function (value1, value2) {
    if (value1 == null) return "";
    if (value1 == value2) return "checked";
    return "";
});
hbs.registerHelper("active", function (value1, value2) {
    if (value1 == null) {
        return "";
    }
    if (value1 == value2) return "active";
    return "";
});
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: "somesecret",
        cookie: { maxAge: 600000 },
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", HomeRoute);
app.use("/login", LoginRoute);
app.use("/staff", StaffRoute);
app.use("/register", RegisterRoute);
app.use("/discount", DiscountRoute);
app.use("/product", ProductRoute);
app.use("/info", StaffInforRoute);
app.use("/formula", formulaRoute);
app.use("/drink-order", drinkOrder);
module.exports = app;
