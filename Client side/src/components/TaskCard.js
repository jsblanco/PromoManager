import React, { Component } from 'react'

export default class TaskCard extends Component {
    state={
        projectId: this.props.projectId,
        phaseId: this.props.phaseId,
        index: this.props.index,
        task: this.props.task,
    }
    render() {
        return (
            <div className="my-1 card">
                <p>{this.state.task.name}</p>
            </div>
        )
    }
}
