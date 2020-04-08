import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import userService from "../lib/user-service";

export default class ProjectDetails extends Component {
state={
    project: {}
}
    componentDidMount = async () => {
       // let id = this.props.projectId
        let project = await userService.getProject("5e8e03ae22240853db5be3cc");
        this.setState({
          project: project,
        });
      };


    render() {
        return (
            <div>
                <h1>{this.state.project.name}</h1>
            </div>
        )
    }
}
