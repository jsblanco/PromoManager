import React, { Component } from "react";
import userService from "../lib/user-service";

export default class TaskCard extends Component {
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
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    // if (name==="deadline"){value =

    //   Date.parse(value)

    // }
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

  parseDate(HTMLdate) {
    var b = HTMLdate.split(/\D/);
    return new Date(b[0], --b[1], b[2]);
  }

  render() {
    let button, deadlineInput, deadline, assignedUser;
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
        <label htmlFor="deadline" className="pr-3 text-danger" >
          Assign a deadline:
        </label>
        <input type="date" name="deadline" onChange={this.handleChange} value={this.state.deadline} required/>
      </div>
      );
    }

    

    
    return (
      <div className="my-1 card px-2">
        <h5 className="pt-3">
          <b>Task: </b>
          {this.state.task.name}
        </h5>
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
      </div>
    );
  }
}
