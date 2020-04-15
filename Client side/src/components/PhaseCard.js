import React, { Component } from "react";
import TaskCreator from "./TaskCreator";
import TaskCard from "./TaskCard";
import { withAuth } from "../lib/AuthProvider";

class PhaseCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: this.props.teamMembers,
      phase: this.props.phase,
      addTaskToggler: false,
      projectId: this.props.projectId,
      hideTasks: this.props.phase.isItOver,
    };
  }

  showTaskCreator = () => {
    this.setState({
      addTaskToggler: !this.state.addTaskToggler,
    });
  };

  showTasks = () => {
    this.setState({
      hideTasks: !this.state.hideTasks,
    });
  };

  populateTasks = () => {
    let assignedUserName = "";
    let projectPhase = this.state.phase;
    if (projectPhase.activePhase && projectPhase.tasks) {
      let activeTaskIndex = projectPhase.tasks.findIndex(
        (task) => !task.isItOver
      );
      if (activeTaskIndex > -1) {
        projectPhase.tasks[activeTaskIndex].activeTask = true;
      }
    }

    let index =
      this.state.phase.tasks.length - (this.state.phase.basicTasks.length + 1);
    return this.state.phase.tasks
      .slice(-this.state.phase.basicTasks.length)
      .map((task) => {
        let assignedUserIndex = this.state.teamMembers.findIndex(
          (member) => member.role == task.assignedUser[0]
        );
        assignedUserName = `${this.state.teamMembers[assignedUserIndex].role}: ${this.state.teamMembers[assignedUserIndex].name}`;
        index++;
        if (index === this.state.phase.tasks.length - 1) {
          task.lastTask = true;
        }
        if (
          index ===
          this.state.phase.tasks.length - this.state.phase.basicTasks.length
        ) {
          task.firstTask = true;
        }

        return (
          <TaskCard
            key={index}
            index={index}
            projectId={this.state.projectId}
            phaseId={this.state.phase._id}
            teamMembers={this.state.teamMembers}
            assignedUserName={assignedUserName}
            isProjectOver={this.props.isProjectOver}
            isPhaseOver={this.state.phase.isItOver}
            task={task}
          />
        );
      });
  };

  render() {
    let createTaskForm, createTaskButton, taskCreatorToggler, tasks, showTasks;
    let isItOver;

    if (this.props.phase.isItOver && this.state.hideTasks) {
      showTasks = (
        <button
          onClick={this.showTasks}
          className="btn btn-light bg-white border-white text-info font-italic"
        >
          Tasks were hidden because phase is completed - <b>Show tasks anyway</b>
        </button>
      );
    } else if (this.props.phase.isItOver && !this.state.hideTasks) {
      showTasks = (
        <button
          onClick={this.showTasks}
          className="btn btn-light bg-white border-white text-info font-italic"
        >
          Hide tasks
        </button>
      );
    }

    if (this.state.phase.activePhase) {
      isItOver = (
        <div className="mb-2">
          <p className="d-inline rounded-pill bg-warning px-2 mr-3  text-dark"></p>
          <p className="d-inline">This phase is still ongoing</p>
        </div>
      );
    } else if (this.state.phase.isItOver) {
      isItOver = (
        <div className="mb-2">
          <p className="d-inline rounded-pill bg-success px-2 mr-3  text-dark"></p>
          <p className="d-inline">This phase is over!</p>
        </div>
      );
    } else {
      isItOver = (
        <div className="mb-2">
          <p className="d-inline">This phase has not started yet</p>
        </div>
      );
    }

    if (this.state.phase.tasks && !this.state.hideTasks) {
      tasks = <div>{this.populateTasks()}</div>;
    }

    if (this.state.addTaskToggler) {
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

    if (this.props.user.role === "Account" && !this.state.phase.isItOver) {
      createTaskButton = (
        <button className="btn btn-info py-1" onClick={this.showTaskCreator}>
          {taskCreatorToggler}
        </button>
      );
    }

    return (
      <div className="shadow p-3 mb-3 card bg-white rounded p-4 my-2">
        <div className="row pb-2">
          <div className="col-md-8">
            <h4 className="d-inline">{this.state.phase.name}</h4>
          </div>
          <div className="col-md-4">{isItOver}</div>
        </div>
        {tasks}
        {createTaskForm}
        {createTaskButton}
        {showTasks}
      </div>
    );
  }
}

export default withAuth(PhaseCard);
