const { FeedbackModel } = require("../models/feedbackModel");
const { to } = require("await-to-js");
exports.index = async (req, res, next) => {
    if (!req.user) {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    if (req.user.role != "manager") {
        res.status(401);
        return res.json({ error: "access denied" });
    }
    var [error, feedbacks] = await to(FeedbackModel.find({}));
    res.render("pages/admin/feedback", { feedbacks: feedbacks });
};
