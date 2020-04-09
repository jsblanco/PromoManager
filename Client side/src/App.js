import React, { Component } from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import AuthProvider from "./lib/AuthProvider";
import "bootstrap/dist/css/bootstrap.css";

import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./pages/Private";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import user from "./lib/user-service";
import Home from "./pages/Home";

class App extends Component {
  render() {
    return (
      <AuthProvider>
          <Navbar />
        <div className=''>
          <Switch>
            <AnonRoute exact path='/signup' component={Signup} />
            <AnonRoute exact path='/login' component={Login} />
            <PrivateRoute exact path='/' component={Home}/>
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
