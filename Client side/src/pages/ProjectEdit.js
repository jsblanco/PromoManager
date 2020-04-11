import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import userService from "../lib/user-service";

class EditProject extends Component {

  state = {
    name: "",
    userList: [],
    type: "",
    client: "",
    description: "",
    teamMembers: [],
    budgetNumber: this.props.match.params.budgetNumber,
    id: "",
    teamNames: [],
    originalMembers: [],
  };

  componentDidMount = async () => {
    let userList = await userService.getUsers();
    let budgetNumber = this.props.match.params.budgetNumber
    let project = await userService.getProject(budgetNumber);
    let teamMembersInOrder = [];
    let teamMembersNames = [];
    let originalMembers = [];
    project.teamMembers.map((member) => {
      let index;
      switch (member.role) {
        case "Account":
          teamMembersInOrder[0] = member._id;
          originalMembers[0] = member._id;
          teamMembersNames[0] = member.name;
          break;
        case "Scientific":
          teamMembersInOrder[1] = member._id;
          originalMembers[1] = member._id;
          teamMembersNames[1] = member.name;
          break;
        case "Design":
          teamMembersInOrder[2] = member._id;
          originalMembers[2] = member._id;
          teamMembersNames[2] = member.name;
          break;
        case "Developer":
          teamMembersInOrder[3] = member._id;
          originalMembers[3] = member._id;
          teamMembersNames[3] = member.name;
          break;
        case "AV":
          teamMembersInOrder[4] = member._id;
          originalMembers[4] = member._id;
          teamMembersNames[4] = member.name;
          break;
        case "Administration":
          teamMembersInOrder[5] = member._id;
          originalMembers[5] = member._id;
          teamMembersNames[5] = member.name;
          break;
      }
    });
    this.setState({
      userList: userList,
      name: project.name,
      budgetNumber: project.budgetNumber,
      type: project.type,
      client: project.client,
      id: project._id,
      description: project.description,
      teamMembers: teamMembersInOrder,
      teamNames: teamMembersNames,
      originalMembers: originalMembers,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      name,
      client,
      description,
      type,
      teamMembers,
      originalMembers,
      id,
    } = this.state;
    userService.updateProject({
      name,
      client,
      description,
      type,
      teamMembers,
      originalMembers,
      id,
    });
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    let teamMembers = this.state.teamMembers;
    let index;
    if (value === ""){value = null}
    switch (name) {
      case "Account":
        index = 0;
        break;
      case "Scientific":
        index = 1;
        break;
      case "Design":
        index = 2;
        break;
      case "Developer":
        index = 3;
        break;
      case "AV":
        index = 4;
        break;
      case "Administration":
        index = 5;
        break;
    }
    teamMembers[index] = value;
    this.setState({
      [name]: value,
      teamMembers: teamMembers,
    });
  };

  render() {
    const { name, budgetNumber, client, description } = this.state;
    let member = [];
    console.log(this.state.teamMembers)

    for (let i = 0; i < 6; i++) {
      if (this.state.teamMembers[i]) {
        member[i] =
          <option
            value={this.state.teamMembers[i]}
            className="font-weight-bold"
            selected
          >
            Currently: {this.state.teamNames[i]}
          </option>
        
      } else {
        member.push( );
      }
    }

    return (
      <div className="mt-5">
        <h1>Edit project {this.state.budgetNumber}</h1>

        <form onSubmit={this.handleFormSubmit} className="d-flex flex-column">
          <div className="row">
            <div className="col-12">
              <label className="mt-2 mb-0">Name:</label>
              <input
                className="w-100"
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-4">
              <label className="mt-2 mb-0">Budget number</label>
              <p className="w-100 text-secondary font-italic">{this.state.budgetNumber} - This value cannot be changed</p>
  
            </div>
            <div className="col-4">
              <label className="mt-2 mb-0">Client:</label>
              <input
                className="w-100"
                type="text"
                name="client"
                value={client}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="col-4">
              <label className="mt-2 mb-0">Project type</label>
              <select
                className="w-100 py-1"
                name="type"
                onChange={this.handleChange}
                required
              >
                <option value={this.state.type} className="font-weight-bold">
                  Currently: {this.state.type}
                </option>
                <option value="Leaflet">Leaflet</option>
                <option value="Slidekit">Slidekit</option>
                <option value="eDetailing">eDetailing</option>
                <option value="Website">Website</option>
                <option value="Event">Event</option>
                <option value="Video">Video</option>
              </select>
            </div>
          </div>

          <h3 className="mt-3">Project team members:</h3>
          <div className="row">
            <div className="col-4">
              <label className="mt-2 mb-0">Account:</label>
              <select
                className="w-100 py-1"
                name="Account"
                onChange={this.handleChange}
                required
              >
                {member[0]}
                {this.state.userList.map((user) => {
                  if (user.role === "Account") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
                <option value="">Nobody from this department</option>
              </select>
            </div>
            <div className="col-4">
              <label className="mt-2 mb-0">Scientific:</label>
              <select
                className="w-100 py-1"
                name="Scientific"
                onChange={this.handleChange}
              >
                {member[1]}
                {this.state.userList.map((user) => {
                  if (user.role === "Scientific") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
                <option value="">Nobody from this department</option>
              </select>
            </div>
            <div className="col-4">
              <label className="mt-2 mb-0">Design:</label>
              <select
                className="w-100 py-1"
                name="Design"
                onChange={this.handleChange}
              >
                {member[2]}
                {this.state.userList.map((user) => {
                  if (user.role === "Design") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
                <option value="">Nobody from this department</option>
              </select>
            </div>
            <div className="col-4">
              <label  className="mt-2 mb-0">Developer:</label>
              <select
                className="w-100 py-1"
                name="Developer"
                onChange={this.handleChange}
              >
                {member[3]}
                {this.state.userList.map((user) => {
                  if (user.role === "Developer") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
                <option value="">Nobody from this department</option>
              </select>
            </div>
            <div className="col-4">
              <label className="mt-2 mb-0">Audiovisual:</label>
              <select className="w-100 py-1" name="AV" onChange={this.handleChange}>
                {member[4]}
                {this.state.userList.map((user) => {
                  if (user.role === "AV") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
                <option value="">Nobody from this department</option>
              </select>
            </div>
            <div className="col-4">
              <label className="mt-2 mb-0">Administration:</label>
              <select
                className="w-100 py-1"
                name="Administration"
                onChange={this.handleChange}
              >
                {member[5]}
                {this.state.userList.map((user) => {
                  if (user.role === "Administration") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
                <option value="">Nobody from this department</option>
              </select>
            </div>
            <div className="col-12 mt-4">
              <h3>Description:</h3>
              <textarea
                className="w-100"
                type="text"
                name="description"
                onChange={this.handleChange}
                value={this.state.description}
                required
              >
              </textarea>
            </div>
          </div>

          <input
            type="submit"
            className="my-5 btn btn-success p-2 font-weight-bold"
            value="Edit this project"
          />
        </form>
      </div>
    );
  }
}

export default withAuth(EditProject);
