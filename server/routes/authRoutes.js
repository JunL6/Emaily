const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/users/:userId/books/:bookId", function (req, res) {
    res.sendStatus(200);
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.session);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    req.session = null; // cookie-session: destory session
    res.send(`logged out successfully`);
  });
};
