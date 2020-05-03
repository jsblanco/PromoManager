import axios from "axios";
// import React from "react";
// import { Redirect } from "react-router-dom";

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      withCredentials: true,
    });
  }

  signup({ name, password, email, role }) {
    return this.auth
      .post("/auth/signup", { name, password, email, role })
      .then(({ data }) => data);
  }

  login({ email, password }) {
    return this.auth
      .post("/auth/login", { email, password })
      .then(({ data }) => data);
    //     .then(()=> <Redirect to = {{ pathname: "/" }} />);
  }

  logout() {
    return this.auth.post("/auth/logout", {}).then(({ data }) => data);
  }

  me() {
    return this.auth.get("/auth/me").then(({ data }) => data)
   // .catch(e=>console.log("No user logged in: ",e))
   ;
  }
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
