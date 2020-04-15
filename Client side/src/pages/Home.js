import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";

import TaskCard from "../components/TaskCard";

class Home extends Component {
  state = {
    userData: { ongoingProjects: [] },
    loaded: false,
  };

  render() {
    let greeting, pendingTaskFeed;
    let now = new Date();
    switch (true) {
      case now.getHours() >= 0 && now.getHours() < 7:
        greeting = "It's very late. You should be asleep";
        break;
      case now.getHours() >= 7 && now.getHours() < 12:
        greeting = "Good morning";
        break;
      case now.getHours() >= 12 && now.getHours() < 19:
        greeting = "Good afternoon";
        break;
      case now.getHours() >= 19:
        greeting = "Good evening";
        break;
      default:
        greeting = "Hello";
        break;
    }

    let pendingTasks = [];
    for (let i = 0; i < this.props.pendingTasks.length; i++) {
      if (this.props.pendingTasks[i].pendingTask) {
        pendingTasks.push(this.props.pendingTasks[i]);
      }
    }

    if (pendingTasks.length > 0) {
      pendingTaskFeed = (
        <div className="h-75 feed w-100 px-5 overflow-auto">
          {pendingTasks.map((project) => {
            return (
              <div
                key={project._id}
                className="shadow p-3 mb-3 card bg-white rounded p-4 my-2"
              >
                <h4>{project.name}</h4>
                <TaskCard
                  index={project.pendingTask.index}
                  projectId={project._id}
                  phaseId={project.pendingTask.phaseId}
                  teamMembers={project.teamMembers}
                  assignedUserName={this.props.user.name}
                  task={project.pendingTask}
                />
              </div>
            );
          })}
        </div>
      );
    } else {
      pendingTaskFeed = (
        <div className="h-25 feed w-100 overflow-auto d-flex align-items-center justify-content-center">
          <p className="text-muted font-italic">
            Congratulations! You have finished all your pending tasks.
          </p>
        </div>
      );
    }

    return (
      <div className="h-100 d-flex flex-column justify-content-start align-items-center pt-5 overflow-hidden">
        <h1>
          {greeting}, {this.props.user.name}
        </h1>
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
          <h4 className="d-inline pr-2">You currently have</h4>
          <h4 className="d-inline px-1 font-weight-bold">
            {pendingTasks.length} pending tasks
          </h4>
          <h4 className="d-inline px-1"> from </h4>
          <h4 className="d-inline font-weight-bold">
            {this.props.user.ongoingProjects.length} ongoing projects
          </h4>
        </div>
        <p className="font-italic"> Let's get some work done today!</p>

        {pendingTaskFeed}
      </div>
    );
  }
}

export default withAuth(Home);

/*

        */
