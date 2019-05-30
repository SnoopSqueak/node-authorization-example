const numberPatternChallengesQueries = require("../db/queries.numberPatternChallenges.js");
const math = require("mathjs");

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
        console.log(err);
        req.flash("error", {param: "Error retrieving number pattern", msg: err});
        res.redirect(404, "/number_pattern_challenges");
      } else {
        let challenge = '';
        let formula = math.parse(numberPatternChallenge.formula).compile();
        for (var i = 0; i < numberPatternChallenge.slots; i++) {
          if (numberPatternChallenge.blanks[i] === "_") {
            challenge += '__';
          } else {
            challenge += formula.eval({x: (i + 1)});
          }
          if (i < numberPatternChallenge.slots + 1) {
            challenge += ', ';
          }
        }
        numberPatternChallenge.challenge = challenge;
        res.render("number_pattern_challenges/show", {numberPatternChallenge, math});
      }
    });
  },

  new(req, res, next) {
    res.render("number_pattern_challenges/new", {math: JSON.stringify(math)});
  },

  create(req, res, next) {
    if (!req.user) {
      req.flash("error", {param: "Error", msg: "Please sign in before creating a new number pattern challenge"});
      res.redirect("/users/sign_in");
    }
    let newNumberPatternChallenge = {
      slots: req.body.slots,
      blanks: req.body.blanks,
      formula: req.body.formula,
      userId: req.user.dataValues.id
    };
    numberPatternChallengesQueries.createNumberPatternChallenge(newNumberPatternChallenge, (err, numberPatternChallenge) => {
      if (err) {
        console.log(err);
        let message = "The challenge was not created, please verify input values."
        // I'm not sure how to reliably get the actual error message from Sequelize.
        // if (err.errors) {
        //   message = err.errors[0].message;
        // } else {
        //   message = err.toString();
        // }
        req.flash("error", {param: err.name, msg: message});
        res.redirect("/number_pattern_challenges/new");
      } else {
        req.flash("notice", "New number pattern challenge was created!");
        res.redirect("/number_pattern_challenges/" + numberPatternChallenge.id);
      }
    });
  }
};
