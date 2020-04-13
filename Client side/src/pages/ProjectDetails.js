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
      comments: "",
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

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  addComment = () => {
    const { comments } = this.state;
    const projectId = this.state.project._id;
    userService.postComments({ projectId, comments });
  };

  render() {
    if (this.state.budgetNumber !== this.props.match.params.budgetNumber) {
      this.updateProject();
    }
    let phases,
      createPhaseForm,
      phaseCreatorToggler,
      createPhaseButton,
      editProjectButton,
      comments,
      addComment;
    let projectData = this.state.project;
    if (projectData.phases) {
      let activePhase = projectData.phases.findIndex(
        (phase) => phase.isItOver === false
      );
      if (activePhase > -1) {
        projectData.phases[activePhase].activePhase = true;
      }
      phases = projectData.phases.map((phase) => (
        <PhaseCard
          key={phase._id}
          phase={phase}
          teamMembers={projectData.teamMembers}
          projectId={projectData._id}
        />
      ));
    }
    if (this.state.showPhaseCreator === true) {
      createPhaseForm = <PhaseCreator projectId={this.state.project._id} />;
      phaseCreatorToggler = "Discard new phase";
    } else {
      phaseCreatorToggler = "Add new phase";
    }

    if (this.props.user.role === "Account") {
      createPhaseButton = (
        <button
          className="btn btn-primary my-2 w-100"
          onClick={this.showPhaseCreator}
        >
          {phaseCreatorToggler}
        </button>
      );
      editProjectButton = (
        <Link
          className="btn btn-info"
          to={`/project/${this.state.project.budgetNumber}/edit`}
        >
          {" "}
          Edit project{" "}
        </Link>
      );
    }
    if (this.state.project.comments) {
      if (this.state.project.comments.length > 0) {
        comments = (
          <div id="comment-section">
            {this.state.project.comments.map((comment) => {
              let userName;
              let userOrNot;
              if (this.props.user._id === comment.user) {
                userName = "you";
                userOrNot = "ml-5 bg-success your-comment";
              } else {
                userOrNot = "other-comment mr-5 bg-info";
                this.state.project.teamMembers.map((member) => {
                  if (member._id === comment.user) {
                    userName = `${member.name} (${member.role})`;
                  }
                });
              }
              return (
                <div
                  key={Math.random()}
                  className={`my-1 text-white px-4 py-3 my-4 ${userOrNot} p-2`}
                >
                  <p className="font-weight-bold mt-2">{comment.comments}</p>
                  <p className="font-italic mb-1">By {userName}</p>
                </div>
              );
            })}
          </div>
        );
      } else {
        comments = (
          <div
            id="comment-section"
            className="d-flex justify-content-center align-items-center"
          >
            <p className="text-muted font-italic">
              Be the first to post a comment in this project
            </p>
          </div>
        );
      }
    }

    let isUserATeamMember = this.state.project.teamMembers.findIndex(
      (i) => i._id === this.props.user._id
    );

    if (isUserATeamMember !== -1) {
      addComment = (
        <div>
          <h4 className="mt-4">Add a comment</h4>
          <form className="w-100" onSubmit={this.addComment}>
            <textarea
              onChange={this.handleChange}
              className="d-block w-100 border rounded-lg p-2 bg-light"
              type="text"
              name="comments"
              placeholder="What's on your mind?"
              required
            ></textarea>
            <button className="btn btn-success mt-0 w-100 d-flex align-items-center justify-content-center" type="submit">
              <i className="fas fa-comment text-light m-1 pr-3"></i>Comment{" "}
            </button>
          </form>
        </div>
      );
    }

    return (
      <div className="my-4 row w-100 d-flex flex-row justify-content-around">
        <div className="col-xl-8 col-lg-8 pr-0" id="project-details">
          <header className="px-2">
            <h1 className="px-2">
              {this.state.project.budgetNumber} -
              {this.state.project.name}
            </h1>
            <div className="row mx-2">
              <div className="col-8">
                <p className="d-inline mb-0 mr-3">
                  <b>Client: </b>
                  {this.state.project.client}
                </p>
                <p className="d-inline text-muted font-italic mb-0">
                  {this.state.project.type}
                </p>
                <p>{this.state.project.description}</p>
              </div>
              <div className="col-2 ml-5">{editProjectButton}</div>
            </div>
            <section className="mx-2 px-3 mb-4">
              <h3>Project team:</h3>
              {this.state.project.teamMembers.map((user) => {
                if (user) {
                  return (
                    <p className="d-inline mt-1 mb-3 mr-4" key={user._id}>
                      <b>{user.role}:</b> {user.name}
                    </p>
                  );
                }
              })}
            </section>
          </header>

          <section id="phases" className="mx-2">
            <h3 className="px-4 ">Development phases:</h3>
            {phases}
            {createPhaseForm}
            {createPhaseButton}
          </section>
        </div>
        <div className=" col-xl-3 col-lg-2">
          <h3>Project comments</h3>
          {comments}
          {addComment}
        </div>
      </div>
    );
  }
}

export default withAuth(ProjectDetails);

/*

<div class="my-1 bf-info text-white p-2">
  <p class="font-weight-bold mt-2">{comment}</p>
  <p class="font-italic mb-1">By {{this.userData.name}}</p>
</div>
{{/each}}









*/
