import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import userService from "../lib/user-service";
import PhaseCreator from "../components/PhaseCreator";
import PhaseCard from "../components/PhaseCard";

class ProjectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: { teamMembers: [] },
      showPhaseCreator: false,
    };
  }

  componentDidMount = async () => {
    let budgetNumber = this.props.match.params.budgetNumber;
    let project = await userService.getProject(budgetNumber);
    this.setState({
      project: project,
      budgetNumber: budgetNumber,
    });
  };

  updateProject = async () => {
    let budgetNumber = this.props.match.params.budgetNumber;
    let project = await userService.getProject(budgetNumber);
    this.setState({
      project: project,
      budgetNumber: budgetNumber,
    });
  };

  showPhaseCreator = () => {
    this.setState({
      showPhaseCreator: !this.state.showPhaseCreator,
    });
  };

  render() {
    if (this.state.budgetNumber !== this.props.match.params.budgetNumber) {
      this.updateProject();
    }
    let phases, createPhaseForm, phaseCreatorToggler, createPhaseButton, editProjectButton;
    if (this.state.project.phases) {
      phases = this.state.project.phases.map((phase) => (
        <PhaseCard key={phase._id} phase={phase} teamMembers={this.state.project.teamMembers} projectId={this.state.project._id}/>
      ));
    }
    if (this.state.showPhaseCreator === true) {
      createPhaseForm = <PhaseCreator projectId={this.state.project._id} />;
      phaseCreatorToggler = "Discard new phase";
    } else {
      phaseCreatorToggler = "Add new phase";
    }

    if (this.props.user.role ==="Account"){
      createPhaseButton = <button className="btn btn-primary my-2 w-100" onClick={this.showPhaseCreator}>{phaseCreatorToggler}</button>
      editProjectButton = <Link className="btn btn-info" to={`/project/${this.state.project.budgetNumber}/edit`} >  Edit project  </Link>
    }

    return (
      <div>
        <h1>
          {this.state.project.budgetNumber} - <b>{this.state.project.name}</b>
        </h1>
        <div className="row">
          <div className="d-inline">
            <p className="d-inline mb-0 mr-3">
              <b>Cliente: </b>
              {this.state.project.client}
            </p>
            <p className="d-inline text-muted font-italic mb-0">
              {this.state.project.type}
            </p>
            <p>{this.state.project.description}</p>
          </div>
          <div className="d-inline ml-5">
            {editProjectButton}
          </div>
        </div>
        <section>
          <h3>Project team:</h3>
          {this.state.project.teamMembers.map((user) => {
            if (user) {
              return (
                <p key={user._id}>
                  <b>{user.role}:</b> {user.name}
                </p>
              );
            }
          })}
        </section>

        <section id="phases">
          {phases}
          {createPhaseButton}
          {createPhaseForm}
        </section>
      </div>
    );
  }
}



export default withAuth(ProjectDetails) 