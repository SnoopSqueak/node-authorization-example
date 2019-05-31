const math = require("mathjs");

module.exports = {
  validateUsers(req, res, next) {
    if (req.method == "POST") {
      req.checkBody("email", "must be valid").isEmail();
      req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6});
      req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
    }

    const errors = req.validationErrors();

    if (errors) {
      console.log(errors);
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    } else {
      return next();
    }
  },

  validateNumberPatternChallenges(req, res, next) {
    if (req.method == "POST") {
      req.checkBody("slots", "must be an integer in the range of 3-20").isInt({ min: 3, max: 20, allow_leading_zeroes: false });
      req.checkBody("blanks", "must be a string of length slots with between 1 and (slots-1)/2 blanks").isLength(req.body.slots).custom((value) => {
        let count = 0;
        for (var i = 0; i < value.length; i++) {
          if (value[i] === "_") count++;
        }
        // i'm actually not sure whether there should be a return value
        return count > 0 && count <= Math.floor((req.body.slots - 1)/2);
      });
      req.checkBody("formula", "must be a string parseable by mathjs").custom((value) => {
        try {
          let formula = math.parse(req.body.formula).compile();
          // it should throw an error if symbols other than x are included
          formula.eval({x: 5});
          return true;
        } catch (e) {
          console.log("Failed to parse formula");
          return Promise.reject(e);
        }
      });
      req.checkBody("public", "must be a boolean").isBoolean();
    }

    const errors = req.validationErrors();

    if (errors) {
      console.log("slots:", req.body.slots);
      console.log("blanks:", req.body.blanks);
      console.log("formula:", req.body.formula);
      console.log("Validation failed:");
      console.log(errors);
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    } else {
      return next();
    }
  }
}
