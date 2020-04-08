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
  
  getProject(projectId) {
    return (
      this.user
      .get(`/project/${projectId}`)
      .then((data) => data.data)
      );
    }
  }
    

const axiosRequestFunctions = new User();

export default axiosRequestFunctions;
