import React, { Component, useState, useEffect } from "react";
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

const App = (props) => {
  const [userData, setUserData] = useState({ ongoingProjects: [] });
  const [loaded, setLoaded] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [showFinishedProjects, setShowFinishedProjects] = useState(false);
  const [pastProjectsFetched, setpastProjectsFetched] = useState(false);
  const [searchQuery, setsearchQuery] = useState("");

  useEffect(() => {
    if (isUpdated === false) {
      loadUserData().then(() => {
        populateProjectSidebar();
        setIsUpdated(true);
      });
    }
  }, [isUpdated]);

  const loadUserData = async () => {
    if (props.user) {
      let userData = await userService.getUserData(props.user._id);
      setUserData(userData);
      setLoaded(true);
      setIsUpdated(false);
      setShowFinishedProjects(false);
    }
  };

  const toggleShowFinishedProjects = async () => {
    if (!pastProjectsFetched) {
      let finishedProjects = await userService.getFinishedProjects(
        props.user._id
      );
      let userData = userData;
      userData.finishedProjects = finishedProjects.finishedProjects;
      setUserData(userData);
      setpastProjectsFetched(true);
      setShowFinishedProjects(!showFinishedProjects);
    } else {
      setShowFinishedProjects(!showFinishedProjects);
    }
  };

  const updatePage = () => {
    console.log("ocurro");
    setIsUpdated(false);
  };

  const populateProjectSidebar = () => {
    let projectsInSidebar;
    showFinishedProjects === true
      ? (projectsInSidebar = "finishedProjects")
      : (projectsInSidebar = "ongoingProjects");
    //   console.log(userData[projectsInSidebar])
    let sortedProject = userData[projectsInSidebar]
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
                  .assignedUser[0] == props.user.role
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
          a.currentRole == props.user.role &&
          b.currentRole != props.user.role
        ) {
          return -1;
        }
        if (
          a.currentRole != props.user.role &&
          b.currentRole == props.user.role
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

    if (searchQuery) {
      sortedProject = sortedProject.filter(
        (project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.budgetNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return sortedProject.map((project) => (
      <ProjectList project={project} key={project.budgetNumber} />
    ));
  };

  let projects, newProject, toggleProjects, searchInput;
  const { isLoggedin } = props;
  if (loaded === true && !!isLoggedin) {
    projects = populateProjectSidebar();
    if (
      isUpdated == true ||
      userData.ongoingProjects.length !== props.user.ongoingProjects.length
    ) {
      populateProjectSidebar();
    }
    if (props.user.role === "Account") {
      newProject = (
        <NavLink
          className="list-group-item list-group-item-action bg-success text-light pl-5 justify-content-left d-flex align-items-center"
          to={`/project/new`}
          activeClassName="active"
        >
          <i className="fas fa-plus-circle mr-3"></i>
          Create a new project
        </NavLink>
      );
    }
  }

  if (!!isLoggedin) {
    toggleProjects = (
      <button
        className="list-group-item list-group-item-action bg-info text-light pl-5 justify-content-left d-flex align-items-center"
        onClick={toggleShowFinishedProjects}
      >
        <i className="fas fa-archive mr-3"></i> Show finished projects
      </button>
    );

    searchInput = (
      <input
        type="text"
        onChange={(e) => setsearchQuery(e.value)}
        className="list-group-item list-group-item-action bg-white text-secondary pl-5 justify-content-left d-flex align-items-center"
        placeholder="Search for a project..."
        name="searchQuery"
      />
    );

    if (showFinishedProjects === true) {
      toggleProjects = (
        <button
          className="list-group-item list-group-item-action bg-primary text-light pl-5 justify-content-left d-flex align-items-center"
          onClick={toggleShowFinishedProjects}
        >
          <i className="fas fa-calendar-alt mr-3"></i>
          Show ongoing projects
        </button>
      );
    }
  }

  return (
    <div className="">
      <Navbar pendingTasks={userData.ongoingProjects} />
      <div className="row ">
        <div className="col-xl-2 col-lg-3 col-sm-4 list-group project-list pr-0 overflow-auto">
          <div>
            {newProject}
            {toggleProjects}
            {searchInput}
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
              updatePage={updatePage}
            />
            <PrivateRoute
              exact
              path="/project/:budgetNumber/details"
              component={ProjectDetails}
              updatePage={updatePage}
            />
            <PrivateRoute
              exact
              path="/project/:budgetNumber/edit"
              component={ProjectEdit}
              updatePage={updatePage}
            />
            <PrivateRoute
              exact
              path="/"
              pendingTasks={userData.ongoingProjects}
              component={Home}
              updatePage={updatePage}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default withAuth(App);
