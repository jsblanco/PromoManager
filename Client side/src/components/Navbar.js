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
        <h2 className="text-white font-weight-bold">PromoManager</h2>
        {isLoggedin ? (
          <><div className="row d-flex align-items-center">
            <p className='navbar-user text-light m-3'>Welcome, <b>{user.name}</b> <i>({user.role})</i></p>
            <button className='btn btn-light navbar-button px-3 mx-3' onClick={logout}>
              Logout
            </button>
          </div>
          </>
        ) : (
          <>
          <div className="row">
            <Link to='/login'>
              <button className='navbar-button btn btn-light px-3 mx-3'>Login</button>
            </Link>
            <br />
            <Link to='/signup'>
              <button className='navbar-button btn btn-warning px-3 mx-3'>Sign Up</button>
            </Link>
          </div>
          </>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
