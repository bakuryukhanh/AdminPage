const Router = require("express").Router();
const FeedbackRouter = require("../controllers/FeedbackController");
Router.get("/", FeedbackRouter.index);
module.exports = Router;
