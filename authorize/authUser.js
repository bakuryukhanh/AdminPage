function authUser(req, res, next) {
    var sess = req.session;
    if (sess.User == null) {
        res.status(403);
        return res.redirect("/login");
    }
    next();
}
function authAdmin(req, res, next) {
    var sess = req.session;
    if (sess.User.role != "manager") {
        res.status(403);
        console.log(req.headers);
        return res.send("You need to be Admin to access this page");
    }
    next();
}
module.exports = { authUser, authAdmin };
