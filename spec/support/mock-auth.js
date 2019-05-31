module.exports = {
  fakeIt(app) {
    let role, id, email;

    function middleware(req, res, next) {
      role = req.body.role || role;
      id = req.body.id || id;
      email = req.body.email || email;

      if (id) {
        req.user = {
          dataValues: {
            id,
            email,
            role
          }
        };
      }

      if (next) {
        next();
      }
    }

    function route(req, res) {
      res.redirect("/");
    }
    app.use(middleware);
    app.get('/auth/fake', route);
  }
}
