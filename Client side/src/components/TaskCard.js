import React, { Component } from "react";
import userService from "../lib/user-service";
import { withAuth } from "../lib/AuthProvider";

class TaskCard extends Component {
  state = {
    projectId: this.props.projectId,
    teamMembers: this.props.teamMembers,
    phaseId: this.props.phaseId,
    index: this.props.index,
    name: this.props.task.name,
    spentTime: this.props.task.spentTime,
    assignedUserName: this.props.assignedUserName,
    assignedUser: this.props.task.assignedUser,
    deadline: this.props.task.deadline,
    showButton: false,
    taskIsOk: false,
    taskNotOk: false,
    inputSpentTime: "",
    message: this.props.task.message,
    resetPhaseVerification: false,
    phaseCompleteVerification: false,
  };

  showResetPhaseVerification = () => {
    this.setState({
      phaseCompleteVerification: false,
      resetPhaseVerification: !this.state.resetPhaseVerification,
    });
  };

  showPhaseCompleteVerification = (event) => {
    this.setState({
      resetPhaseVerification: false,
      phaseCompleteVerification: !this.state.phaseCompleteVerification,
    });
    this.showSpentTimeInput(event);
  };

  calculateTotalSpentTime = (event) => {
    let { name, value } = event.target;
    let totalHours =
      "0" + (parseFloat(this.props.task.spentTime) + parseFloat(value));
    let totalMinutes =
      "0" +
      parseFloat(
        parseFloat(this.props.task.spentTime.slice(-2)) +
          parseFloat(value.slice(-2))
      );
    if (totalMinutes > 60) {
      totalHours++;
      totalMinutes -= 60;
    }
    if (totalHours.length > 2) {
      totalHours = totalHours.toString().slice(1);
    }
    let spentTime = `${totalHours}:${totalMinutes.toString().slice(-2)}`;
    this.setState({
      spentTime: spentTime,
    });
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleAssignedUser = (event) => {
    let { name, value } = event.target;
    let userName = this.props.teamMembers.filter(user => user.role == value)
    let assignedUserName= `${value}: ${userName[0].name}`
    console.log(assignedUserName);
    let assignedUser = value;
    this.setState({
      assignedUser: [assignedUser],
      assignedUserName: assignedUserName,
    });
  };

  updateTask = (event) => {
    event.preventDefault();
    const {
      phaseId,
      name,
      assignedUser,
      spentTime,
      deadline,
      projectId,
      index,
    } = this.state;
    userService.updateTask({
      phaseId,
      name,
      spentTime,
      assignedUser,
      deadline,
      projectId,
      index,
    });
    this.setState({
      showButton: false,
      taskUpdated: true,
    });
  };

  resetPhase = async () => {
    const { projectId, phaseId, spentTime, message } = this.state;
    await userService.resetPhase({ projectId, phaseId, spentTime, message });
    this.setState({
      resetPhaseVerification: false,
    });
    this.props.reloadPage()
  };

  showMessageInput = (event) => {
    event.preventDefault();
    this.setState({
      taskIsOk: false,
      taskNotOk: !this.state.taskNotOk,
    });
  };

  showSpentTimeInput = (event) => {
    event.preventDefault();
    this.setState({
      taskIsOk: !this.state.taskIsOk,
      taskNotOk: false,
    });
  };

  showInput = (event) => {
    event.preventDefault();
    this.setState({
      showButton: !this.state.showButton,
    });
  };

  submitSpentTime = () => {
    let totalTime =
      new Date(this.state.spentTime) + new Date(this.state.inputSpentTime);
    this.setState({
      spentTime: totalTime,
    });
  };

  submitTaskAsOk = () => {
    this.submitSpentTime();
    const { phaseId, projectId, index, spentTime } = this.state;
    userService.taskIsOk({
      phaseId,
      projectId,
      index,
      spentTime,
    });
  };

  submitTaskAsNotOk = () => {
    this.submitSpentTime();
    const { phaseId, projectId, index, message, spentTime } = this.state;
    userService.taskIsNotOk({
      phaseId,
      projectId,
      index,
      message,
      spentTime,
    });
  };

  render() {
    let button,
      taskName,
      assignedTo,
      deadline,
      active,
      completeTaskButtons,
      messageInput,
      activeMarker,
      issueDetected,
      warningMessage,
      message,
      wasTheDeadlineMet,
      readableDeadline,
      completionDate;

    this.props.task.completedOn
      ? (completionDate = new Date(this.props.task.completedOn))
      : (completionDate = "Sometime");
    this.state.deadline
      ? (readableDeadline = new Date(this.state.deadline))
      : (readableDeadline = "As soon as possible");

    if (this.props.task.isItOver) {
      if (this.props.task.completedOn && this.state.deadline) {
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
          case differenceWithDeadline == 0:
            wasTheDeadlineMet = (
              <div className="w-100 justify-content-center row">
                {completedOn}
                <p className="ml-3 text-info">
                  Task completed upon the deadline
                </p>
              </div>
            );
            break;
          case differenceWithDeadline < 0:
            wasTheDeadlineMet = (
              <div className="w-100 justify-content-center row">
                {completedOn}
                <p className="ml-3 text-success">
                  Task completed <b>{differenceWithDeadline * -1} days</b>{" "}
                  before the deadline
                </p>
              </div>
            );
            break;
        }
      }
    }

    taskName = <p className="d-inline">{this.state.name}</p>;
    assignedTo = (
      <p className="font-weight-bold d-inline">{this.state.assignedUserName}</p>
    );

    deadline = (
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

    if (!this.props.isProjectOver && this.props.user.role === "Account") {
      button = (
        <button className="btn btn-info" onClick={this.showInput}>
          Edit task
        </button>
      );
    }

    if (this.state.showButton) {
      taskName = (
        <input
          name="name"
          type="text"
          onChange={this.handleChange}
          value={this.state.name}
        />
      );
      assignedTo = (
        <select
          name="assignedUser"
          className="pt-1 pb-2"
          onChange={this.handleAssignedUser}
        >
          <option
            value={this.props.task.assignedUser}
            className="font-weight-bold"
          >
            Currently: {this.state.assignedUserName}
          </option>
          {this.state.teamMembers.map((user) => {
            return (
              <option key={user._id} value={user.role}>
                {user.role}: {user.name}
              </option>
            );
          })}
        </select>
      );
      deadline = (
        <div className="d-flex align-content-center">
          <label htmlFor="deadline" className="pr-3">
            Deadline:
          </label>
          <input
            type="date"
            name="deadline"
            onChange={this.handleChange}
            value={this.state.deadline}
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
      this.props.user.role === "Account" &&
      !this.props.task.deadline &&
      !this.state.taskUpdated
    ) {
      deadline = (
        <div className="d-flex align-items-center">
          <label htmlFor="deadline" className="pr-3 text-danger">
            Assign a deadline:
          </label>
          <input
            type="date"
            name="deadline"
            onChange={this.handleChange}
            value={this.state.deadline}
            required
          />
        </div>
      );
      button = (
        <button className="btn btn-warning" type="submit">
          Update task
        </button>
      );
    } else if (!this.state.deadline) {
      deadline = (
        <div className="d-flex align-items-center">
          <label className="pr-3">Deadline:</label>
          <p className="font-weight-bold font-italic d-inline">
            As soon as possible
          </p>
        </div>
      );
    }

    if (!this.props.task.firstTask) {
      issueDetected = (
        <button onClick={this.showMessageInput} className="btn btn-danger mx-2">
          Issue detected
        </button>
      );
    }

    if (
      this.props.user.role === this.props.task.assignedUser[0] &&
      this.props.task.activeTask &&
      this.props.task.lastTask
    ) {
      completeTaskButtons = (
        <div className="row justify-content-center mb-2">
          {issueDetected}
          <button
            onClick={this.showResetPhaseVerification}
            className="btn btn-warning mx-2"
          >
            Reset phase
          </button>
          <button
            onClick={this.showPhaseCompleteVerification}
            className="btn btn-success mx-2"
          >
            Phase completed
          </button>
        </div>
      );
    } else if (
      this.props.user.role === this.props.task.assignedUser[0] &&
      this.props.task.activeTask
    ) {
      completeTaskButtons = (
        <div className="row justify-content-center mb-2">
          {issueDetected}
          <button
            onClick={this.showSpentTimeInput}
            className="btn btn-success mx-2"
          >
            Task completed
          </button>
        </div>
      );
    }

    if (this.props.task.activeTask) {
      activeMarker = (
        <p className="d-inline font-italic text-primary"> - Active task</p>
      );
      active = "shadow p-3 mb-3 mt-2 bg-white rounded";
    } else {
      active = "border border-white text-secondary";
    }

    if (this.state.taskNotOk === true) {
      messageInput = (
        <form onSubmit={this.submitTaskAsNotOk} className="text-center">
          <div className="row mb-2 d-flex justify-content-around align-items-center">
            <div className="w-100 d-flex justify-content-center align-items-center">
              <label htmlFor="spentTime" className="pr-3">
                Time spent:
              </label>
              <input
                onChange={this.calculateTotalSpentTime}
                type="time"
                name="inputSpentTime"
                className="pt-1 pb-2 text-center"
                required
              />
              <label htmlFor="message" className="pl-5 pr-3">
                Reason:
              </label>
              <input
                onChange={this.handleChange}
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

    if (this.state.taskIsOk === true) {
      messageInput = (
        <form
          onSubmit={this.submitTaskAsOk}
          className="my-2 d-flex justify-content-center align-items-center"
        >
          {warningMessage}
          <div className="row d-flex justify-content-center align-items-center">
            <label htmlFor="spentTime" className="pr-4">
              Time spent:
            </label>
            <input
              onChange={this.calculateTotalSpentTime}
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

    if (this.props.task.message && !this.props.task.isItOver) {
      message = (
        <div className="">
          <p className="font-weight-bold text-danger mb-0">
            This task was returned.
          </p>
          <p className="font-weight-bold d-inline ml-3">Reason: </p>
          <p className="d-inline font-italic">{this.state.message}</p>
        </div>
      );
    }

    if (this.state.resetPhaseVerification) {
      messageInput = (
        <form onSubmit={this.resetPhase} className="text-center my-2">
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
              onChange={this.calculateTotalSpentTime}
              type="time"
              name="inputSpentTime"
              className="pt-1 pb-2 text-center"
              required
            />
            <label htmlFor="message" className="pl-5 pr-3">
              Client feedback:
            </label>
            <textarea
              onChange={this.handleChange}
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

    if (this.state.phaseCompleteVerification) {
      messageInput = (
        <form onSubmit={this.submitTaskAsOk} className="my-2">
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
              onChange={this.calculateTotalSpentTime}
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
      <div className={` card ${active} ${this.props.hideOldTasks} p-2`}>
        <form onSubmit={this.updateTask}>
          <h5>
            <b>{taskName}</b>
            {activeMarker}
          </h5>
          <div className="pt-1 d-flex justify-content-around">
            <div className="d-flex align-content-center mx-0">
              <label className="pr-3">Assigned to:</label>
              {assignedTo}
            </div>
            {deadline}
            <div className="d-flex align-content-center">
              <label className="pr-3">Time spent:</label>
              <p className="font-weight-bold d-inline">
                {this.state.spentTime} hours
              </p>
            </div>
            {button}
          </div>
          {wasTheDeadlineMet}
          {message}
        </form>
        <div className="row d-flex justify-content-center">
          {completeTaskButtons}
        </div>
        {messageInput}
      </div>
    );
  }
}

export default withAuth(TaskCard);
