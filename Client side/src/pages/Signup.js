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
      <div className="d-flex justify-content-center">
      <div className="w-75 mt-5 d-flex flex-column">

        <h1>Sign Up</h1>

        <form onSubmit={this.handleFormSubmit} className="d-flex flex-column signup-form ml-3">
          <label className="mb-0 mt-3">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />

          <label className="mb-0 mt-3">E-mail</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <div className="row w-100 d-flex justify-content-center mx-0">
          <div className="d-flex flex-column w-50">
          <label className="mb-0 mt-3">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          </div>
          <div className="d-flex w-50 flex-column">
          <label className="mb-0 mt-3">Repeat your password:</label>
          <input
            type="password"
            name="passwordRepeat"            
            value={password}
            onChange={this.handleChange}
          />
          </div>
          </div>

          <label className="mb-0 mt-3">Role</label>
          <select name="role" onChange={this.handleChange} className="py-1 mb-3" required>
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
      </div>
    );
  }
}

export default withAuth(Signup);
