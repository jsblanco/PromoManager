import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import userService from "../lib/user-service";

export default class ProjectDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {teamMembers:[]},
        };
      }


componentDidMount= async()=>{
    let budgetNumber = this.props.match.params.budgetNumber
    let project = await userService.getProject(budgetNumber);
    this.setState({
      project: project,
      budgetNumber: budgetNumber,
    });
}

updateProject = async () => {
    let budgetNumber = this.props.match.params.budgetNumber;
        let project = await userService.getProject(budgetNumber);
        this.setState({
          project: project,
          budgetNumber: budgetNumber,
        });}
      


    render() {
        if (this.state.budgetNumber !== this.props.match.params.budgetNumber){this.updateProject()}
        return (
            <div>
                <h1>{this.state.project.budgetNumber} - <b>{this.state.project.name}</b></h1>
                <p className="d-inline mb-0 mr-3"><b>Cliente: </b>{this.state.project.client}</p><p className="d-inline text-muted font-italic mb-0">{this.state.project.type}</p>
                <p>{this.state.project.description}</p>
                <section>
                <h3>Project team:</h3>
                 {this.state.project.teamMembers.map((user) => {if (user){ return <p key={user._id}><b>{user.role}:</b> {user.name}</p>}})}
                </section>
            </div>
        )
    }
}
