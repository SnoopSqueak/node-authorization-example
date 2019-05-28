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
        console.log("Should probably flash this:");
        console.log(err);
        res.redirect(404, "/");
      } else {
        // Challenge:
        // <% for (var i = 1; i < numberPatternChallenge.slots + 1; i++) { %>
        //   <% if (numberPatternChallenge.blanks.includes(i)) { %>
        //     <%= "_".trim() %>
        //   <% } else { %>
        //     <%= math.parse(numberPatternChallenge.formula).compile().eval({x: i}).toString().trim() %>
        //   <% } %>
        //   <% if (i < numberPatternChallenge.slots) { %>
        //     <%= ",".trim() %>
        //   <% } %>
        // <% } %>
        let challenge = '';
        for (var i = 1; i < numberPatternChallenge.slots + 1; i++) {
          if (numberPatternChallenge.blanks.includes(i)) {
            challenge += '_';
          } else {
            challenge += math.parse(numberPatternChallenge.formula).compile().eval({x: i});
          }
          if (i < numberPatternChallenge.slots) {
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
    let newNumberPatternChallenge = {
      slots: req.body.slots,
      blanks: req.body.blanks,
      formula: req.body.formula,
      userId: req.user.dataValues.id,
      constant: req.body.constant
    };
    numberPatternChallengesQueries.createNumberPatternChallenge(newNumberPatternChallenge, (err, numberPatternChallenge) => {
      if (err) {
        console.log(err);
        // this line probably won't work based on messages.ejs...
        // i'll check the error object in the log and figure out which
        // property stores the actual error message
        req.flash("error", {param: err.name, msg: err.errors[0].message});
        res.redirect("/number_pattern_challenges/sign_up");
      } else {
        req.flash("notice", "New number pattern challenge was created!");
        res.redirect("/number_pattern_challenges/" + numberPatternChallenge.id);
      }
    });
  }
};
