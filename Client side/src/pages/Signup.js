import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class Signup extends Component {
  state = { name: "", password: "", email: "", role: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, password, email, role } = this.state;
    console.log("Al enviarlo a auth-service-signup:", {
      name,
      password,
      email,
      role,
    });
    this.props.signup({ name, password, email, role });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, password, email } = this.state;
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

          <label>E-mail</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />

          <label>Role</label>
          <select name="role" onChange={this.handleChange} required>
            <option value="">Select a role from the list:</option>
            <option value="Account">Account</option>
            <option value="Scientific">Scientific</option>
            <option value="Design">Design</option>
            <option value="Developer">Developer</option>
            <option value="AV">Audiovisual</option>
            <option value="Administration">Administration</option>
          </select>

          <input type="submit" value="Signup" />
        </form>

        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    );
  }
}

export default withAuth(Signup);
