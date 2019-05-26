const express = require("express");
const router = express.Router();
const numberPatternChallengeController = require("../controllers/numberPatternChallenge");
const validation = require("./validation");

router.get("/number_pattern_challenges", numberPatternChallengeController.index);
router.get("/number_pattern_challenges/new", numberPatternChallengeController.new);
router.get("/number_pattern_challenges/:id", numberPatternChallengeController.show);
router.post("/number_pattern_challenges", validation.validateNumberPatternChallenges, numberPatternChallengeController.create);

module.exports = router;
