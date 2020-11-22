const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("morgan");
const Handlebars = require("hbs");
const HomeRoute = require("./routes/home");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

var cart = { item: 2 };
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/static", express.static(path.resolve("./public")));

app.use("/", HomeRoute);

module.exports = app;
