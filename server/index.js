const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
require("./models/User");
require("./services/passport");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");

const { PORT = 5000 } = process.env;

const app = express();

/* middleware: cookie-session */
app.use(
  cookieSession({
    name: "loginSession",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

/* middleware: passport */
app.use(passport.initialize());
app.use(passport.session());

/* routes */
require("./routes/authRoutes")(app);

/* start server */
app.listen(PORT);

/* mongoose */
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("[log] Succesfully connected to MongoDB"))
  .catch((err) => console.log(err));
