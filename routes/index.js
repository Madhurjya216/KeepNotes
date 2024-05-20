var express = require("express");
var router = express.Router();
const Users = require("./users");
const passport = require("passport");
const passportLocal = require("passport-local");

passport.use(new passportLocal(Users.authenticate()));

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index");
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.get("/profile", isLoggedIn, function (req, res) {
  res.render("profile");
});

router.post("/register", function (req, res) {

  const data = new Users({
    username: req.body.username,
    secret: req.body.secret,
  });

  Users.register(data, req.body.password).then(function (registerdUser) {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
