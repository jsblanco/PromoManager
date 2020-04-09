import React, { Component } from 'react'
import userService from "../lib/user-service";


export default class TaskCreator extends Component {
    state={
        projectId: this.props.projectId,
        phaseId: this.props.phaseId,
        teamMembers: this.props.teamMembers,
        name:"",
        assignedUser: "",
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


    render() {
        return (
            <form onSubmit={this.createNewTask} className="row mt-3">
            <div className="col-2">

              <label>Name:</label>
            <label>Assigned to:</label>
            </div>
            <div className="col-8">
              <input
                className="w-100"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />

              <select
                className="w-100"
                name="assignedUser"
                onChange={this.handleChange}
              >
                <option value="">Select a person</option>
                {this.state.teamMembers.map((user) => {
                    return <option key={user._id} value={user._id}>{user.role}: {user.name}</option>})}
              </select>
            </div>
            <div className="col-2 d-flex align-items-center">
            <input
              type="submit"
              className=" btn btn-success font-weight-bold"
              value="Add task"
            />
            </div>
            </form>
        )
    }
}
