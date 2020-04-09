import React, { Component } from 'react'
import TaskCreator from './TaskCreator';

export default class PhaseCard extends Component {
    state={
        teamMembers:this.props.teamMembers,
        phase: this.props.phase,
        addTaskToggler: false,
        projectId: this.props.projectId,
    }
    
    showTaskCreator=()=>{
        this.setState({
            addTaskToggler: !this.state.addTaskToggler
        })
    }

    render() {
        let createTaskForm, taskCreatorToggler;
        let isItOver =<div><p className="d-inline rounded-pill bg-warning px-3 py-1 text-dark"></p><p className="d-inline">This phase is still ongoing</p></div>
        if (this.state.phase.isItOver){isItOver= <p className="rounded-pill bg-success p-3 text-light">This phase is over!</p>}
      if (this.state.addTaskToggler===true){createTaskForm= <TaskCreator phaseId={this.state.phase._id} teamMembers={this.state.teamMembers} projectId={this.state.projectId}/>; taskCreatorToggler= "Discard new task"} else {taskCreatorToggler="Add new task"}
      
      
      return (
          <div className="card p-4">
                <h4 className="d-inline">{this.state.phase.name}</h4>
                {isItOver}
        <button className="btn btn-info py-1" onClick={this.showTaskCreator}>{taskCreatorToggler}</button>
                {createTaskForm}
            </div>
        )
    }
}