import axios from "axios";

class User {
  constructor() {
    this.user = axios.create({
      baseURL: "http://localhost:4000",
      withCredentials: true,
    });
  }

  getUsers() {    
    return this.user
      .get("/user/list")
 //     .then(({ data }) => data)
      .then(data=> data.data)
  }


}

const axiosRequestFunctions = new User();

export default axiosRequestFunctions;
