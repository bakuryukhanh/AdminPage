const { to } = require("await-to-js"),
    bcrypt = require("bcryptjs"),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;

const { StaffModel } = require("../models/staffModel");
passport.use(
    new LocalStrategy(
        { usernameField: "username", passwordField: "password" },
        async function (username, password, done) {
            const user = await StaffModel.findOne({
                username: username,
            }).catch((err) => {
                return done(err);
            });
            if (!user) {
                return done(null, false, {
                    message: "Username or password wrong",
                });
            }
            const [err, res] = await to(
                bcrypt.compare(password, user.password)
            );
            if (err) {
                var errorMsg = "ERROR";
                return done(errorMsg);
            }
            if (!res) {
                return done(null, false, {
                    message: "Username or password wrong",
                });
            }
            return done(null, user);
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    const [err, normalUser] = await to(StaffModel.findById(id));
    if (err) {
        return done(err);
    }

    done(null, normalUser);
});
const loginAuthenrize = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err || !user) {
            return res.json({ log: "username or password wrong" });
        }
        req.logIn(user, function (err) {});
        next();
    })(req, res, next);
};

module.exports = { loginAuthenrize, passport };
