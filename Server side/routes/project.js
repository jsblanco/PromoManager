const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user");
const Project = require("../models/project");
const Phase = require("../models/phase");
const Task = require("../models/task");
const session = require("express-session");

router.post("/new", async (req, res, next) => {
  const {
    name,
    client,
    budgetNumber,
    account,
    scientific,
    design,
    developer,
    av,
    type,
    brief,
  } = req.body;
  try {
    const projectExists = await Project.findOne(
      { budgetNumber },
      "budgetNumber"
    );
    if (projectExists) return next(createError(400));
    else {
      const newProject = await Project.create({
        name,
        client,
        budgetNumber,
        version: 1,
        account,
        scientific,
        design,
        developer,
        av,
        type,
        brief,
      });
      res.status(200).json(newProject);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/:id/new-phase", async (req, res, next) => {
  const projectId = req.params.id;
  const { name } = req.body;
  try {
    const newPhase = await Phase.create({
      name,
      project: projectId,
      tasks: [],
      basicTasks: [],
    });

    const newProject = await Project.findByIdAndUpdate(
      projectId,
      { $push: { ongoingPhases: newPhase._id } },
      { new: true }
    );
    res.status(200).json(newProject);
  } catch (error) {
    next(error);
  }
});

router.post("/:projectId/addphase/:phaseId", async (req, res, next) => {
  const { projectId, phaseId } = req.params;
  const { name, assignedUser, deadline } = req.body;
  try {
    const newTask = { name, assignedUser, deadline, project: projectId };
    const newTaskInDb = await Task.create({
      name,
      assignedUser,
      deadline,
      project: projectId,
      isItOver:false,
    });
    console.log(newTaskInDb);
    const updatedPhase = await Phase.findByIdAndUpdate(
      phaseId,
      { $push: { tasks: newTask, basicTasks: newTaskInDb._id } },
      { new: true }
    );
    res.status(200).json(updatedPhase);
  } catch (error) {
    next(error);
  }
});

router.put("/:projectId/resetphase/:phaseId", async (req, res, next)=>{
    const { projectId, phaseId } = req.params;
    try {
        const currentPhase = await Phase.findById(phaseId).populate("basicTasks");
        let newTasks = [...currentPhase.tasks];
        await currentPhase.basicTasks.map(task=> newTasks.push({isItOver:false, assignedUser: task.assignedUser, name: task.name}))
        let resetPhase = await Phase.findByIdAndUpdate(phaseId, {"tasks": newTasks}, {new: true})
        res.status(200).json(resetPhase);
    } catch (error) {
      next(error);
    }
    });




module.exports = router;

/*
  name: {type: String, required: true},
  project: { type: Schema.Types.ObjectId, ref: 'Project',required: true},
  assignedUser: [{ type: Schema.Types.ObjectId, ref: 'User', required: true}],
  deadline: [{ type: Date, required: true}],
*/
