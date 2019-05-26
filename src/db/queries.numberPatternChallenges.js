const NumberPatternChallenge = require("./models").NumberPatternChallenge;

module.exports = {
  getAllNumberPatternChallenges(callback) {
    console.log("TODO: add a public/private flag to number pattern challenges");
    return NumberPatternChallenge.findAll()
    .then((numberPatternChallenges) => {
      callback(null, numberPatternChallenges);
    })
    .catch((err) => {
      callback(err);
    });
  },

  getNumberPatternChallenge(id, callback) {
    return NumberPatternChallenge.findOne({where: {id}})
    .then((numberPatternChallenge) => {
      callback(null, numberPatternChallenge);
    })
    .catch((err) => {
      callback(err);
    });
  },

  createNumberPatternChallenge(newNumberPatternChallenge, callback) {
    return NumberPatternChallenge.create({
      slots: newNumberPatternChallenge.slots,
      formula: newNumberPatternChallenge.formula,
      blanks: newNumberPatternChallenge.blanks,
      userId: newNumberPatternChallenge.userId,
      constant: newNumberPatternChallenge.constant
    })
    .then((numberPatternChallenge) => {
      callback(null, numberPatternChallenge);
    })
    .catch((err) => {
      callback(err);
    });
  }
}
