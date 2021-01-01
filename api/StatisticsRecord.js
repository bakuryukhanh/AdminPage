const BillServices = require("../models/services/BillServices");
const router = require("express").Router();
const { to } = require("await-to-js");
router.get("/months", async (req, res, next) => {
    const [err, report] = await to(BillServices.getTotalByMonths());
    if (err) return res.json(err);
    return res.json(report);
});
router.get("/days", async (req, res, next) => {
    const [err, report] = await to(BillServices.getTotalByDays());
    if (err) return res.json(err);
    return res.json(report);
});
router.get("/drinks", async (req, res, next) => {
    const [err, report] = await to(BillServices.getDrinkStatistic());
    if (err) return res.json(err);
    return res.json(report);
});
module.exports = router;
