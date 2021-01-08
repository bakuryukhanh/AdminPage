const Router = require("express").Router();
const TableBookingController = require("../controllers/TableBookingController");
Router.get("/", TableBookingController.index);
module.exports = Router;
