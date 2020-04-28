import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class Login extends Component {
  state = { email: "", password: "", error: false };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    //console.log('Login -> form submit', { email, password });
    await this.props.login({ email, password })
    this.props.error && this.setState({error: this.props.error.login})
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    let error;

    switch (this.state.error){
    case false:
      error="";
      break;
    case 401: 
    console.log("hola")
      error=<p className="font-weight-bold m-0 text-danger w-100">Password doesn't match username</p>;
      break;
    case 404: 
      error=<p className="font-weight-bold m-0 text-danger w-100">Username not registered in PromoManager</p>;
      break;
    default:
      error=<p className="font-weight-bold m-0 text-danger w-100">Could not login with introduced credentials</p>;;
      break;
  }

    return (
      <div className="w-75 h-100 text-center d-flex flex-column justify-content-center">
        <h1 className="display-3 text-info font-weight-bold mt-3">
          Welcome to PromoManager
        </h1>
        <h4 className="my-4 text-secondary">
          Manage your projects. Meet your deadlines. Keep track of your time.
          All of this, in one place.
        </h4>
        <div className="w-100 d-flex justify-content-center">
          <div className="shadow p-3 mb-3 card bg-white rounded mt-5  text-center">
            <h1>Log into your account</h1>
            <p className="font-italic text-secondary">
              Your projects are waiting for you!
            </p>

            <form
              onSubmit={this.handleFormSubmit}
              className="d-flex flex-column justify-content-center"
            >
              <label className="mt-3 mb-0">Email:</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={this.handleChange}
                required
              />

              <label className="mt-3 mb-0">Password:</label>
              <input
                type="password"
                name="password"
                className="mb-3"
                value={password}
                onChange={this.handleChange}
                required
              />

              {error}

              <input
                className="btn btn-success mt-3"
                type="submit"
                value="Login"
              />
              <p className="text-muted mt-5 mb-1">
                Not registered in PromoManager?
              </p>
              <Link
                className="btn btn-outline-info font-weight-bold"
                to={"/signup"}
              >
                Register
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
