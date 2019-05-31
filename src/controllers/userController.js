const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {
  signUp(req, res, next) {
    res.render("users/sign_up");
  },

  signInForm(req, res, next) {
    res.render("users/sign_in");
  },

  signIn(req, res, next) {
    passport.authenticate("local")(req, res, (param) => {
      if (!req.user) {
        req.flash("error", "Sign in failed. Please try again, or sign up if you don't have an account.");
        res.redirect("/users/sign_in");
      } else {
        req.flash("success", "You've successfully signed in!");
        res.redirect("/");
      }
    });
  },

  signOut(req, res, next) {
    req.logout();
    req.flash("success", "You've successfully signed out!");
    res.redirect("/");
  },

  create(req, res, next) {
    let newUser = {
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
    userQueries.createUser(newUser, (err, user) => {
      if (err) {
        console.log(err);
        req.flash("error", {param: err.name, msg: err.errors[0].message});
        res.redirect("/users/sign_up");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("success", "You've successfully signed in!");
          res.redirect("/");
        });
      }
    });
  }
};
