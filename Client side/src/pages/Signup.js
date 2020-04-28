import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class Signup extends Component {
  state = { name: "", password: "", passwordRepeat: "", email: "", role: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    let { name, password, passwordRepeat, email, role } = this.state;
    if (password == passwordRepeat) {
      this.props.signup({ name, password, email, role });
    } else {
      this.setState({
        passwordRepeat: "",
      });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, password, passwordRepeat, email } = this.state;
    let error;

    switch (this.props.error){
      case false:
        error="";
        break;
      case 400:
        error= <p className="font-weight-bold m-0 text-danger w-100">This user is already registered in PromoManager</p>;
        break;
      default:
        error= <p className="font-weight-bold m-0 text-danger w-100">Could not register with introduced credentials</p>;;
        break;
    }
  

    return (
      <div className="w-75 d-flex justify-content-center">
        <div className="shadow p-3 mb-3 card bg-white rounded p-5 mt-5 d-flex flex-column text-center">
          <h1>Sign Up</h1>
          <p className="font-italic text-secondary">Welcome to PromoManager!</p>
          <form
            onSubmit={this.handleFormSubmit}
            className="d-flex flex-column signup-form ml-3"
          >
            <label className="mb-0 mt-3">Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              placeholder="John Smith"
              required
              pattern="[A-Za-z-0-9]+\s[A-Za-z-'0-9]+"
              title="Please input a valid name in the following format: Firstname Lastname"
            />

            <label className="mb-0 mt-3">E-mail</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}
              placeholder="johnsmith@promo.com"
              required
            />
            <div className="row w-100 d-flex justify-content-center mx-0">
              <div className="d-flex flex-column w-50">
                <label className="mb-0 mt-3">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  pattern="^\S{6,}$"
                  title="Please input a valid password with at least one number"
                  placeholder="******"
                  required
                />
              </div>
              <div className="d-flex w-50 flex-column">
                <label className="mb-0 mt-3 ">Repeat your password:</label>
                <input
                  type="password"
                  name="passwordRepeat"
                  value={passwordRepeat}
                  onChange={this.handleChange}
                  pattern="^\S{6,}$"
                  title="Please enter the same password"
                  placeholder="******"
                  required
                />
              </div>
            </div>

            <label className="mb-2 mt-3">Role</label>
            <select
              name="role"
              onChange={this.handleChange}
              className="py-1 mb-3"
              required
            >
              <option value="">Select a role from the list:</option>
              <option value="Account">Account</option>
              <option value="Scientific">Scientific</option>
              <option value="Design">Design</option>
              <option value="Developer">Developer</option>
              <option value="AV">Audiovisual</option>
              <option value="Administration">Administration</option>
            </select>
          {error}
            <input className="btn btn-success mt-3" type="submit" value="Signup" />

            <p className="text-muted mt-5 mb-0">Already have account?</p>
            <Link className="btn btn-outline-info" to={"/login"}>
              Login
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(Signup);
