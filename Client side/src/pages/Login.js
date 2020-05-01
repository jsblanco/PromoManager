import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

 const Login = props => {
  const [userInfo, setUserInfo] = useState({
    email: "", 
    password: "",
  })
  
useEffect(() => {}, [props.error])

  //NOTA!cuando pase a hooks, meter error en useEffect

const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = userInfo;
    //console.log('Login -> form submit', { email, password });
    await props.login({ email, password })
  };

const  handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value });
  };
  

    const { email, password } = userInfo;
    let errorDisplay;

    switch (props.error.login){
    case false:
      errorDisplay="";
      break;
    case 401: 
      errorDisplay=<p className="font-weight-bold m-0 text-danger w-100">Password doesn't match username</p>;
      break;
    case 404: 
      errorDisplay=<p className="font-weight-bold m-0 text-danger w-100">Username not registered in PromoManager</p>;
      break;
    default:
      errorDisplay=<p className="font-weight-bold m-0 text-danger w-100">Could not login with introduced credentials</p>;;
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
              onSubmit={handleFormSubmit}
              className="d-flex flex-column justify-content-center"
            >
              <label className="mt-3 mb-0">Email:</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />

              <label className="mt-3 mb-0">Password:</label>
              <input
                type="password"
                name="password"
                className="mb-3"
                value={password}
                onChange={handleChange}
                required
              />

              {props.error && errorDisplay}

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


export default withAuth(Login);

