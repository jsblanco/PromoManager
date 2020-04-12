import React, { Component } from "react";
import "./App.css";
import { Switch, NavLink } from "react-router-dom";

import { withAuth } from "./lib/AuthProvider";
import "bootstrap/dist/css/bootstrap.css";

import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import userService from "./lib/user-service";
import ProjectList from "./components/ProjectList";
import NewProject from "./pages/NewProject";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectEdit from "./pages/ProjectEdit";

class App extends Component {
  state = {
    userData: { ongoingProjects: [] },
    loaded: false,
  };
 
  

  componentDidMount = async () => {
    if (this.props.user){
    let userData = await userService.getUserData(this.props.user._id);
    this.setState({
      userData: userData,
      loaded: true,
    });} 
  };

  
componentDidUpdate=async ()=> {
  return this.populateProjectSidebar
}
  


populateProjectSidebar=()=>{

  let sortedProjects = this.state.userData.ongoingProjects.map(project=>{
    let activePhase = project.phases.findIndex(
      (phase) => !phase.isItOver
    );
    if (activePhase > -1) {
      project.phases[activePhase].activePhase = true;
      if (project.phases[activePhase].tasks) {
        let activeTaskIndex = project.phases[activePhase].tasks.findIndex(
          (task) => !task.isItOver
        );
        if (activeTaskIndex > -1) {
          project.currentRole = project.phases[activePhase].tasks[activeTaskIndex].assignedUser[0];
          project.phases[activePhase].tasks[activeTaskIndex].activeTask = true;
        } else {
          project.currentRole = "Account"
        }
      }
    }
  })
  return this.state.userData.ongoingProjects.map((project) => (
    <ProjectList project={project} key={project.budgetNumber} />
  ));
}

  render() {
    let projects, newProject;
    const { isLoggedin } = this.props;
    if (this.state.loaded === true && isLoggedin) {
      projects= this.populateProjectSidebar()
      if (this.state.userData.ongoingProjects.length !== this.props.user.ongoingProjects.length){this.populateProjectSidebar()}
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
    }

    return (
     <div>
        <Navbar />
        <div className="row ">
          <div className="col-xl-2 col-lg-3 col-sm-4 list-group pr-0">
            {newProject}
            {projects}
          </div>

          <div className="col-xl-10 col-lg-11 col-sm-8">
            <Switch>
              <AnonRoute exact path="/signup" component={Signup} />
              <AnonRoute exact path="/login" component={Login} />
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
      </div>
    );
  }
}

export default withAuth(App);
