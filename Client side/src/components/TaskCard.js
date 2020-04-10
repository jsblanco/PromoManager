import React, { Component } from "react";
import userService from "../lib/user-service";
import { withAuth } from "../lib/AuthProvider";

class TaskCard extends Component {
  state = {
    projectId: this.props.projectId,
    teamMembers: this.props.teamMembers,
    phaseId: this.props.phaseId,
    index: this.props.index,
    task: this.props.task,
    assignedUserName: this.props.assignedUser,
    assignedUser: this.props.task.assignedUser,
    deadline: this.props.task.deadline,
    showButton: false,
    taskNotOk: false,
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
      showButton: true,
    });
  };

  updateTask = (event) => {
    event.preventDefault();
    const { phaseId, assignedUser, deadline, projectId, index } = this.state;
    // const deadline = this.parseDate(this.state.deadline)
    userService.updateTask({
      phaseId,
      assignedUser,
      deadline,
      projectId,
      index,
    });
    this.setState({
      showButton: false,
    });
  };

  showMessageInput = () => {
    this.setState({
      taskNotOk: !this.state.taskNotOk,
    });
  };

  render() {
    let button,
      deadlineInput,
      taskInformation,
      completeTaskButtons,
      messageInput;
    if (this.state.showButton) {
      button = (
        <button className="btn btn-warning" type="submit">
          Update task
        </button>
      );
    }
    if (this.state.deadline) {
      deadlineInput = (
        <div className="col-5">
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
    } else {
      deadlineInput = (
        <div className="col-5">
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
    }

    if (this.props.user.role === "Account") {
      taskInformation = (
        <form onSubmit={this.updateTask} className="row py-2">
          <div className="col-5">
            <label htmlFor="assignedUser" className="pr-3">
              Assigned to:
            </label>
            <select name="assignedUser" onChange={this.handleChange}>
              <option
                value={this.state.task.assignedUser}
                className="font-weight-bold"
              >
                Currently: {this.state.assignedUserName}
              </option>

              {this.state.teamMembers.map((user) => {
                return (
                  <option key={user._id} value={user._id}>
                    {user.role}: {user.name}
                  </option>
                );
              })}
            </select>
          </div>
          {deadlineInput}
          <div className="col-2 float-right">{button}</div>
        </form>
      );
    } else {
      taskInformation = (
        <form onSubmit={this.updateTask} className="row py-2">
          <div className="col-5">
            <label className="pr-3">Assigned to:</label>
            <p className="font-weight-bold d-inline">
              {this.state.assignedUserName}
            </p>
          </div>

          <div className="col-5">
            <label className="pr-3">Deadline:</label>
            <p className="font-weight-bold d-inline">
              {this.state.task.deadline}
            </p>
          </div>

          <div className="col-2 float-right">{button}</div>
        </form>
      );
    }

    if (this.props.user._id === this.state.task.assignedUser) {
      completeTaskButtons = (
        <div className="row justify-content-center mb-2">
          <button className="btn btn-success mx-2">Task completed</button>
          <button
            onClick={this.showMessageInput}
            className="btn btn-danger mx-2"
          >
            Issue detected
          </button>

        </div>
      );
    }

    if (this.state.taskNotOk === true) {
      messageInput = (
        <div className="row mb-2">
          <div className="col-8">
            <input type="text" name="message" className="w-100 pt-1 pb-2" placeholder="Describe the problem to your colleague" required />
          </div>
          <div className="col-4">
            <button className="btn btn-danger">
              Return to previous team member
            </button>
          </div>
        </div>
      );
    }

    ////////////////////////////
    return (
      <div className="my-1 card px-2">
        <h5 className="pt-3">
          <b>Task: </b>
          {this.state.task.name}
        </h5>
        {taskInformation}
        {completeTaskButtons}
        {messageInput}
      </div>
    );
  }
}

export default withAuth(TaskCard);
