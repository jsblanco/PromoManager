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
import Home from "./pages/Home";

class App extends Component {
  state = {
    userData: { ongoingProjects: [] },
    loaded: false,
    booleanForUpdate: false,
    pastProjectsFetched: false,
  };

  componentDidMount = async () => {
    if (this.props.user) {
      let userData = await userService.getUserData(this.props.user._id);
      this.setState({
        userData: userData,
        loaded: true,
        booleanForUpdate: false,
        showFinishedProjects: false,
      });
    }
    this.populateProjectSidebar();
  };

  showFinishedProjects = async () => {
    if (!this.state.pastProjectsFetched){
      let finishedProjects = await userService.getFinishedProjects(this.props.user._id)
      let userData = this.state.userData;
      console.log('finishedProjects :', finishedProjects);
      userData.finishedProjects = finishedProjects.finishedProjects
      console.log('userData :', userData);

      this.setState({
        userData: userData,
        pastProjectsFetched: true,
        showFinishedProjects: !this.state.showFinishedProjects,
      })
    } else {
      this.setState({
        showFinishedProjects: !this.state.showFinishedProjects,
      })
    }
  };

  shouldComponentUpdate = async () => {
    return this.state.booleanForUpdate;
  };

  updateApp = () => {
    this.setState({
      booleanForUpdate: true,
    });
  };

  populateProjectSidebar = () => {
    let projectsInSidebar;
    this.state.showFinishedProjects === true
      ? (projectsInSidebar = "finishedProjects")
      : (projectsInSidebar = "ongoingProjects");
   //   console.log(this.state.userData[projectsInSidebar])
    const sortedProject = this.state.userData[projectsInSidebar]
      .map((project) => {
        let activePhase = project.phases.findIndex((phase) => !phase.isItOver);
        if (activePhase > -1) {
          project.phases[activePhase].activePhase = true;
          if (project.phases[activePhase].tasks) {
            let activeTaskIndex = project.phases[activePhase].tasks.findIndex(
              (task) => !task.isItOver
            );
            if (activeTaskIndex > -1) {
              project.currentRole =
                project.phases[activePhase].tasks[
                  activeTaskIndex
                ].assignedUser[0];
              project.phases[activePhase].tasks[
                activeTaskIndex
              ].activeTask = true;
              if (
                project.phases[activePhase].tasks[activeTaskIndex].deadline !=
                undefined
              ) {
                project.deadline =
                  project.phases[activePhase].tasks[activeTaskIndex].deadline;
              } else {
                project.deadline = "As soon as possible";
              }
            } else {
              project.currentRole = "Account";
            }
            if (project.phases[activePhase].tasks[activeTaskIndex]) {
              if (
                project.phases[activePhase].tasks[activeTaskIndex]
                  .assignedUser[0] == this.props.user.role
              ) {
                project.pendingTask =
                  project.phases[activePhase].tasks[activeTaskIndex];
                project.pendingTask.index = activeTaskIndex;
                project.pendingTask.phaseId = project.phases[activePhase]._id;
              }
            }
          }
        }
        return project;
      })
      .sort((a, b) => {
        if (
          a.currentRole == this.props.user.role &&
          b.currentRole != this.props.user.role
        ) {
          return -1;
        }
        if (
          a.currentRole != this.props.user.role &&
          b.currentRole == this.props.user.role
        ) {
          return 1;
        }
        if (new Date(a.deadline).getTime() < new Date(b.deadline).getTime) {
          return 1;
        }
        if (new Date(a.deadline).getTime() > new Date(b.deadline).getTime) {
          return -1;
        }
      });

    if (sortedProject.phases) {
      if (sortedProject.phases[sortedProject.phases.length - 1].tasks) {
        sortedProject.phases[sortedProject.phases.length - 1].tasks[
          sortedProject.phases[sortedProject.phases.length - 1].tasks.length - 1
        ].lastTaskInTheProject = true;
      }
    }

    return sortedProject.map((project) => (
      <ProjectList project={project} key={project.budgetNumber} />
    ));
  };

  render() {
    let projects, newProject, toggleProjects;
    const { isLoggedin } = this.props;
    if (this.state.loaded === true && isLoggedin) {
      projects = this.populateProjectSidebar();
      if (
        this.state.booleanForUpdate == true ||
        this.state.userData.ongoingProjects.length !==
          this.props.user.ongoingProjects.length
      ) {
        this.populateProjectSidebar();
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
    }

    toggleProjects = (
      <button
        className="list-group-item list-group-item-action bg-info text-light"
        onClick={this.showFinishedProjects}
      >
        Show finished projects
      </button>
    );

    if (this.state.showFinishedProjects === true) {
      toggleProjects = (
        <button
          className="list-group-item list-group-item-action bg-info text-light"
          onClick={this.showFinishedProjects}
        >
          Show ongoing projects
        </button>
      );
    }

    return (
      <div className="">
        <Navbar pendingTasks={this.state.userData.ongoingProjects} />
        <div className="row ">
          <div className="col-xl-2 col-lg-3 col-sm-4 list-group project-list pr-0 overflow-auto">
            <div>
              {newProject}
              {toggleProjects}
              {projects}
            </div>
          </div>

          <div className="col-xl-10 col-lg-9 col-sm-8">
            <Switch>
              <AnonRoute exact path="/signup" component={Signup} />
              <AnonRoute exact path="/login" component={Login} />
              <PrivateRoute
                exact
                path="/project/new"
                component={NewProject}
                updateApp={this.updateApp}
              />
              <PrivateRoute
                exact
                path="/project/:budgetNumber/details"
                component={ProjectDetails}
              />
              <PrivateRoute
                exact
                path="/project/:budgetNumber/edit"
                component={ProjectEdit}
                updateApp={this.updateApp}
              />
              <PrivateRoute
                exact
                path="/"
                pendingTasks={this.state.userData.ongoingProjects}
                component={Home}
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(App);
