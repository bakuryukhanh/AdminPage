const router = require("express").Router();
const { to } = require("await-to-js");
const { TableBookingModel } = require("../models/TableBookingModel");
const { mongo } = require("mongoose");
router.get("/", async (req, res, next) => {
    const [err, TableBookingList] = await to(TableBookingModel.find({}));
    if (err) return res.json(err);
    return res.json(TableBookingList);
});
router.get("/confirmed", async (req, res, next) => {
    const [err, TableBookingList] = await to(
        TableBookingModel.find({ confirmed: true })
    );
    if (err) return res.json(err);
    return res.json(TableBookingList);
});
router.put("/:id", async (req, res, next) => {
    var [err, BookingOrder] = await to(
        TableBookingModel.findById(req.params.id)
    );
    if (err) return res.json(err);
    BookingOrder.confirmed = true;
    var [err] = await to(BookingOrder.save());
    res.end("done");
});
router.delete("/:id", async (req, res, next) => {
    var [err, BookingOrder] = await to(
        TableBookingModel.deleteOne({ _id: mongo.ObjectId(req.params.id) })
    );
    if (err) return res.json(err);
    res.end("done");
});
router.get("/unconfirmed", async (req, res, next) => {
    const [err, TableBookingList] = await to(
        TableBookingModel.find({ confirmed: false })
    );
    if (err) return res.json(err);
    return res.json(TableBookingList);
});
module.exports = router;
