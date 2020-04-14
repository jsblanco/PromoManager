import axios from "axios";
//import { Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history';



class User {
  constructor() {
    this.user = axios.create({
      baseURL: "http://localhost:4000",
      withCredentials: true,
    });
  }

  getUsers() {
    return (
      this.user
        .get("/user/list")
        .then((data) => data.data)
    );
  }

  getUserData(userId) {
    return (
      this.user
      .get(`/user/${userId}`)
      .then((data) => data.data)
      );
    }


  postComments({projectId, comments}){
  return this.user
  .put(`/project/${projectId}/addcomment`, {comments})
  .then((data) => data.data)
  }

  closeProject({projectId}){
    return this.user
    .put(`/project/${projectId}/close`)
    .then((data) => data.data)
    }

  newProject({
    name,
    budgetNumber,
    client,
    description,
    type,
    teamMembers,
  }) {
    return this.user
      .post("/project/new", {
        name,
        budgetNumber,
        client,
        description,
        type,
        teamMembers,
      })
      .then(({ data }) => data)
  }
  
  getProject(budgetNumber) {
    return (
      this.user
      .get(`/project/${budgetNumber}`)
      .then((data) => data.data)
      );
    }

  updateProject({
    name,
    client,
    description,
    type,
    teamMembers,
    originalMembers,
    id,
  }) {
    return this.user
      .put("/project/edit", {
        name,
        client,
        description,
        type,
        teamMembers,
        originalMembers,
        id,
      })
      .then(({ data }) => data);
  }

createPhase({projectId, name}){
  return this.user
    .post(`/project/${projectId}/newphase`, {name})
    .then((data) => data.data)
}

createTask({phaseId, name, assignedUser, projectId}){
  return this.user
    .post(`/project/${projectId}/addtask/${phaseId}`, {name, assignedUser})
    .then((data) => data.data)
}

updateTask({
  phaseId,
  name,
  assignedUser,
  deadline,
  projectId,
  index,
}){
  return this.user
    .put(`/project/${projectId}/${phaseId}/update/${index}`, {name, assignedUser, deadline})
    .then((data) => data.data)
}

taskIsOk({
  phaseId,
  projectId,
  index,
  spentTime, 
  message,
}){
  return this.user
    .put(`/project/${projectId}/${phaseId}/taskIsOk/${index}`, {spentTime, message,})
    .then((data) => data.data)
}

taskIsNotOk({
  phaseId,
  projectId,
  index,
  spentTime, 
  message,
}){
  return this.user
    .put(`/project/${projectId}/${phaseId}/taskIsNotOk/${index}`, {spentTime, message,})
    .then((data) => data.data)
}

resetPhase({ projectId, phaseId, spentTime, message }){
  return this.user
  .put(`/project/${projectId}/resetphase/${phaseId}`, { spentTime, message })
  .then((data) => data.data)
}


//fin
}

const axiosRequestFunctions = new User();

export default axiosRequestFunctions;
