import React, { Component } from 'react'
import userService from "../lib/user-service";


export default class TaskCreator extends Component {
    state={
        projectId: this.props.projectId,
        phaseId: this.props.phaseId,
        teamMembers: this.props.teamMembers,
        name:"",
        assignedUser: [""],
    }


  createNewTask = () => {
    const {phaseId, name, assignedUser, projectId}= this.state;  
    userService.createTask({phaseId, name, assignedUser, projectId})
};


    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,          
          });
        };

        handleUserChange = (event) => {
          const { value } = event.target;
          let assignedUser = [value]
          this.setState({
              assignedUser: assignedUser,          
            });
          };
  

    render() {
        return (
          <div className="shadow p-3 mt-3 mb-4 bg-white rounded border">
            <form onSubmit={this.createNewTask} className=" row mt-3 d-flex justify-content-center align-items-center">
            <div className="col-9">
          <div className="row d-flex justify-content-center align-items-center mb-1">
              <p className="font-weight-bold pr-4 mb-0">Task name:</p>
              <input
                className="w-75"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-1">
            <p className="font-weight-bold mb-0 pr-3">Assigned to:</p>

              <select
                className="w-75 py-1"
                name="assignedUser"
                onChange={this.handleUserChange}
              >
                <option value="">Select a role</option>
                {this.state.teamMembers.map((user) => {
                    return <option key={user.role} value={[user.role]}>{user.role}</option>})}
              </select>
            </div>
            </div>
            <div className="col-2 d-flex align-items-center">
            <input
              type="submit"
              className=" btn btn-success px-4 py-2 font-weight-bold"
              value="Add task"
            />
            </div>
            </form>
            </div>
        )
    }
}
