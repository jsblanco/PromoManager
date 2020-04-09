import React, { Component } from 'react'

export default class TaskCard extends Component {
    state={
        projectId: this.props.projectId,
        teamMembers: this.props.teamMembers,
        phaseId: this.props.phaseId,
        index: this.props.index,
        task: this.props.task,
        assignedUser: this.props.assignedUser,
    }
    render() {
        return (
            <div className="my-1 card px-2 py-1">

                <p className="">{this.state.assignedUser}</p>
                <p><b>Task: </b>{this.state.task.name}</p>
            </div>
           
        )
    }
}
