import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import "bootstrap/dist/css/bootstrap.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  populateNotifications = () => {
    let pendingTasks = [];
    this.props.pendingTasks.map((project) => {
      if (project.pendingTask) {
        pendingTasks.push(project);
      }
    });
    this.setState({
      ongoingProjects: pendingTasks,
    });
  };

  render() {
    const { user, logout, isLoggedin } = this.props;
    let notifications;
    let pendingTasks = [];
    for (let i = 0; i < this.props.pendingTasks.length; i++) {
      if (this.props.pendingTasks[i].pendingTask) {
        pendingTasks.push(this.props.pendingTasks[i].pendingTask);
      }
    }

    if (pendingTasks.length > 0) {
      notifications = (
        <p className="d-inline rounded-circle font-weight-bold text-white bg-danger px-1 my-3">
          {pendingTasks.length}
        </p>
      );
    } else {
      notifications = (
        <p className="rounded-circle text-white font-weight-bold bg-success px-2 my-3 d-inline">
          0
        </p>
      );
    }

    return (
      <nav className="navbar bg-info mx-0 w-100 text-light">
        <Link to={"/"} className=" text-decoration-none" id="home-btn">
          <h4 className="text-light text-decoration-none">Home</h4>
        </Link>
        <h2 className="text-white font-weight-bold">
          PromoManager<sup>®</sup>
        </h2>
        {isLoggedin ? (
          <>
            <div className="row d-flex align-items-center">
              <Link to={"/"} className="my-3 text-decoration-none">
                <p className="d-inline my-3 text-light font-italic">
                  {" "}
                  Pending tasks:{" "}
                </p>
                {notifications}
              </Link>
              <p className="navbar-user text-light m-3">
                Welcome, <b>{user.name}</b> <i>({user.role})</i>
              </p>
              <button
                className="btn btn-light navbar-button px-3 mx-3 text-info font-weight-bold"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <Link to="/login">
                <button className="navbar-button btn btn-light px-3 mx-3 text-info font-weight-bold">
                  Login
                </button>
              </Link>
              <br />
              <Link to="/signup">
                <button className="navbar-button btn btn-warning px-3 mx-3">
                  Sign Up
                </button>
              </Link>
            </div>
          </>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
