import React, { /*Component,*/ useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import PhaseCard from "./PhaseCard";
import DemoProject from "./DemoProject";

export const DemoProjectCard = (props) => {
  const location = useLocation();
  const [isUpdated, setIsUpdated] = useState(false);
  const [project, setProject] = useState(DemoProject);

  useEffect(() => {
    setIsUpdated(true);
  }, [isUpdated, location]);

  const updatePage = (action, phaseId, taskIndex) => {
    switch (action) {
      case "resetPhase":
        console.log(phaseId + ": " + action + " " + taskIndex);
        break;

      case "submitTaskAsOk":
        console.log(phaseId + ": " + action + " " + taskIndex);
        break;
      case "submitTaskAsNotOk":
        console.log(phaseId + ": " + action + " " + taskIndex);
        break;
      default:
        console.log("Default action: "+phaseId + ": " + action + " " + taskIndex)
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

  let phases, createPhaseForm, closeProject, createPhaseButton;

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
            <h5 className="text-danger font-weight-bold w-100">
              You are about to close this project
            </h5>
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
      </div>
    );
  }

  let timeSpent = [];
  if (project.phases) {
    [...project.phases].map((phase) => {
      if (phase.tasks) {
        phase.tasks.map((task) => {
          timeSpent.push(task.spentTime);
        });
      }
    });
  }
  timeSpent.length > 0
    ? (timeSpent = timeSpent.reduce(calculateTotalSpentTime))
    : (timeSpent = "00:00");

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
          <section className="mx-2 px-3 my-4">
            <h3>Project team:</h3>
            <div className="d-flex flex-row row justify-content-center">
              {project.teamMembers.map((user, index) => {
                if (user) {
                  return (
                    <div
                      key={user._id}
                      className="card shadow col-lg-2 px-4 py-3 mb-3 mt-2 mx-4 bg-white rounded text-center"
                    >
                      <p className="mt-1 mb-1" key={user._id}>
                        {user.role}
                      </p>
                      <h4>{user.name}</h4>
                      <p className="font-italic">
                        <b>Time spent:</b> {timeSpent[index]}h
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </section>
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
