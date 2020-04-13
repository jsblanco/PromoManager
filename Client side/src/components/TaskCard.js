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
  };

  calculateTotalSpentTime=(event)=>{
    let {name, value} = event.target;
    let totalHours = "0"+(parseFloat(this.props.task.spentTime)+ parseFloat(value))
    let totalMinutes= "0"+(parseFloat(parseFloat(this.props.task.spentTime.slice(-2))+ parseFloat(value.slice(-2))))
    if (totalMinutes>60){
      totalHours++;
      totalMinutes-=60
    }
    if (totalHours.length>2){totalHours=totalHours.toString().slice(1)}
    let spentTime = (`${totalHours}:${totalMinutes.toString().slice(-2)}`)
  this.setState({
    spentTime: spentTime,
  })
  } 


  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleAssignedUser=(event)=>{
    let {name, value } =event.target
    console.log(value)
    let assignedUser = value
    this.setState({
      assignedUser: [assignedUser],
    });
  }


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
    let totalTime = new Date(this.state.spentTime) + new Date(this.state.inputSpentTime);
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
      message;

    taskName = <p className="d-inline">{this.state.name}</p>;
    assignedTo = (
      <div className="col-5">
        <label className="pr-3">Assigned to:</label>
        <p className="font-weight-bold d-inline">
          {this.state.assignedUserName}
        </p>
      </div>
    );
    deadline = (
      <div className="col-5">
        <label className="pr-3">Deadline:</label>
        <p className="font-weight-bold d-inline">{this.state.deadline}</p>
      </div>
    );
    if (this.props.user.role === "Account") {
      button = (
        <div className="col-2">
          <button className="btn btn-info" onClick={this.showInput}>
            Edit task
          </button>
        </div>
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
        <div className="col-5">
          <label htmlFor="assignedUser" className="pr-3">
            Assigned to:
          </label>
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
        </div>
      );
      deadline = (
        <div className="col-5">
          <label htmlFor="deadline" className="pr-3">
            Deadline:{" "}
          </label>{" "}
          <input
            type="date"
            name="deadline"
            onChange={this.handleChange}
            value={this.state.deadline}
            required
          />{" "}
        </div>
      );
      button = (
        <div className="col-2">
          <button className="btn btn-warning" type="submit">
            {" "}
            Update task{" "}
          </button>
        </div>
      );
    } else if (
      this.props.user.role === "Account" &&
      !this.props.task.deadline &&
      !this.state.taskUpdated
    ) {
      deadline = (
        <div className="col-5">
          <label htmlFor="deadline" className="pr-3 text-danger">
            {" "}
            Assign a deadline:{" "}
          </label>{" "}
          <input
            type="date"
            name="deadline"
            onChange={this.handleChange}
            value={this.state.deadline}
            required
          />{" "}
        </div>
      );
      button = (
        <div className="col-2">
          <button className="btn btn-warning" type="submit">
            {" "}
            Update task{" "}
          </button>
        </div>
      );
    } else if (!this.state.deadline) {
      deadline = (
        <div className="col-5">
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
      active = "shadow p-3 mb-3 bg-white rounded";
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
        </form>
      );
    }

    if (this.props.task.message) {
      message = (
        <div className="col-12">
          <p className="font-italics d-inline">Comments: </p>
          <p className="d-inline">{this.props.task.message}</p>
        </div>
      );
    }

    if (this.props.task.lastTask) {
    }

    ////////////////////////////
    return (
      <div className={` card ${active} p-2`}>
        <form onSubmit={this.updateTask}>
        <h5>
          <b>{taskName}</b>
          {activeMarker}
        </h5>
        <div className="row pt-1">
          {deadline}
          {assignedTo}
          {this.state.spentTime}
          {button}
        </div>
        {message}
      </form>
        {completeTaskButtons}
        {messageInput}
        </div>
    );
  }
}

export default withAuth(TaskCard);
