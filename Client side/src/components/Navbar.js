import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import "bootstrap/dist/css/bootstrap.css";

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <nav className='navbar bg-info mx-0 w-100 text-light'>
        <Link to={"/"} id='home-btn'>
          <h4 className="text-light">Home</h4>
        </Link>
        {isLoggedin ? (
          <>
            <p className='navbar-user text-light'>username: {user.name}</p>
            <button className='btn btn-light navbar-button' onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login'>
              <button className='navbar-button btn btn-light '>Login</button>
            </Link>
            <br />
            <Link to='/signup'>
              <button className='navbar-button btn btn-success '>Sign Up</button>
            </Link>
          </>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
