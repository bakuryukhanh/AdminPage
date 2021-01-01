const Router = require("express").Router();
const FinanceRouter = require("../controllers/FinanceController");
Router.get("/", FinanceRouter.index);
module.exports = Router;
