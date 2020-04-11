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
    let projectData = this.state.project;
    if (projectData.phases) {
      let activePhase = projectData.phases.findIndex(phase=>(phase.isItOver === false))
      if (activePhase >-1){
        projectData.phases[activePhase].activePhase = true;
      }
      phases = projectData.phases.map((phase) => (
        <PhaseCard key={phase._id} phase={phase} teamMembers={projectData.teamMembers} projectId={projectData._id}/>
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
      <div className="my-4 row">
      <div className="col-lg-8 pr-0">

      <header className="px-2">
        <h1 className="px-2">
          {this.state.project.budgetNumber} - <b>{this.state.project.name}</b>
        </h1>
        <div className="row mx-2">
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
      </header>

        <section id="phases" className="mx-0">
          {phases}
          {createPhaseButton}
          {createPhaseForm}
        </section>
      </div>
      <div className="col-lg-4">
        <h4>Project comments</h4>
      </div>
      </div>
    );
  }
}



export default withAuth(ProjectDetails) 