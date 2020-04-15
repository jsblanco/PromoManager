import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class NewProject extends Component {
  state = {
    name: "",
    account: this.props.user._id,
    userList: this.props.userList,
    version: 0,
    type: "",
    client: "",
    scientific: "",
  };

  componentDidMount = () => {
    console.log(this.props);
    console.log(this.props.userList);
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, password, email, role } = this.state;
    this.props.signup({ name, password, email, role });
  };

  handleChange = (event) => {
    console.log(this.props.pepe);
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      name,
      budgetNumber,
      email,
      client,
      scientific,
      account,
    } = this.state;
    return (
      <div>
        <h1>Sign Up</h1>

        <form onSubmit={this.handleFormSubmit} className="d-flex flex-column">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />

          <label>Budget number</label>
          <input
            type="text"
            name="budgetNumber"
            value={budgetNumber}
            onChange={this.handleChange}
          />

          <label>Client:</label>
          <input
            type="text"
            name="client"
            value={client}
            onChange={this.handleChange}
          />

          <label>Project type</label>
          <select name="type" onChange={this.handleChange} required>
            <option value="">Select a project type:</option>
            <option value="Leaflet">Leaflet</option>
            <option value="Slidekit">Slidekit</option>
            <option value="eDetailing">eDetailing</option>
            <option value="Website">Website</option>
            <option value="Event">Event</option>
            <option value="Video">Video</option>
          </select>

          <h2>Members:</h2>
          <div className="row">
            <div className="col-6">
              <label>Account:</label>
              <input
                type="text"
                name="account"
                value={account}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-6">
              <label>Scientific:</label>
              <input
                type="text"
                name="scientific"
                value={scientific}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-6">
              <label>Design:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-6">
              <label>Developer:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-6">
              <label>AV:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <input type="submit" value="Create the project" />
        </form>
      </div>
    );
  }
}

export default withAuth(NewProject);
