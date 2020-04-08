const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user");
const Project = require("../models/project");
const Phase = require("../models/phase");
const Task = require("../models/task");
const session = require("express-session");

router.get("/list", async (req, res, next) => {

    try {
      const userList = await User.find()
      res.status(200).json(userList);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;