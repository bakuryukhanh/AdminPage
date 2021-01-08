const { mongoose } = require("./mongoose");
const FeedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    date: Date,
});
let FeedbackModel = mongoose.model("feedback", FeedbackSchema);
module.exports = { FeedbackModel };
