import React, { Component } from "react";
import { Switch, NavLink } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import userService from "../lib/user-service";
import ProjectList from "../components/ProjectList";
import PrivateRoute from "../components/PrivateRoute";
import NewProject from "../pages/NewProject";
import ProjectDetails from "../pages/ProjectDetails";
import ProjectEdit from "../pages/ProjectEdit";

export default class Home extends Component {
  state = {
    userData: { ongoingProjects: [] },
    loaded: false,
  };

  fetchProjects = async () => {
    let userData = await userService.getUserData(this.props.user._id);
    this.setState({
      userData: userData,
      loaded: true,
    });
  };

  render() {
    let projects, newProject;

    if (this.state.user){
       this.fetchProjects()
    }

    if (this.state.loaded === true && this.props.user===true) {
      projects = this.state.userData.ongoingProjects.map((project) => (
        <ProjectList project={project} key={project.budgetNumber} />
      ));
    }


    if (this.props.user.role === "Account") {
      newProject = (
        <NavLink
          className="list-group-item list-group-item-action bg-success text-light"
          to={`/project/new`}
          activeClassName="active"
        >
          Create a new project
        </NavLink>
      );
    }

    return (
      <div className="row w-100">
        <div className="col-xl-2 col-lg-3 col-sm-4 list-group">
          {newProject}
          {projects}
        </div>

        <div className="col-xl-8 col-lg-7 col-sm-6">
          <Switch>
            <PrivateRoute exact path="/project/new" component={NewProject} />
            <PrivateRoute
              exact
              path="/project/:budgetNumber/details"
              component={ProjectDetails}
            />
            <PrivateRoute
              exact
              path="/project/:budgetNumber/edit"
              component={ProjectEdit}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
