const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user");
const session = require("express-session");

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin,
} = require("../helpers/middlewares");

router.post(
  "/signup",
  isNotLoggedIn(),
  validationLogin(),
  async (req, res, next) => {
    let { name, password, email, role } = req.body;
    email = email.toLowerCase()
    try {
      const emailExists = await User.findOne({ email }, "email");
      if (emailExists) return next(createError(400));
      else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = await User.create({
          name,
          password: hashPass,
          email,
          role,
        });
        req.session.currentUser = newUser;
        res
          .status(200)
          .json(newUser);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  isNotLoggedIn(),
  validationLogin(),
  async (req, res, next) => {
    let { email, password } = req.body;
    email = email.toLowerCase()
    try {
      const user = await User.findOne({ email }).populate("ongoingProjects");
      if (!user) {
        next(createError(404));
      } else if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.status(200).json(user);
        return;
      } else {
        next(createError(401));
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post("/logout", isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  res.status(204).send();
  return;
});

router.get("/private", isLoggedIn(), (req, res, next) => {
  res
    .status(200) // OK
    .json({ message: `Welcome, ${req.session.currentUser.name}` });
});

router.get("/me", isLoggedIn(), (req, res, next) => {
  req.session.currentUser.password = "*";
  res.json(req.session.currentUser);
});

module.exports = router;
