import React, { /*Component,*/ useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import PhaseCard from "./PhaseCard";
import PhaseCreator from "./PhaseCreator";
import DemoProject from "./DemoProject";

export const DemoProjectCard = (props) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [project, setProject] = useState(DemoProject);
  const [totalTime, setTotaltime] = useState("09:15");
  const [showPhaseCreator, setShowPhaseCreator] = useState(false);

  useEffect(() => {
    if (isUpdated === false) {
      console.log("Updating");
      setIsUpdated(true);
    }
  }, [project, isUpdated, totalTime]);

  const updatePage = (action, phaseId, taskIndex, task, message) => {
    const now = new Date();
    let updatedProject = {};
    switch (action) {
      case "resetPhase":
        console.log(action, phaseId, taskIndex, task, message);
        updatedProject = project;
        updatedProject.phases[phaseId].tasks.push(
          ...updatedProject.phases[phaseId].basicTasks
        );
        updatedProject.phases[phaseId].tasks[taskIndex] = {
          ...updatedProject.phases[phaseId].tasks[taskIndex],
          activeTask: false,
          completedOn: now,
          spentTime: task.inputSpentTime,
          isItOver: true,
        };
        updatedProject.phases[phaseId].tasks[taskIndex + 1].message = message;
        setIsUpdated(false);
        break;

      case "submitTaskAsOk":
        updatedProject = project;
        updatedProject.phases[phaseId].tasks[taskIndex] = {
          ...updatedProject.phases[phaseId].tasks[taskIndex],
          activeTask: false,
          completedOn: now,
          spentTime: task.spentTime,
          isItOver: true,
        };
        if (!!task.lastTask) {
          updatedProject.phases[phaseId].isItOver = true;
          setIsUpdated(false);
        }
        break;
      case "submitTaskAsNotOk":
        updatedProject = project;
        updatedProject.phases[phaseId].tasks[taskIndex - 1] = {
          ...updatedProject.phases[phaseId].tasks[taskIndex - 1],
          activeTask: true,
          isItOver: false,
          completedOn: "",
          message: message,
        };
        updatedProject.phases[phaseId].tasks[taskIndex] = {
          ...updatedProject.phases[phaseId].tasks[taskIndex],
          activeTask: false,
          spentTime: task.spentTime,
        };
        setIsUpdated(false);
        break;
      case "createPhase":
        updatedProject = project;
        console.log(phaseId);
        let newPhase = {
          _id: updatedProject.phases.length,
          isItOver: false,
          tasks: [],
          basicTasks: [],
          name: phaseId,
          demonstrationPurposes: true,
        };
        updatedProject.phases.push(newPhase);
        setIsUpdated(false);
        break;
      case "addTask":
        updatedProject = project;
        console.log(
          "Phase " + phaseId + ": " + action + " " + task
        );
        let newTask=    [{
          name: task,
          assignedUser: '["Guest user"]',
          message: "",
          spentTime: "00:00",
          deadline: "",
          isItOver: false,
          completedOn: false,
          firstTask: false,
          activeTask: false,
          demonstrationPurposes: true,
        }]
       updatedProject.phases[phaseId].tasks[updatedProject.phases[phaseId].tasks.length-1].lastTask=false;
       updatedProject.phases[phaseId].basicTasks.push(...newTask)
       updatedProject.phases[phaseId].tasks.push(...newTask)
        setIsUpdated(false);
        break;
      case "updateTask":
          updatedProject = project;
          updatedProject.phases[phaseId].tasks[taskIndex] = {
            ...updatedProject.phases[phaseId].tasks[taskIndex],
            name: task.name,
            deadline: task.deadline,
          };
          setIsUpdated(false);
          break;
      default:
        console.log(
          "Default action: " + phaseId + ": " + action + " " + taskIndex
        );
        return;
    }
  };

  const setIsUpdatedToTrue = () => {
    isUpdated ? setIsUpdated(false) : setIsUpdated(true);
  };

  const closeProjectFunction = () => {
    const projectId = project._id;
    const teamMembers = project.teamMembers;
    setProject({
      ...project,
      isItOver: true,
    });
  };

  const calculateTotalSpentTime = (accumulator, task) => {
    let totalHours = parseFloat(accumulator) + parseFloat(task);
    let totalMinutes = parseFloat(
      parseFloat(accumulator.slice(-2)) + parseFloat(task.slice(-2))
    );
    if (totalMinutes >= 60) {
      totalHours++;
      totalMinutes -= 60;
    }
    totalHours = "0" + totalHours;
    totalMinutes = "0" + totalMinutes;
    if (totalHours.length > 2) {
      totalHours = totalHours.toString().slice(1);
    }
    return `${totalHours}:${totalMinutes.toString().slice(-2)}`;
  };

  let phases,
    createPhaseForm,
    closeProject,
    phaseCreatorToggler,
    createPhaseButton;

  if (project.phases) {
    let activePhase = project.phases.findIndex(
      (phase) => phase.isItOver === false
    );
    if (activePhase > -1) {
      project.phases[activePhase].activePhase = true;
    }
    phases = project.phases.map((phase) => (
      <PhaseCard
        key={phase._id}
        //position={projectData.phases.length - projectData.phases.indexOf(phase)}
        phase={phase}
        teamMembers={project.teamMembers}
        projectId={project._id}
        user={props.user}
        isProjectOver={project.isItOver}
        updatePage={updatePage}
      />
    ));
  }

  if (!project.isItOver && project.phases !== undefined) {
    if (
      project.phases.length > 0 &&
      project.phases[project.phases.length - 1].isItOver === true
    ) {
      closeProject = (
        <form onSubmit={closeProjectFunction()} className="text-center my-2">
          <div className="row w-100 text-center">
            props.task.demonstrationPurposes ||
            <p className="w-100">
              It will be marked as finished, and team members will not receive
              further notifications.
            </p>
          </div>
          <button type="submit" className="btn btn-danger">
            Close project
          </button>
        </form>
      );
    }
  }

  if (project.isItOver) {
    closeProject = (
      <div className="card shadow p-3 mb-3 mt-2 bg-white rounded text-center my-2">
        <h5 className="text-danger font-weight-bold w-100">
          This project is closed
        </h5>
        <button
          className="btn btn-outline-info"
          onClick={() => setProject(DemoProject)}
        >
          Click to re-start the demo
        </button>
      </div>
    );
  }

  if (showPhaseCreator === true) {
    createPhaseForm = (
      <PhaseCreator
        projectId={project._id}
        updatePage={updatePage}
        showPhaseCreator={() => setShowPhaseCreator(!showPhaseCreator)}
        demonstrationPurposes={true}
      />
    );
    phaseCreatorToggler = "Discard new phase";
  } else {
    phaseCreatorToggler = "Add new phase";
  }

  if (!project.isItOver) {
    createPhaseButton = (
      <button
        className="btn btn-primary my-2 w-100"
        onClick={() => setShowPhaseCreator(!showPhaseCreator)}
      >
        {phaseCreatorToggler}
      </button>
    );
  }

  let timeSpent = ["00:00"];
  if (project.phases) {
    [...project.phases].map((phase) => {
      if (phase.tasks) {
        phase.tasks.map((task) => {
          timeSpent.push(task.spentTime);
        });
      }
    });
  }

  /* timeSpent.length > 0
    ? (timeSpent = timeSpent.reduce(calculateTotalSpentTime))
    : (timeSpent = "00:00");
    console.log(timeSpent);
    

if (timeSpent !== totalTime){setTotaltime(timeSpent); setIsUpdated(false)};*/

  return (
    <div className="my-4 row w-100 d-flex flex-row justify-content-around card shadow m-3 rounded p-4 pt-5">
      <div className="col-md-12 px-4">
        <header className="px-2">
          <div className="row">
            <h1 className="px-2">
              {project.budgetNumber} -{project.name}
            </h1>
          </div>
          <div className="row mx-2">
            <div className="">
              <p className="d-inline mb-0 mr-3">
                <b>Client: </b>
                {project.client}
              </p>
              <p className="d-inline text-muted font-italic mb-0">
                {project.type}
              </p>
              <p>{project.description}</p>
            </div>
          </div>
          {/* <section className="mx-2 px-3 my-4">
            <h3>Project team:</h3>
            <div className="d-flex flex-row row justify-content-center">
              <div className="card shadow col-md-4 px-4 py-3 mb-3 mt-2 mx-4 bg-white rounded text-center">
                <p className="mt-1 mb-1">Team member role (i.e. "Designer")</p>
                <h4>Guest user</h4>
                <p className="font-italic">
                  <b>Time spent:</b> {timeSpent.reduce(calculateTotalSpentTime)}
                  h
                </p>
              </div>
            </div>
          </section> */}
        </header>

        <section id="phases" className="mx-2 px-5">
          <h3 className="px-4 mt-4 pb-2">Development phases:</h3>
          {phases}
          {createPhaseForm}
          {createPhaseButton}
          {closeProject}
        </section>
      </div>
    </div>
  );
};

export default DemoProjectCard;
