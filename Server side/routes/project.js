const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user");
const Project = require("../models/project");
const Phase = require("../models/phase");
const Task = require("../models/task");
const session = require("express-session");


//devuelve un proyecto existente
router.get("/:budgetNumber", async (req,res,next)=>{
  const {budgetNumber} = req.params;
  try {
  let project= await (await Project.findOne({budgetNumber}).populate("teamMembers").populate("phases"))
  res.status(200).json(project);
} catch (error) {
  next(error);
}
})

//crea un nuevo proyecto
router.post("/new", async (req, res, next) => {
  const {
    name,
    budgetNumber,
    client,
    description,
    type,
    teamMembers,
  } = req.body;
  try {
    const projectExists = await Project.findOne(
      { budgetNumber },
      "budgetNumber"
    );
    if (projectExists) return next(createError(400));
    else {
      //creamos el proyecto nuevo
      const newProject = await Project.create({
        name,
        budgetNumber,
        client,
        description,
        type,
        teamMembers,
        version: 1,
      });
      res.status(200).json(newProject);
      //con el array que hemos hecho en cliente, añadimos el proyecto a su cuenta
      teamMembers.map(async (user) => {
        if (user) {
          try {
            const updatedUser = await User.findByIdAndUpdate(user, {
              $push: { ongoingProjects: newProject.id },
            });
            res.status(200);
          } catch (error) {
            next(error);
          }
        }
      });
    }
  } catch (error) {
    next(error);
  }
});

//Edita un proyecto
router.post("/edit", async (req, res, next) => {
  const {
    name,
    client,
    description,
    type,
    teamMembers,
    originalMembers,
    id,
  } = req.body;
  try {
      //actualizamos el proyecto 
      let updatedProject = await Project.findByIdAndUpdate(id, {
        name,
        client,
        description,
        type,
        teamMembers,
      });
      res.status(200).json(updatedProject);
    } catch (error) {
        next(error);
      }
      //quitaremos el proyecto de los usuarios iniciales
      originalMembers.map(async (user) => {
        if (user!=undefined) {
          try {
            const updatedUser = await User.findByIdAndUpdate(user, {
              $pull: { ongoingProjects: id },
            });
            res.status(200);
          } catch (error) {
            next(error);
          }
        }
      });
      //y añadimos el proyecto a los usuarios que hemos asignado ahora
      teamMembers.map(async (user) => {
        if (user) {
          try {
            const updatedUser = await User.findByIdAndUpdate(user, {
              $push: { ongoingProjects: id },
            });
            res.status(200);
          } catch (error) {
            next(error);
          }
        }
      });
    }
);


//Crea una fase sin tareas para un proyecto
router.post("/:id/newphase", async (req, res, next) => {
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
      { $push: { phases: newPhase._id } },
      { new: true }
    );
    res.status(200).json(newProject);
  } catch (error) {
    next(error);
  }
});

//Crea una tarea y la añade a una fase
router.post("/:projectId/addtask/:phaseId", async (req, res, next) => {
  const { projectId, phaseId } = req.params;
  const { name, assignedUser} = req.body;
  try {
    const newTask = {
      name,
      assignedUser,
      message: "",
      spentTime: "",
    };
    const newTaskInDb = await Task.create({
      name,
      assignedUser,
      isItOver: false,
      message: "",
      spentTime: "",
    });
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

//Tarea es OK: necesita el índice de la tarea que estamos marcando
router.put(
  "/:projectId/:phaseId/taskisok/:taskIndex",
  async (req, res, next) => {
    let { projectId, phaseId, taskIndex } = req.params;
    const { spentTime, message } = req.body;
    taskIndex = parseInt(taskIndex);

    try {
      const currentPhase = await Phase.findById(phaseId);
      let newTasks = [...currentPhase.tasks];
      newTasks[taskIndex].isItOver = true;
      newTasks[taskIndex].spentTime = spentTime;
      if (message) {
        newTasks[taskIndex + 1].message = message;
      }

      if ((taskIndex = newTasks.length - 1)) {
        let updatedPhase = await Phase.findByIdAndUpdate(
          phaseId,
          { isItOver: true, tasks: newTasks },
          { new: true }
        );
        res.status(200).json(updatedPhase);
      } else {
        let updatedPhase = await Phase.findByIdAndUpdate(
          phaseId,
          { tasks: newTasks },
          { new: true }
        );
        res.status(200).json(updatedPhase);
      }
    } catch (error) {
      next(error);
    }
  }
);

//Tarea no es OK: necesita el índice de la tarea que estamos marcando
router.put(
  "/:projectId/:phaseId/taskisnotok/:taskIndex",
  async (req, res, next) => {
    let { projectId, phaseId, taskIndex } = req.params;
    const { spentTime, message } = req.body;
    taskIndex = parseInt(taskIndex);

    try {
      const currentPhase = await Phase.findById(phaseId);
      let newTasks = [...currentPhase.tasks];
      newTasks[taskIndex - 1].isItOver = false;
      newTasks[taskIndex - 1].message = message;
      newTasks[taskIndex].spentTime = spentTime;

      let updatedPhase = await Phase.findByIdAndUpdate(
        phaseId,
        { tasks: newTasks },
        { new: true }
      );
      res.status(200).json(updatedPhase);
    } catch (error) {
      next(error);
    }
  }
);

//Reseteo de fase (cuando cliente tira atrás un proyecto)
router.put("/:projectId/resetphase/:phaseId", async (req, res, next) => {
  const { projectId, phaseId } = req.params;
  const { spentTime, message } = req.body;

  try {
    const currentPhase = await Phase.findById(phaseId).populate("basicTasks");
    let newTasks = [...currentPhase.tasks];
    let previousTaskNumber = newTasks.length - 1;

    if (newTasks.length > 0) {
      newTasks[previousTaskNumber].message = message;
    }
    if (newTasks.length > 1) {
      newTasks[previousTaskNumber - 1].spentTime = spentTime;
    }

    await currentPhase.basicTasks.map((task) =>
      newTasks.push({
        name: task.name,
        assignedUser: task.assignedUser,
        isItOver: false,
        spentTime: "",
        message: "",
      })
    );

    let resetPhase = await Phase.findByIdAndUpdate(
      phaseId,
      { tasks: newTasks },
      { new: true }
    );
    res.status(200).json(resetPhase);
  } catch (error) {
    next(error);
  }
});

//Eliminar una tarea de una fase
router.put(
  "/:projectId/:phaseId/deletetask/:taskIndex",
  async (req, res, next) => {
    let { projectId, phaseId, taskIndex } = req.params;
    const { spentTime, message } = req.body;
    taskIndex = parseInt(taskIndex);

    try {
      const currentPhase = await Phase.findById(phaseId);
      let newTasks = [...currentPhase.tasks];
      newTasks.splice(taskIndex, 1);
      let updatedPhase = await Phase.findByIdAndUpdate(
        phaseId,
        { tasks: newTasks },
        { new: true }
      );
      res.status(200).json(updatedPhase);
    } catch (error) {
      next(error);
    }
  }
);

//Eliminar una fase de un proyecto

router.put("/:projectId/deletephase/:phaseId/", async (req, res, next) => {
  let { projectId, phaseId } = req.params;

  try {
    let updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $pull: { phases: phaseId } },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
});

//Añadir o actualizar el deadline de una tarea
router.put("/:projectId/:phaseId/update/:taskIndex", async (req, res, next) => {
  let { projectId, phaseId, taskIndex } = req.params;
  const { assignedUser, deadline } = req.body;
  taskIndex = parseInt(taskIndex);

  try {
    const currentPhase = await Phase.findById(phaseId);
    let newTasks = [...currentPhase.tasks];
    newTasks[taskIndex].deadline = deadline;
    newTasks[taskIndex].assignedUser = assignedUser;
    let updatedPhase = await Phase.findByIdAndUpdate(
      phaseId,
      { tasks: newTasks },
      { new: true }
    );
    res.status(200).json(updatedPhase);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
