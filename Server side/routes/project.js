const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user");
const Project = require("../models/project")
const Round = require("../models/round")
const Task = require("../models/task")
const session = require("express-session");


router.post("/new", async (req, res, next)=>{
    const { name, client, budgetnumber, account, scientific, design, developer, av, type, brief} = req.body;
    try {
        const projectExists = await Project.findOne({ budgetnumber }, "budgetnumber");
        if (projectExists) return next(createError(400));
        else {
          const newProject = await Project.create({
            name, client, budgetnumber, version: 1, account, scientific, design, developer, av, type, brief,
          });
          res
            .status(200)
            .json(newProject);
        }
      } catch (error) {
        next(error);
      } 
})

router.post("/:id/new-round", async (req, res, next)=>{
    const projectId = req.params.id;
    const { name } = req.body;
    try { const newRound = await Round.create({name, project: projectId, tasks: [], basicTasks:[]})


    
          const newProject = await Project.findOneAndUpdate(projectId, { $push: { 'ongoingRounds': newRound._id }
          });
          res
            .status(200)
            .json(newProject);
      } catch (error) {
        next(error);
      } 
})

module.exports = router;