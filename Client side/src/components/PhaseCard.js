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
      showResetHistory: false,
    };
  }

  componentDidUpdate=()=>{
    if (this.props.phase !== this.state.phase){
      this.setState({
        phase: this.props.phase,
      })
    }
  }

  showResetHistory = () => {
    this.setState({
      showResetHistory: !this.state.showResetHistory,
    });
  };

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
    return this.createTaskCards(
      this.state.phase.tasks.slice(-this.state.phase.basicTasks.length)
    );
  };

  createTaskCards(taskArray) {
    if (!this.state.hideTasks){
    let assignedUserName = "";
    if (this.state.phase.activePhase && this.state.phase.tasks) {
      let activeTaskIndex = this.state.phase.tasks.findIndex(
        (task) => !task.isItOver
      );
      if (activeTaskIndex > -1) {
        this.state.phase.tasks[activeTaskIndex].activeTask = true;
      }
    }

      
    return taskArray.map((task) => {
      let index = taskArray.indexOf(task)
      let assignedUserIndex = this.state.teamMembers.findIndex(
        (member) => member.role == task.assignedUser[0]
      );
      assignedUserName = `${this.state.teamMembers[assignedUserIndex].role}: ${this.state.teamMembers[assignedUserIndex].name}`;      
      let hideOldTasks = ""
      if (!this.state.showResetHistory){
          if (taskArray.length-(taskArray.indexOf(task)) > this.state.phase.basicTasks.length){
            hideOldTasks = "d-none"
          }
      }

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
          hideOldTasks={hideOldTasks}
          reloadPage={this.props.reloadPage}
        />
      );
    });
  }}

  render() {
    let createTaskForm,
      createTaskButton,
      taskCreatorToggler,
      tasks,
      showTasks,
      resetToggler;
    let isItOver;

    if (this.props.phase.isItOver && this.state.hideTasks) {
      showTasks = (
        <button
          onClick={this.showTasks}
          className="btn btn-light bg-white border-white text-info font-italic"
        >
          Tasks were hidden because phase is completed -<b>Show tasks anyway</b>
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
          <p className="d-inline font-italic">This phase is still ongoing</p>
        </div>
      );
    } else if (this.state.phase.isItOver) {
      isItOver = (
        <div className="mb-2">
          <p className="d-inline rounded-pill bg-success px-2 mr-3  text-dark"></p>
          <p className="d-inline font-weight-bold">This phase is over!</p>
        </div>
      );
    } else {
      isItOver = (
        <div className="mb-2">
          <p className="d-inline font-italic">This phase has not started yet</p>
        </div>
      );
    }

    if (this.state.phase.tasks) {
      switch (true) {
        case this.state.phase.tasks.length ===
          this.state.phase.basicTasks.length:
          resetToggler = (
            <div className="d-flex justify-content-left font-italic text-secondary">
              Current round: <b className="text-dark mx-2">1</b>
            </div>
          );
          break;
        case this.state.phase.tasks.length > this.state.phase.basicTasks.length:
          resetToggler = (
            <div className="d-flex justify-content-left align-items-center font-italic text-secondary">
              Current round:
              <b className="text-dark ml-1 mr-2">
                {this.state.phase.tasks.length /
                  this.state.phase.basicTasks.length}
              </b>
              <button
                className="ml-2 btn btn-outline-info"
                onClick={this.showResetHistory}
              >
                Show history
              </button>
            </div>
          );
          break;
        default:
          break;
      }
    }
    

    if (this.state.phase.tasks){
      tasks = <div>{this.createTaskCards(this.state.phase.tasks)}</div>;
    }
    /*
    if (this.state.phase.tasks && !this.state.hideTasks) {
      if (this.state.showResetHistory) {
      } else {
        tasks = (
          <div>
            {this.createTaskCards(
              this.state.phase.tasks.slice(-this.state.phase.basicTasks.length)
            )}
          </div>
        );
      }
    }
*/

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
          <div className="col-md-6">
            <h4 className="d-inline">{this.state.phase.name}</h4>
          </div>
          <div className="col-md-3">{resetToggler}</div>
          <div className="col-md-3">{isItOver}</div>
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
