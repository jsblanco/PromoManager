import React, { Component } from "react";
import TaskCreator from "./TaskCreator";
import TaskCard from "./TaskCard";
import { withAuth } from "../lib/AuthProvider";

 class PhaseCard extends Component {

  state = {
    teamMembers: this.props.teamMembers,
    phase: this.props.phase,
    addTaskToggler: false,
    projectId: this.props.projectId,
  };

  showTaskCreator = () => {
    this.setState({
      addTaskToggler: !this.state.addTaskToggler,
    });
  };

  render() {
    let createTaskForm, createTaskButton, taskCreatorToggler, tasks;
    let isItOver = (
      <div className="mb-2">
        <p className="d-inline rounded-pill bg-warning px-2 mr-3  text-dark"></p>
        <p className="d-inline">This phase is still ongoing</p>
      </div>
    );

    if (this.state.phase.isItOver) {
      isItOver = (
        <p className="rounded-pill bg-success p-3 text-light">
          This phase is over!
        </p>
      );
    }

    if (this.state.phase.tasks) {
      let index = -1;
      let assignedUser = ""

      
      let projectPhase = this.state.phase;
      if (projectPhase.activePhase && projectPhase.tasks){
      let activeTaskIndex = projectPhase.tasks.findIndex(task=>(!task.isItOver))
      if (activeTaskIndex >-1){
          projectPhase.tasks[activeTaskIndex].activeTask = true;
        }}

      console.log(projectPhase.tasks)
      tasks = this.state.phase.tasks.map((task) => {
        this.state.teamMembers.map(teamMember=>{
            if (teamMember._id === task.assignedUser){
                assignedUser=`${teamMember.role}: ${teamMember.name}`
            }
        })
        index++;
        return <TaskCard
          index={index}
          projectId={this.state.projectId}
          phaseId={this.state.phase._id}
          teamMembers={this.state.teamMembers}
          assignedUser={assignedUser}
          task={task}
        />;
      });
    }

    if (this.props.user.role==="Account"){
      createTaskButton= <button className="btn btn-info py-1" onClick={this.showTaskCreator}>Add a new task</button>
    }

    if (this.state.addTaskToggler === true) {
      createTaskForm = (
        <TaskCreator
          phaseId={this.state.phase._id}
          teamMembers={this.state.teamMembers}
          projectId={this.state.projectId}
        />
      );
      taskCreatorToggler = "Discard new task";
    } else {
      taskCreatorToggler = "Add new task";
    }

    return (
      <div className="card p-4 my-2">
        <h4 className="d-inline">{this.state.phase.name}</h4>
        {isItOver}
        {tasks}
        {createTaskButton}
        {createTaskForm}
      </div>
    );
  }
}


export default withAuth(PhaseCard) 