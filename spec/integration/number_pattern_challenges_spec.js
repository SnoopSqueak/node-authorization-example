const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const NumberPatternChallenge = require("../../src/db/models").NumberPatternChallenge;
const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/number_pattern_challenges/";
const math = require("mathjs");

describe("routes : number_pattern_challenges", () => {
  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      User.create({
        email: "standard@email.com",
        password: "iheartnumber$"
      }).then((user) => {
        this.standardUser = user;
        NumberPatternChallenge.create({
          slots: 7,
          formula: "5x + 1",
          blanks: "nn___nn",
          userId: user.id
        }).then((numberPatternChallenge) => {
          this.numberPatternChallenge = numberPatternChallenge;
          done();
        });
      });
    })
    .catch((err) => {
      console.log(err);
      done();
    });
  });

  describe("standard user performing CRUD actions for NumberPatternChallenge", () => {
    beforeEach((done) => {
      request.get({         // mock authentication
        url: "http://localhost:3000/auth/fake",
        form: {
          role: this.standardUser.role,     // mock authenticate as admin user
          id: this.standardUser.id,
          email: this.standardUser.email
        }
      }, (err, res, body) => {
        done();
      });
    });

    describe("GET /number_pattern_challenges", () => {
      it("should respond with all number pattern challenges", (done) => {
        request.get(base, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toMatch(/There are \d+ number pattern challenges./);
          done();
        });
      });
    });

    describe("GET /number_pattern_challenges/new", () => {
      it("should respond with a form for entering a new number pattern challenge", (done) => {
        request.get(`${base}new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("New Number Pattern Challenge");
          done();
        });
      });
    });

    describe("GET /number_pattern_challenges/:id", () => {
      it("should respond with the show view for the given challenge", (done) => {
        request.get(`${base}${this.numberPatternChallenge.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toMatch(/Number Pattern Challenge #\d+/);
          expect(body).toContain("Challenge:");
          done();
        });
      });
    });

    describe("POST /number_pattern_challenges", () => {
      const options = {
        url: `${base}`,
        form: {
          slots: 5,
          formula: "x + 5",
          blanks: "nnnn_",
          public: false
        }
      };
      it("should create a new number pattern challenge and redirect", (done) => {
        request.post(options, (err, res, body) => {
          NumberPatternChallenge.findOne({where: {blanks: "nnnn_"}})
          .then((numberPatternChallenge) => {
            expect(numberPatternChallenge).not.toBeNull();
            expect(numberPatternChallenge.slots).toBe(5);
            expect(numberPatternChallenge.formula.toString()).toBe("x + 5");
            expect(numberPatternChallenge.blanks).toBe("nnnn_");
            done();
          });
        });
      });
    })
  });
});
