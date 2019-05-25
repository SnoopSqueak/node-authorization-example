const numberPatternChallengesQueries = require("../db/queries.numberPatternChallenges.js");
// const passport = require("passport");

module.exports = {
  index(req, res, next) {
    numberPatternChallengesQueries.getAllNumberPatternChallenges((err, numberPatternChallenges) => {
      if (err) {
        console.log("should probably flash this, too:");
        console.log(err);
        res.redirect(500, "static/index");
      } else {
        res.render("number_pattern_challenges/index", {numberPatternChallenges});
      }
    });
  },

  show(req, res, next) {
    numberPatternChallengesQueries.getNumberPatternChallenge(req.params.id, (err, numberPatternChallenge) => {
      if (err || numberPatternChallenge == null) {
        console.log("Should probably flash this:");
        console.log(err);
        res.redirect(404, "/");
      } else {
        res.render("number_pattern_challenges/show", {numberPatternChallenge});
      }
    });
  },

  create(req, res, next) {
    let newNumberPatternChallenge = {
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
    numberPatternChallengesQueries.createNumberPatternChallenge(newNumberPatternChallenge, (err, user) => {
      if (err) {
        console.log(err);
        // this line probably won't work based on messages.ejs...
        // i'll check the error object in the log and figure out which
        // property stores the actual error message
        req.flash("error", {param: err.name, msg: err.errors[0].message});
        res.redirect("/number_pattern_challenges/sign_up");
      } else {
        console.log("TODO: work out what happens when a number pattern challenge is created");
        // passport.authenticate("local")(req, res, () => {
        //   req.flash("notice", "You've successfully signed in!");
        //   res.redirect("/");
        // });
      }
    });
  }
};
