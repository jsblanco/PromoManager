import axios from "axios";

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
      .then(({ data }) => data);
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
      .post("/project/edit", {
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



updateTask({phaseId, assignedUser, deadline, projectId, index}){
  return this.user
    .put(`/project/${projectId}/${phaseId}/update/${index}`, {deadline, assignedUser})
    .then((data) => data.data)
}



//fin
}

const axiosRequestFunctions = new User();

export default axiosRequestFunctions;
