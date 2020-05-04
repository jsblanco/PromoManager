import React, { useState, useEffect } from "react";
import userService from "../lib/user-service";
import { withAuth } from "../lib/AuthProvider";

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
    setResetPhaseVerification(!resetPhaseVerification);
  };

  const showPhaseCompleteVerification = (event) => {
    setResetPhaseVerification(false);
    setPhaseCompleteVerification(!phaseCompleteVerification);
    showSpentTimeInput(event);
  };

  const calculateTotalSpentTime = (event) => {
    let { value } = event.target;
    let totalHours =
      "0" + (parseFloat(props.task.spentTime) + parseFloat(value));
    let totalMinutes =
      "0" +
      parseFloat(
        parseFloat(props.task.spentTime.slice(-2)) + parseFloat(value.slice(-2))
      );
    if (totalMinutes > 60) {
      totalHours++;
      totalMinutes -= 60;
    }
    if (totalHours.length > 2) {
      totalHours = totalHours.toString().slice(1);
    }
    let spentTime = `${totalHours}:${totalMinutes.toString().slice(-2)}`;
    setTask({
      ...task,
      spentTime,
    });
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
      return;
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
    if (!!props.task.demonstrationPurposes) {
      props.updatePage("resetPhase", props.phaseId, props.index, task, message);
      setResetPhaseVerification(false)
      return setTaskNotOk(false)
    }
    const { spentTime } = task;
    const { phaseId, projectId } = props;
    await userService.resetPhase({ projectId, phaseId, spentTime, message });
    setResetPhaseVerification(false);
    props.updatePage();
  };

  const submitTaskAsOk = async (event) => {
    event.preventDefault();
    if (!!props.task.demonstrationPurposes) {
      props.updatePage("submitTaskAsOk", props.phaseId, props.index, task);
      return setTaskIsOk(false)
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
    if (!!props.task.demonstrationPurposes) {
      props.updatePage("submitTaskAsNotOk", props.phaseId, props.index, task, message);
      setTask({
        ...task,
        activeTask: false
      })
      return setTaskNotOk(false)
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
    <div className="d-flex align-content-center">
      <label htmlFor="deadline" className="pr-3">
        Deadline:
      </label>
      <p className="font-weight-bold d-inline">
        {readableDeadline.toLocaleString("en-UK", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );

  if (!task.demonstrationPurposes) {
    if (!props.isProjectOver && props.user.role === "Account") {
      button = (
        <button className="btn btn-info" onClick={showInput}>
          Edit task
        </button>
      );
    }
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
            <option key={user._id} value={user.role}>
              {user.role}: {user.name}
            </option>
          );
        })}
      </select>
    );
    deadlineInfo = (
      <div className="d-flex align-content-center">
        <label htmlFor="deadline" className="pr-3">
          Deadline:
        </label>
        <input
          type="date"
          name="deadline"
          onChange={handleChange}
          value={task.deadline}
          required
        />
      </div>
    );
    button = (
      <button className="btn btn-warning" type="submit">
        Update task
      </button>
    );
  } else if (

    (!!props.user && props.user.role ===  "Account" )&&
    !props.task.deadline &&
    !taskUpdated
  ) {
    deadlineInfo = (
      <div className="d-flex align-items-center">
        <label htmlFor="deadline" className="pr-3 text-danger">
          Assign a deadline:
        </label>
        <input
          type="date"
          name="deadline"
          onChange={handleChange}
          value={task.deadline}
          required
        />
      </div>
    );
    button = (
      <button className="btn btn-warning" type="submit">
        Update task
      </button>
    );
  } else if (!task.deadline) {
    deadlineInfo = (
      <div className="d-flex align-items-center">
        <label className="pr-3">Deadline:</label>
        <p className="font-weight-bold font-italic d-inline">
          As soon as possible
        </p>
      </div>
    );
  }

  if (!props.task.firstTask) {
    issueDetected = (
      <button onClick={showMessageInput} className="btn btn-danger mx-2">
        Issue detected
      </button>
    );
  }

  if (
    ((!!props.user && props.user.role === props.task.assignedUser[0]) || !!props.task.demonstrationPurposes) &&
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
    (!!props.user && props.user.role === props.task.assignedUser[0]) &&
    props.task.activeTask
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
        <div className="row mb-2 d-flex justify-content-around align-items-center">
          <div className="w-100 d-flex justify-content-center align-items-center">
            <label htmlFor="spentTime" className="pr-3">
              Time spent:
            </label>
            <input
              onChange={calculateTotalSpentTime}
              type="time"
              name="inputSpentTime"
              className="pt-1 pb-2 text-center"
              required
            />
            <label htmlFor="message" className="pl-5 pr-3">
              Reason:
            </label>
            <input
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              name="message"
              className="pt-1 pb-2 w-50"
              placeholder="Describe the problem to your colleague"
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-danger">
          Return to previous user
        </button>
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
        <div className="row d-flex justify-content-center align-items-center">
          <label htmlFor="spentTime" className="pr-4">
            Time spent:
          </label>
          <input
            onChange={calculateTotalSpentTime}
            type="time"
            name="inputSpentTime"
            className="pt-1 pb-2  mr-5 text-center"
            required
          />
          <button type="submit" className="btn btn-success">
            Complete task
          </button>
        </div>
      </form>
    );
  }

  if (
    props.task.message.trim() &&
    !task.isItOver &&
    (!!task.demonstrationPurposes || (!!props.user && task.assignedUser[0] === props.user.role) || props.user.role === "Account")
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
        <div className="row w-100 text-center">
          <h5 className="text-danger font-weight-bold w-100">
            You are about to reset this phase
          </h5>
          <p className="w-100">
            This step restarts <b>all tasks</b> in this phase, and should be
            taken when <b>client feedback</b> has been received.
          </p>
        </div>
        <div className="row mb-2 w-100 d-flex justify-content-center align-items-center">
          <label htmlFor="spentTime" className="pr-3">
            Time spent:
          </label>
          <input
            onChange={handleChange}
            type="time"
            name="inputSpentTime"
            className="pt-1 pb-2 text-center"
            required
          />
          <label htmlFor="message" className="pl-5 pr-3">
            Client feedback:
          </label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            className="pt-1 pb-2 w-50"
            placeholder="Describe the feedback from the client to the team"
            required
          />
        </div>
        <button type="submit" className="btn btn-danger">
          Reset phase
        </button>
      </form>
    );
  }

  if (phaseCompleteVerification) {
    messageInput = (
      <form onSubmit={submitTaskAsOk} className="my-2">
        <div className="row w-100 text-center">
          <h5 className="text-success font-weight-bold w-100">
            You are completing this phase
          </h5>
          <p className="w-100">
            This step requires you to have gotten <b>client approval</b> to
            continue to the next phase.
          </p>
        </div>
        <div className="row d-flex justify-content-center align-items-center">
          <label htmlFor="spentTime" className="pr-4">
            Time spent:
          </label>
          <input
            onChange={calculateTotalSpentTime}
            type="time"
            name="inputSpentTime"
            className="pt-1 pb-2  mr-5 text-center"
            required
          />
          <button type="submit" className="btn btn-success">
            Complete task
          </button>
        </div>
      </form>
    );
  }

  ////////////////////////////
  return (
    <div className={` card ${active} ${props.hideOldTasks} p-2`}>
      <form onSubmit={updateTask}>
        <h5>
          <b>{taskName}</b>
          {activeMarker}
        </h5>
        <div className="pt-1 d-flex justify-content-around">
          <div className="d-flex align-content-center mx-0">
            <label className="pr-3">Assigned to:</label>
            {assignedTo}
          </div>
          {deadlineInfo}
          <div className="d-flex align-content-center">
            <label className="pr-3">Time spent:</label>
            <p className="font-weight-bold d-inline">{task.spentTime} hours</p>
          </div>
          {button}
        </div>
        {wasTheDeadlineMet}
        {messageInfo}
      </form>
      <div className="row d-flex justify-content-center">
        {completeTaskButtons}
      </div>
      {messageInput}
    </div>
  );
};

export default withAuth(TaskCard);
