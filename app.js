const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const hbs = require("hbs");
//routes
const HomeRoute = require("./routes/home");
const LoginRoute = require("./routes/login");
const StaffRoute = require("./routes/staff");
const DiscountRoute = require("./routes/discount");
const ProductRoute = require("./routes/product");
const StaffInforRoute = require("./routes/staffInfor");
const formulaRoute = require("./routes/formula");
const drinkOrder = require("./routes/drinkOrder");
const FinanceRoute = require("./routes/finance");
const FeedBackRoute = require("./routes/feedback");
const TableBookingRoute = require("./routes/TableBooking");
const { passport } = require("./authorize/authUser");
//API
const StatisticsAPI = require("./api/StatisticsRecord");
const StaffAPI = require("./api/StaffAPI");
const TableBookingAPI = require("./api/TableBookingAPI");

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
hbs.registerHelper("sortType", function (value, test) {
    if (value == undefined) return "";
    return value == test ? "selected " : "";
});
hbs.registerHelper("paginate", function (totalPages, currentPage) {
    var string = ``;
    for (let i = 1; i <= totalPages; i++) {
        if (i == currentPage) {
            string += `<li class="page-item active"><button class="page-link" value=${i}>${i}</button></li>`;
        } else {
            string += `<li class="page-item"><button class="page-link" value=${i}>${i}</button></li>`;
        }
    }
    return string;
});
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: "somesecret",
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use(passport.session());
//api
app.use("/api/statistics", StatisticsAPI);
app.use("/api/staffs", StaffAPI);
app.use("/api/table-booking", TableBookingAPI);

//routes
app.use("/", HomeRoute);
app.use("/finance", FinanceRoute);
app.use("/login", LoginRoute);
app.use("/staff", StaffRoute);
app.use("/discount", DiscountRoute);
app.use("/product", ProductRoute);
app.use("/info", StaffInforRoute);
app.use("/formula", formulaRoute);
app.use("/drink-order", drinkOrder);
app.use("/feedback", FeedBackRoute);
app.use("/table-booking", TableBookingRoute);
module.exports = app;
