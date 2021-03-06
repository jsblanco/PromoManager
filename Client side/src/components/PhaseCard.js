import React, { useState, useEffect } from "react";
import TaskCreator from "./TaskCreator";
import TaskCard from "./TaskCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'


const PhaseCard = (props) => {
  const [phase, setPhase] = useState(props.phase);
  const [isUpdated, setIsUpdated] = useState(false);
  const [hideTasks, setHideTasks] = useState(phase.isItOver);
  const [addTaskToggler, setAddTaskToggler] = useState(false);
  const [showResetHistory, setShowResetHistory] = useState(false);

  useEffect(() => {
    setPhase(props.phase);
    setIsUpdated(true);
    phase.isItOver && setAddTaskToggler(false);
  }, [props.phase, isUpdated]);

  const updatePage = (action, phaseId, taskIndex, task, message) => {
    if (phase.demonstrationPurposes) {
      props.updatePage(action, phaseId, taskIndex, task, message);
      return setIsUpdated(false);
    }
    setIsUpdated(false);
    props.updatePage();
  };

  const toggleResetHistory = () => {
    setShowResetHistory(!showResetHistory);
    setHideTasks(false);
  };

  const showTaskCreator = () => {
    setAddTaskToggler(!addTaskToggler);
  };

  const showTasks = () => {
    setHideTasks(!hideTasks);
  };

  const populateTasks = () => {
    return createTaskCards(phase.tasks.slice(-phase.basicTasks.length));
  };

  const createTaskCards = (taskArray) => {
    if (!hideTasks) {
      let assignedUserName = "";
      if (phase.activePhase && phase.tasks) {
        let activeTaskIndex = phase.tasks.findIndex((task) => !task.isItOver);
        if (activeTaskIndex > -1) {
          phase.tasks.map((task, index) => {
            activeTaskIndex === index
              ? (task.activeTask = true)
              : (task.activeTask = false);
          });
        }
      }

      return taskArray.map((task) => {
        let index = taskArray.indexOf(task);
        let assignedUserIndex = props.teamMembers.findIndex(
          (member) => member.role == task.assignedUser[0]
        );
        assignedUserName = props.phase.demonstrationPurposes
          ? "Guest user "
          : `${props.teamMembers[assignedUserIndex].role}: ${props.teamMembers[assignedUserIndex].name}`;
        let hideOldTasks = "";
        if (!showResetHistory) {
          if (
            taskArray.length - taskArray.indexOf(task) >
            phase.basicTasks.length
          ) {
            hideOldTasks = "d-none";
          }
        }

        if (index === phase.tasks.length - 1) {
          task.lastTask = true;
        }
        if (index === phase.tasks.length - phase.basicTasks.length) {
          task.firstTask = true;
        }

        return (
          <TaskCard
            key={phase._id+" "+index}
            index={index}
            projectId={props.projectId}
            phaseId={phase._id}
            teamMembers={props.teamMembers}
            assignedUserName={assignedUserName}
            isProjectOver={props.isProjectOver}
            isPhaseOver={phase.isItOver}
            task={task}
            user={props.user}
            hideOldTasks={hideOldTasks}
            updatePage={updatePage}
          />
        );
      });
    }
  };

  let createTaskForm,
    createTaskButton,
    taskCreatorToggler,
    tasks,
    showTasksToggler,
    resetToggler,
    isItOver;

  if (props.phase.isItOver && hideTasks) {
    showTasksToggler = (
      <button
        onClick={showTasks}
        className="btn btn-light bg-white border-white text-info font-italic"
      >
        Tasks were hidden because phase is completed -<b>Show tasks anyway</b>
      </button>
    );
  } else if (props.phase.isItOver && !hideTasks) {
    showTasksToggler = (
      <button
        onClick={showTasks}
        className="btn btn-light bg-white border-white text-info font-italic"
      >
        Hide tasks
      </button>
    );
  }

  if (phase.activePhase) {
    isItOver = (
      <>
      <FontAwesomeIcon icon={faLightbulb} size="2x" className="text-warning mr-3" />
        <p className="d-inline font-italic  my-2">This phase is ongoing</p>
      </>
    );
  } else if (phase.isItOver) {
    isItOver = (
      <>
       <FontAwesomeIcon icon={faLightbulb} size="2x" className="text-success mr-3" />
        <p className="d-inline font-weight-bold my-2">This phase is over!</p>
      </>
    );
  } else {
    isItOver = (
      <>
      <FontAwesomeIcon icon={faLightbulb} size="2x" color="gray" className="mr-3" />
        <p className="d-inline font-italic my-2">
          This phase has not started yet
        </p>
      </>
    );
  }

  if (phase.tasks) {
    switch (true) {
      case phase.tasks.length === phase.basicTasks.length:
        resetToggler = (
          <div className="d-flex justify-content-left font-italic text-secondary">
            Current round: <b className="text-dark mx-2">1</b>
          </div>
        );
        break;
      case phase.tasks.length > phase.basicTasks.length:
        resetToggler = (
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-info float-right"
              onClick={toggleResetHistory}
            >
              Show history
            </button>
            <p className="font-italic text-secondary ml-3 my-2">
              Current round:
              <b className="text-dark ml-1 mr-2">
                {phase.tasks.length / phase.basicTasks.length}
              </b>
            </p>
          </div>
        );
        break;
      default:
        break;
    }
  }

  if (phase.tasks) {
    tasks = <div>{createTaskCards(phase.tasks)}</div>;
  }

  if (addTaskToggler) {
    createTaskForm = (
      <TaskCreator
        phaseId={phase._id}
        teamMembers={props.teamMembers}
        projectId={props.projectId}
        showTaskCreator={showTaskCreator}
        updatePage={updatePage}
        demonstrationPurposes={phase.demonstrationPurposes}
      />
    );
    taskCreatorToggler = "Discard new task";
  } else {
    taskCreatorToggler = "Add new task";
  }

  if (
    (!!phase.demonstrationPurposes ||
      (!!props.user && props.user.role === "Account")) &&
    !phase.isItOver
  ) {
    createTaskButton = (
      <button className="btn btn-info py-1" onClick={showTaskCreator}>
        {taskCreatorToggler}
      </button>
    );
  }

  return (
    <div className="shadow p-3 mb-3 card bg-white rounded p-4 my-2">
      <div className="row pb-2 d-flex flex-row align-content-center ">
        <div className="col-xl-12">
          <h4 className="d-inline">{phase.name}</h4>
        </div>
        <div className="col-lg-6 d-flex flex-row">{isItOver}</div>
        <div className="col-lg-6 d-flex flex-row align-content-center justify-content-end">
          {resetToggler}
        </div>
      </div>
      {tasks}
      {createTaskForm}
      {createTaskButton}
      {showTasksToggler}
    </div>
  );
};

export default PhaseCard;
