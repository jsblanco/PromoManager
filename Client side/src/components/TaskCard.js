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
    deadline: this.props.deadline,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  updateTask = () => {
    const {phaseId, assignedUser, deadline, projectId, index}= this.state;  
    userService.updateTask({phaseId, assignedUser, deadline, projectId, index})
};




  render() {
    return (
      <div className="my-1 card px-2 py-1">
        <p>
          <b>Task: </b>
          {this.state.task.name}
        </p>
        <form onSubmit={this.updateTask} className="row">
          <div className="col-5">
            <select
              className="w-100"
              name="assignedUser"
              onChange={this.handleChange}
            >
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
          <div className="col-5">
            <label htmlFor="deadline" >
              Deadline:
            </label>
            <input type="date" name="deadline" onChange={this.handleChange} value={this.state.deadline} required/>
          </div>
          <div className="col-2 float-right">
            <button className="btn btn-warning" type="submit">
              Update task
            </button>
          </div>
        </form>
      </div>
    );
  }
}
