import React, { useState, useEffect } from "react";
import userService from "../lib/user-service";
import { withAuth } from "../lib/AuthProvider";
import TimeInput from "./TimeInput";
import { Row, Col, Button } from "react-bootstrap";

const TaskCard = (props) => {
  const [task, setTask] = useState(props.task);
  const [message, setMessage] = useState(props.task.message);
  const [showButton, setShowButton] = useState(false);
  const [taskIsOk, setTaskIsOk] = useState(false);
  const [taskNotOk, setTaskNotOk] = useState(false);
  const [activeTask, setActiveTask] = useState(false);
  const [assignedUserName, setAssignedUserName] = useState(
    props.assignedUserName
  );
  const [emptyInputsWarning, setEmptyImputsWarning]= useState(false)
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [resetPhaseVerification, setResetPhaseVerification] = useState(false);
  const [phaseCompleteVerification, setPhaseCompleteVerification] = useState(
    false
  );
  const [taskUpdated, setTaskUpdated] = useState(!!props.task.deadline);

  useEffect(() => {
    if (props.task.activeTask !== activeTask) {
      setActiveTask(props.task.activeTask);
    }
  }, [props.task]);

  useEffect(() => {});

  const showResetPhaseVerification = () => {
    setPhaseCompleteVerification(false);
    setTaskNotOk(false);
    setInputMinutes(0);
    setInputHours(0);
    setResetPhaseVerification(!resetPhaseVerification);
  };

  const showPhaseCompleteVerification = (event) => {
    setResetPhaseVerification(false);
    setTaskNotOk(false);
    setInputMinutes(0);
    setInputHours(0);
    setPhaseCompleteVerification(!phaseCompleteVerification);
    showSpentTimeInput(event);
  };

  const calculateInputTime = (event, index) => {};

  const calculateTotalSpentTime = (reset) => {
    console.log("Entra en el calculate");
    let timeSpentSoFar = task.spentTime.split(":");
    let totalHours = parseInt(timeSpentSoFar[0]) + parseInt(inputHours);
    let totalMinutes = parseInt(timeSpentSoFar[1]) + parseInt(inputMinutes);
    if (totalMinutes > 59) {
      console.log(totalHours);
      console.log(totalMinutes / 60);
      totalHours++;
      totalMinutes -= 59;
    }
    console.log(totalHours);
    if (totalHours.length > 2) {
      totalHours = totalHours.toString().slice(1);
    }
    if (totalHours < 10) totalHours = "0" + totalHours;
    if (totalMinutes < 10) totalMinutes = "0" + totalMinutes;
    let updatedTask = { ...task };
    const totalSpentTime = `${totalHours}:${totalMinutes}`;
    console.log(task, totalSpentTime);
    setTask({
      ...task,
      activeTask: !reset,
      spentTime: totalSpentTime,
    });
    console.log(task);
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleAssignedUser = (event) => {
    let { name, value } = event.target;
    let userName = props.teamMembers.filter((user) => user.role === value);
    let assignedUserName = `${value}: ${userName[0].name}`;
    let assignedUser = value;
    setTask({
      ...task,
      assignedUser: [assignedUser],
    });
    setAssignedUserName(assignedUserName);
  };

  const updateTask = (event) => {
    event.preventDefault();
    if (!!props.task.demonstrationPurposes) {
      setShowButton(false);
      setTaskUpdated(true);
      return props.updatePage("editTask", props.phaseId, props.index, task);
    }
    const { name, assignedUser, spentTime, deadline } = task;

    const { phaseId, projectId, index } = props;
    userService.updateTask({
      phaseId,
      index,
      projectId,
      name,
      spentTime,
      assignedUser,
      deadline,
    });
    setTask({ ...task });
    setShowButton(false);
    setTaskUpdated(true);
    props.updatePage();
  };

  const resetPhase = async (event) => {
    event.preventDefault();
    setEmptyImputsWarning(false)
    if ((!inputHours && !inputMinutes) || !message.trim()){
      return setEmptyImputsWarning(true)
    }
    calculateTotalSpentTime();
    if (!!props.task.demonstrationPurposes) {
      props.updatePage("resetPhase", props.phaseId, props.index, task, message);
      setResetPhaseVerification(false);
      return setTaskNotOk(false);
    }
    const { spentTime } = task;
    const { phaseId, projectId } = props;
    await userService.resetPhase({ projectId, phaseId, spentTime, message });
    setResetPhaseVerification(false);
    props.updatePage();
  };

  const submitTaskAsOk = async (event) => {
    event.preventDefault();
    
    setEmptyImputsWarning(false)
    if (!inputHours && !inputMinutes){
      return setEmptyImputsWarning(true)
    }

    calculateTotalSpentTime();
    
    if (!!props.task.demonstrationPurposes) {
      props.updatePage("submitTaskAsOk", props.phaseId, props.index, task);
      setPhaseCompleteVerification(false);
      return setTaskIsOk(false);
    }
    
    setPhaseCompleteVerification(false);
    const { spentTime } = task;
    const { phaseId, projectId, index } = props;
    await userService.taskIsOk({
      phaseId,
      projectId,
      index,
      spentTime,
    });
    setTaskIsOk(false);
    props.updatePage();
  };

  const submitTaskAsNotOk = async (event) => {
    event.preventDefault();
   
    setEmptyImputsWarning(false)
    if ((!inputHours && !inputMinutes) || !message.trim()){
      return setEmptyImputsWarning(true)
    }
    
    calculateTotalSpentTime(true);
    
    if (!!props.task.demonstrationPurposes) {
      props.updatePage(
        "submitTaskAsNotOk",
        props.phaseId,
        props.index,
        task,
        message
      );
      // setTask({
      //   ...task,
      //   activeTask: false,
      // });
      return setTaskNotOk(false);
    }
    setTaskNotOk(false);
    const { spentTime } = task;
    const { phaseId, projectId, index } = props;
    await userService.taskIsNotOk({
      phaseId,
      projectId,
      index,
      message,
      spentTime,
    });
    props.updatePage();
  };

  const showMessageInput = (event) => {
    event.preventDefault();
    setTaskIsOk(false);
    setTaskNotOk(!taskNotOk);
  };

  const showSpentTimeInput = (event) => {
    event.preventDefault();
    setTaskIsOk(!taskIsOk);
    setTaskNotOk(false);
  };

  const showInput = (event) => {
    event.preventDefault();
    setShowButton(!showButton);
  };

  let button,
    taskName,
    assignedTo,
    deadlineInfo,
    active,
    completeTaskButtons,
    messageInput,
    activeMarker,
    issueDetected,
    warningMessage,
    messageInfo,
    wasTheDeadlineMet,
    readableDeadline,
    completionDate;

  props.task.completedOn
    ? (completionDate = new Date(props.task.completedOn))
    : (completionDate = "Sometime");
  task.deadline
    ? (readableDeadline = new Date(task.deadline))
    : (readableDeadline = "As soon as possible");

  if (props.task.completedOn && task.deadline) {
    let differenceWithDeadline =
      completionDate.getDate() - readableDeadline.getDate();

    const completedOn = (
      <div className="d-flex align-content-center mr-4">
        <label htmlFor="deadline" className="pr-3">
          Task completed on:
        </label>
        <p className={`font-weight-bold d-inline`}>
          {completionDate.toLocaleString("en-UK", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    );

    switch (true) {
      case differenceWithDeadline > 0:
        wasTheDeadlineMet = (
          <div className="w-100 justify-content-center row">
            {completedOn}
            <p className="ml-3 text-danger">
              Task completed <b>{differenceWithDeadline} days</b> after the
              deadline
            </p>
          </div>
        );
        break;
      case differenceWithDeadline === 0:
        wasTheDeadlineMet = (
          <div className="w-100 justify-content-center row">
            {completedOn}
            <p className="ml-3 text-info">Task completed upon the deadline</p>
          </div>
        );
        break;
      case differenceWithDeadline < 0:
        wasTheDeadlineMet = (
          <div className="w-100 justify-content-center row">
            {completedOn}
            <p className="ml-3 text-success">
              Task completed <b>{differenceWithDeadline * -1} days</b> before
              the deadline
            </p>
          </div>
        );
        break;
    }
  }

  taskName = <p className="d-inline">{task.name}</p>;
  assignedTo = <p className="font-weight-bold d-inline">{assignedUserName}</p>;

  deadlineInfo = (
    <p className="font-weight-bold d-inline">
      {readableDeadline.toLocaleString("en-UK", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })}
    </p>
  );

  if (
    !props.isProjectOver &&
    ((!!props.user && props.user.role === "Account") ||
      !!props.task.demonstrationPurposes)
  ) {
    button = (
      <button
        className="btn btn-info float-right py-1 mb-2"
        onClick={showInput}
      >
        Edit task
      </button>
    );
  }

  if (showButton) {
    taskName = (
      <input
        name="name"
        type="text"
        onChange={handleChange}
        value={task.name}
      />
    );
    assignedTo = (
      <select
        name="assignedUser"
        className="pt-1 pb-2"
        onChange={handleAssignedUser}
      >
        <option value={props.task.assignedUser} className="font-weight-bold">
          Currently: {assignedUserName}
        </option>
        {props.teamMembers.map((user) => {
          return (
            <option key={user._id + " " + props.index} value={user.role}>
              {user.role}: {user.name}
            </option>
          );
        })}
      </select>
    );
    deadlineInfo = (
      <input
        type="date"
        name="deadline"
        onChange={handleChange}
        value={task.deadline}
        required
      />
    );
    button = (
      <button className="btn btn-warning float-right" type="submit">
        Update task
      </button>
    );
  } else if (
    (!!props.task.demonstrationPurposes ||
      (!!props.user && props.user.role === "Account")) &&
    !props.task.deadline &&
    !taskUpdated
  ) {
    deadlineInfo = (
      <input
        type="date"
        name="deadline"
        onChange={handleChange}
        value={task.deadline}
        required
      />
    );
    button = (
      <button className="btn btn-warning" type="submit">
        Update task
      </button>
    );
  } else if (!task.deadline) {
    deadlineInfo = (
      <p className="font-weight-bold font-italic d-inline">
        As soon as possible
      </p>
    );
  }

  if (!props.task.firstTask) {
    issueDetected = (
      <button
        onClick={
          //showMessageInput
          (e) => {
            showMessageInput(e);
            setPhaseCompleteVerification(false);
            setResetPhaseVerification(false);
          }
        }
        className="btn btn-danger mx-2"
      >
        Issue detected
      </button>
    );
  }

  if (
    ((!!props.user && props.user.role === props.task.assignedUser[0]) ||
      !!props.task.demonstrationPurposes) &&
    props.task.activeTask &&
    props.task.lastTask
  ) {
    completeTaskButtons = (
      <div className="row justify-content-center mb-2">
        {issueDetected}
        <button
          onClick={showResetPhaseVerification}
          className="btn btn-warning mx-2"
        >
          Reset phase
        </button>
        <button
          onClick={showPhaseCompleteVerification}
          className="btn btn-success mx-2"
        >
          Phase completed
        </button>
      </div>
    );
  } else if (
    (props.task.demonstrationPurposes && props.task.activeTask) ||
    (!!props.user &&
      props.user.role === props.task.assignedUser[0] &&
      props.task.activeTask)
  ) {
    completeTaskButtons = (
      <div className="row justify-content-center mb-2">
        {issueDetected}
        <button onClick={showSpentTimeInput} className="btn btn-success mx-2">
          Task completed
        </button>
      </div>
    );
  }

  if (props.task.activeTask) {
    activeMarker = (
      <p className="d-inline font-italic text-primary"> - Active task</p>
    );
    active = "shadow p-3 mb-3 mt-2 bg-white rounded";
  } else {
    active = "border border-white text-secondary";
  }

  if (taskNotOk === true) {
    messageInput = (
      <form onSubmit={submitTaskAsNotOk} className="text-center">
        <div className="w-100 mb-2 d-flex flex-column justify-content-around align-items-center">
          <Row className="d-flex align-items-center justify-content-center w-100 px-2">
            <TimeInput
              inputMinutes={inputMinutes}
              inputHours={inputHours}
              setInputMinutes={setInputMinutes}
              setInputHours={setInputHours}
              outline="danger"
            />
          </Row>
          <Row className="d-flex align-items-center justify-content-center w-100 px-2 mt-1">
            <label htmlFor="message">Reason:</label>
          </Row>
          <Row className="d-flex w-100 px-2 mb-1 mx-2">
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              name="message"
              className="mx-3 w-100"
              placeholder="Describe your feedback to your partner"
              required
            />
          </Row>
        </div>
        <Button type="submit" variant="danger">
          Return to previous user
        </Button>
      </form>
    );
  }

  if (taskIsOk === true) {
    messageInput = (
      <form
        onSubmit={submitTaskAsOk}
        className="my-2 d-flex justify-content-center align-items-center"
      >
        {warningMessage}
        <div className="w-100 px-1 d-flex flex-column justify-content-center align-items-center">
          <Row className="d-flex align-items-center justify-content-center w-100 px-2">
            <TimeInput
              inputMinutes={inputMinutes}
              inputHours={inputHours}
              setInputMinutes={setInputMinutes}
              setInputHours={setInputHours}
              outline="success"
            />
          </Row>
          <Row className="d-flex align-items-center justify-content-center w-100 px-2">
            <Button type="submit" variant="success" className="my-2">
              Complete task
            </Button>
          </Row>
        </div>
      </form>
    );
  }

  if (
    props.task.message.trim() &&
    !task.isItOver &&
    (!!task.demonstrationPurposes ||
      (!!props.user && task.assignedUser[0] === props.user.role) ||
      props.user.role === "Account")
  ) {
    messageInfo = (
      <div className="">
        <p className="font-weight-bold text-danger mb-0">
          This task was returned.
        </p>
        <p className="font-weight-bold d-inline ml-3">Reason: </p>
        <p className="d-inline font-italic">{props.task.message}</p>
      </div>
    );
  }

  if (resetPhaseVerification) {
    messageInput = (
      <form onSubmit={resetPhase} className="text-center my-2">
        <Row className="w-100 px-2 mx-0">
          <h5 className="text-danger text-center px-2 font-weight-bold w-100">
            You are about to reset this phase
          </h5>
          <p className="w-100 text-center px-2">
            This step restarts <b>all tasks</b> in this phase, and should be
            taken when <b>client feedback</b> has been received.
          </p>
        </Row>

        <Row className="d-flex align-items-center justify-content-center w-100 px-2 mb-1">
          <TimeInput
            inputMinutes={inputMinutes}
            inputHours={inputHours}
            setInputMinutes={setInputMinutes}
            setInputHours={setInputHours}
            outline="warning"
          />
        </Row>
        <Row className="d-flex align-items-center justify-content-center w-100 px-2 mt-1">
          <label htmlFor="message">Client feedback:</label>
        </Row>
        <Row className="d-flex w-100 px-2 mb-1 mx-2">
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            className="mx-3 w-100"
            placeholder="Describe the feedback from the client to the team"
            required
          />
        </Row>

        <Button type="submit" variant="danger">
          Reset phase
        </Button>
      </form>
    );
  }

  if (phaseCompleteVerification) {
    messageInput = (
      <form onSubmit={submitTaskAsOk} className="my-2 w-100">
        <Row className="w-100 px-2 mx-0">
          <h5 className="text-success text-center px-2 font-weight-bold w-100">
            You are completing this phase
          </h5>
          <p className="w-100 text-center px-2">
            This step requires you to have gotten <b>client approval</b> to
            continue to the next phase.
          </p>
        </Row>

        <Row className="d-flex align-items-center justify-content-center w-100 px-2">
          <TimeInput
            inputMinutes={inputMinutes}
            inputHours={inputHours}
            setInputMinutes={setInputMinutes}
            setInputHours={setInputHours}
            outline="success"
          />
        </Row>

        <Row className="d-flex align-items-center justify-content-center w-100 mt-2 px-2">
          <Button type="submit" variant="success">
            Complete task
          </Button>
        </Row>
      </form>
    );
  }

  ////////////////////////////
  return (
    <div className={` card ${active} ${props.hideOldTasks} p-2`}>
      <form onSubmit={updateTask}>
        <div className="row">
          <div className="col-xl-6 col-md-12">
            <h5>
              <b>{taskName}</b>
              {activeMarker}
            </h5>
          </div>
          <div className="col-xl-6 d-flex align-items-center justify-content-end">
            <label className="pr-3 font-italic text-secondary mb-0">
              Time spent:
            </label>
            <p className="font-weight-bold d-inline font-italic mb-0">
              {task.spentTime} hours
            </p>
          </div>
        </div>
        <div className="pt-1 row">
          <div className="col-xl-5 col-lg-6 d-flex flex-column align-content-center mx-0 my-0">
            <label className="pr-3">Assigned to:</label>
            {assignedTo}
          </div>
          <div className="col-xl-4 col-lg-7 d-flex flex-column align-content-center  my-0">
            <label className="">Deadline:</label>
            {deadlineInfo}
          </div>
          <div className="col-xl-3 col-lg-3 d-flex align-items-center">
            {button}
          </div>
        </div>
        {wasTheDeadlineMet}
        {messageInfo}
      </form>
      <div className="row d-flex justify-content-center">
        {completeTaskButtons}
      </div>
      {messageInput}
      {!!emptyInputsWarning && <Row className="w-100 mx-0 mt-1 mb-2 px-2 font-weight-bold text-danger"><p className="w-100 text-center">Please fill all fields before submitting</p></Row>}
    </div>
  );
};

export default withAuth(TaskCard);
