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
    name: this.props.task.name,
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
    });
  };

  updateTask = (event) => {
 //   event.preventDefault();
    const { phaseId, name, assignedUser, deadline, projectId, index } = this.state;
    userService.updateTask({
      phaseId,
      name,
      assignedUser,
      deadline,
      projectId,
      index,
    });
    this.setState({
      showButton: false,
    });
  };

  showMessageInput = (event) => {
    event.preventDefault();
    this.setState({
      taskNotOk: !this.state.taskNotOk,
    });
  };

  showInput=(event)=>{
    event.preventDefault();
    this.setState({
      showButton: !this.state.showButton
    })
  }

  render() {
    let button,
      taskName,
      assignedTo,
      deadline,
      active,
      completeTaskButtons,
      messageInput,
      activeMarker,
      message;

      taskName = <p className="d-inline">{this.state.task.name}</p>
      assignedTo = <div className="col-5"><label className="pr-3">Assigned to:</label><p className="font-weight-bold d-inline">{this.state.assignedUserName}</p></div>
      deadline =<div className="col-5"><label className="pr-3">Deadline:</label><p className="font-weight-bold d-inline">{this.state.task.deadline}</p></div>
      if (this.props.user.role ==="Account"){
      button = <div className="col-2"><button className="btn btn-info" onClick={this.showInput}>Edit task</button></div>}

      if (this.state.showButton){
      taskName = <input name="name" type="text" onChange={this.handleChange} value={this.state.name}/>
      assignedTo = <div className="col-5"><label htmlFor="assignedUser" className="pr-3">Assigned to:</label><select name="assignedUser"  className="pt-1 pb-2" onChange={this.handleChange}><option value={this.state.task.assignedUser}className="font-weight-bold">Currently: {this.state.assignedUserName}</option>{this.state.teamMembers.map((user) => {return (<option key={user._id} value={user._id}>{user.role}: {user.name}</option>);})}</select></div>;
      deadline = <div className="col-5"><label htmlFor="deadline" className="pr-3">Deadline: </label> <input type="date" name="deadline" onChange={this.handleChange} value={this.state.deadline} required/> </div>
      button = <div className="col-2"><button className="btn btn-warning" type="submit"> Update task </button></div>
    } else if (!this.state.task.deadline && this.props.user.role==="Account"){
      deadline = <div className="col-5"><label htmlFor="deadline" className="pr-3 text-danger"> Assign a deadline: </label> <input type="date" name="deadline" onChange={this.handleChange} value={this.state.deadline} required/> </div>
      button = <div className="col-2"><button className="btn btn-warning" type="submit"> Update task </button></div>
    } else if (!this.state.task.deadline) {
      deadline = <div className="col-5"><label className="pr-3">Deadline:</label><p className="font-weight-bold font-italic d-inline">As soon as possible</p></div>
    }


    if (this.props.user._id === this.state.task.assignedUser && this.state.task.activeTask) {
      completeTaskButtons = (
        <div className="row justify-content-center mb-2">
          <button onClick={this.showMessageInput} className="btn btn-danger mx-2">Issue detected</button>
          <button className="btn btn-success mx-2">Task completed</button>
        </div>
      );
    }

  if (this.state.task.activeTask){
    activeMarker = <p className="d-inline font-italic text-primary"> - Active task</p>
    active="shadow p-3 mb-3 bg-white rounded";
  } else {
    active="border border-light text-secondary"
  } 

    if (this.state.taskNotOk === true) {
      messageInput = (
        <div className="row mb-2">
          <div className="col-8">
            <input type="text" name="message" className="w-100 pt-1 pb-2" placeholder="Describe the problem to your colleague" required />
          </div>
          <div className="col-4">
            <button className="btn btn-danger">
              Return to previous user
            </button>
          </div>
        </div>
      );
    }

    if (this.state.task.message){
      message= <div clasName="col-12"><p className="font-italics d-inline">Comments: </p>
      <p className="d-inline">{this.state.task.message}</p></div>
    }


    ////////////////////////////
    return (
      <form onSubmit={this.updateTask} className={` card ${active} p-2`}>
        <h5>
          <b>
          {taskName}
          </b>
          {activeMarker}
        </h5>
        <div className="row pt-1">
        {deadline}
        {assignedTo}
        {button}
        </div>
        {message}
        {completeTaskButtons}
        {messageInput}
      </form>
    );
  }
}

export default withAuth(TaskCard);
