import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import userService from "../lib/user-service";

class NewProject extends Component {
  state = {
    name: "",
    userList: [],
    type: "",
    client: "",
    description: "",
    teamMembers: [this.props.user._id],
  };

  componentDidMount = async () => {
    let userList = await userService.getUsers();
    this.setState({
      userList: userList,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      name,
      budgetNumber,
      client,
      description,
      type,
      teamMembers,
    } = this.state;
;

userService.newProject({
  name,
  budgetNumber,
  client,
  description,
  type,
  teamMembers,
})
  
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    let teamMembers = this.state.teamMembers
    let index
    switch (name){
      case "account":
        index=0;
        break;
      case "scientific":
        index=1;
        break;
      case "design":
        index=2;
        break;
      case "developer":
        index=3;
        break;
      case "av":
        index=4;
        break;
      case "administration":
        index=5;
        break;
    }
    teamMembers[index]= value
    this.setState({
      [name]: value,
      teamMembers: teamMembers
    });
  };

  render() {
    const { name, budgetNumber, client, description } = this.state;
    return (
      <div className="mt-5">
        <h1>Create new project</h1>

        <form onSubmit={this.handleFormSubmit} className="d-flex flex-column">
          <div className="row">
            <div className="col-12">
              <label>Name:</label>
              <input
                className="w-100"
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-4">
              <label>Budget number</label>
              <input
                className="w-100"
                type="text"
                name="budgetNumber"
                value={budgetNumber}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-4">
              <label>Client:</label>
              <input
                className="w-100"
                type="text"
                name="client"
                value={client}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-4">
              <label>Project type</label>
              <select
                className="w-100"
                name="type"
                onChange={this.handleChange}
                required
              >
                <option value="">Select a project type:</option>
                <option value="Leaflet">Leaflet</option>
                <option value="Slidekit">Slidekit</option>
                <option value="eDetailing">eDetailing</option>
                <option value="Website">Website</option>
                <option value="Event">Event</option>
                <option value="Video">Video</option>
              </select>
            </div>
          </div>

          <h3>Project team members:</h3>
          <div className="row">
            <div className="col-4">
              <label>Account:</label>
              <select
                className="w-100"
                name="account"
                onChange={this.handleChange}
                required
              >
                <option value="">Select a person</option>
                {this.state.userList.map((user) => {
                  if (user.role === "Account") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="col-4">
              <label>Scientific:</label>
              <select
                className="w-100"
                name="scientific"
                onChange={this.handleChange}
              >
                <option value="">Select a person</option>
                {this.state.userList.map((user) => {
                  if (user.role === "Scientific") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="col-4">
              <label>Design:</label>
              <select
                className="w-100"
                name="design"
                onChange={this.handleChange}
              >
                <option value="">Select a person</option>
                {this.state.userList.map((user) => {
                  if (user.role === "Design") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="col-4">
              <label>Developer:</label>
              <select
                className="w-100"
                name="developer"
                onChange={this.handleChange}
              >
                <option value="">Select a person</option>
                {this.state.userList.map((user) => {
                  if (user.role === "Developer") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="col-4">
              <label>Audiovisual:</label>
              <select className="w-100" name="av" onChange={this.handleChange}>
                <option value="">Select a person</option>
                {this.state.userList.map((user) => {
                  if (user.role === "AV") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="col-4">
              <label>Administration:</label>
              <select
                className="w-100"
                name="administration"
                onChange={this.handleChange}
              >
                <option value="">Select a person</option>
                {this.state.userList.map((user) => {
                  if (user.role === "Administration") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="col-12">
              <h3>Description:</h3>
              <textarea
                className="w-100"
                type="text"
                name="description"
                onChange={this.handleChange}
              >
                {description}
              </textarea>
            </div>
          </div>

          <input
            type="submit"
            className="my-5 btn btn-success p-2 font-weight-bold"
            value="Create the project"
          />
        </form>
      </div>
    );
  }
}

export default withAuth(NewProject);