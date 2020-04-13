import React, { Component } from "react";
import { Switch, NavLink } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import userService from "../lib/user-service";
import ProjectList from "../components/ProjectList";
import PrivateRoute from "../components/PrivateRoute";
import NewProject from "../pages/NewProject";
import ProjectDetails from "../pages/ProjectDetails";
import ProjectEdit from "../pages/ProjectEdit";

class Home extends Component {
  state = {
    userData: { ongoingProjects: [] },
    loaded: false,
  };

  render() {
    let greeting
    let now = new Date();
    switch (true){
      case (now.getHours() >=0 && now.getHours() <7):
        greeting = "It's very late. You should be asleep"
        break;
      case (now.getHours()>=7 && now.getHours() <12):
        greeting = "Good morning"
        break;
      case (now.getHours()>=12 && now.getHours() <19):
        greeting = "Good afternoon"
        break;
      case (now.getHours()>=19):
          greeting = "Good evening"
          break;
      default:
        greeting = "Hello"
        break;
    }


    return (
      <div className="h-100 d-flex flex-column justify-content-start align-items-center mt-5 pt-5">
        <h1>{greeting}, {this.props.user.name}</h1>
        <h5>
          Today is{" "}
          {now.toLocaleString("en-UK", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h5>
        <div className="row">

        <h4 className="d-inline pr-2">
          You currently have</h4> <h4 className="d-inline font-weight-bold">{this.props.user.ongoingProjects.length} ongoing
          projects
        </h4>
        </div>
        <p className="font-italic"> Let's get some work done today!</p>
      </div>
    );
  }
}

export default withAuth(Home);
