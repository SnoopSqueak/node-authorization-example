module.exports = {
  init(app) {
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const numberPatternChallengeRoutes = require("../routes/numberPatternChallenges");
    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(numberPatternChallengeRoutes);
  }
};
