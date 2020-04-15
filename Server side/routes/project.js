const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user");
const Project = require("../models/project");
const Phase = require("../models/phase");
const Task = require("../models/task");


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
router.put("/edit", async (req, res, next) => {
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
      spentTime: "00:00",
    };
    const newTaskInDb = await Task.create({
      name,
      assignedUser,
      isItOver: false,
      message: "",
      spentTime: "00:00",
    });

    /*
    const currentPhase = await Phase.findById(phaseId).populate("basicTasks");
    let project= await Project.findById(projectId).populate("teamMembers")
    let userIndex =project.teamMembers.findIndex((user) => user.role==newTask.assignedUser[0]);
    User.findByIdAndUpdate(req.session.currentUser._id, {$pull: {"pendingTasks": phaseId}},{ new: true })
    User.findByIdAndUpdate(project.teamMembers[userIndex]._id, {$push: {"pendingTasks": phaseId}},{ new: true })
    */

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
    const completedOn = new Date()
    completedOn.setHours(2,0,0,0)
    let assignedUser = [req.session.currentUser.role, req.session.currentUser._id]
    taskIndex = parseInt(taskIndex);

    try {
      const currentPhase = await Phase.findById(phaseId).populate("basicTasks");
      let newTasks = [...currentPhase.tasks];
      newTasks[taskIndex].isItOver = true;
      newTasks[taskIndex].completedOn = completedOn;
      newTasks[taskIndex].assignedUser = assignedUser;
      newTasks[taskIndex].spentTime = spentTime;
      if (message) {
        newTasks[taskIndex + 1].message = message;
      }
/*
      let project= await Project.findById(projectId).populate("teamMembers")
      let userIndex =project.teamMembers.findIndex((user) => user.role == newTasks[taskIndex + 1].assignedUser[0]);
      console.log("UEUEUEUE: ",project.teamMembers[userIndex]._id,)
      await User.findByIdAndUpdate(req.session.currentUser._id, {$pull: {"pendingTasks": phaseId}},{ new: true })
      await User.findByIdAndUpdate(project.teamMembers[userIndex]._id, {$push: {"pendingTasks": phaseId}},{ new: true })
*/
      if (taskIndex === newTasks.length - 1) {
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
    let assignedUser = [req.session.currentUser.role, req.session.currentUser._id]
    taskIndex = parseInt(taskIndex);

    try {
      const currentPhase = await Phase.findById(phaseId).populate("basicTasks");
      let newTasks = [...currentPhase.tasks];
      newTasks[taskIndex - 1].isItOver = false;
      newTasks[taskIndex - 1].message = message;
      newTasks[taskIndex - 1].completedOn = undefined;
      newTasks[taskIndex].assignedUser = assignedUser;
      newTasks[taskIndex].spentTime = spentTime;
/*
      let project= await Project.findById(projectId).populate("teamMembers")
      let userIndex =project.teamMembers.findIndex((user) => user.role==newTasks[taskIndex - 1].assignedUser[0]);
      console.log("UEUEUEUE: ",project.teamMembers[userIndex]._id,"  Phase ID:", phaseId, "req.session.currentUser._id :", req.session.currentUser._id)
      User.findByIdAndUpdate(req.session.currentUser._id, {$pull: {"pendingTasks": phaseId}},{ new: true })
      User.findByIdAndUpdate(project.teamMembers[userIndex]._id, {$push: {"pendingTasks": phaseId}},{ new: true })
*/

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
      newTasks[previousTaskNumber].isItOver = true;
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

/*
    let project= await Project.findById(projectId).populate("teamMembers")
    let userIndex =project.teamMembers.findIndex((user) => (user.role==currentPhase.basicTasks[0].assignedUser[0]));
    User.findByIdAndUpdate(req.session.currentUser._id, {$pull: {"pendingTasks": phaseId}},{ new: true })
    User.findByIdAndUpdate(project.teamMembers[userIndex]._id, {$push: {"pendingTasks": phaseId}},{ new: true })
*/

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
  const {name, assignedUser, deadline} = req.body;
  taskIndex = parseInt(taskIndex);

  try {
    const currentPhase = await Phase.findById(phaseId);
    let newTasks = [...currentPhase.tasks];
    newTasks[taskIndex].name = name;
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


//Añadir comentarios a un proyecto
router.put('/:projectId/addcomment', (req, res, next) => {
  const user = req.session.currentUser._id
  const {
    comments
  } = req.body;
  Project.findByIdAndUpdate(
      req.params.projectId, {
        $push: {
          comments: {
            $each: [{
              user,
              comments
            }],
            $position: 0
          }
        }
      })
    .catch(error => {
      console.log(error);
    });
});





//Terminar un proyecto

router.put("/:projectId/close", async (req, res, next) => {
  const {projectId}= req.params
  const {teamMembers}= req.body
  console.log('projectId :', projectId);
  try {
      
      let finishedProject = await Project.findOneAndUpdate({projectId}, {isItOver: true});
      res.status(200).json(finishedProject);
    } catch (error) {
        next(error);
      }
      //Moveremos el proyecto de onGoingProjects a finishedProjects
      teamMembers.map(async (user) => {
        if (user!=undefined) {
          try {
            const updatedUser = await User.findByIdAndUpdate(user._id, {
              $push: { finishedProjects: projectId },
              $pull: { ongoingProjects: projectId },
            });
            res.status(200);
          } catch (error) {
            next(error);
          }
        }
      });
;})






module.exports = router;
