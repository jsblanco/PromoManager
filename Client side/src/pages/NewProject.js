import React, {  useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import userService from "../lib/user-service";

const NewProject = props => {
  const [userList, setUserList]= useState([])
  const [newProject, setNewProject] = useState({
    name: "",
    type: "",
    budgetNumber: "",
    client: "",
    description: "",
    teamMembers: [props.user._id],
  });
  const history = useHistory();

  useEffect(()=>{
    userService.getUsers()
    .then(userList=>setUserList(userList));
  },[]);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const {
      name,
      budgetNumber,
      client,
      description,
      type,
      teamMembers,
    } = newProject;
    await userService
      .newProject({
        name,
        budgetNumber,
        client,
        description,
        type,
        teamMembers,
      })
      history.push(`/project/${budgetNumber}/details`);
      props.updatePage();
  };

  const handleUsers = (event) => {
    const { name, value } = event.target;
    let index;
    let teamMembers = newProject.teamMembers
    switch (name) {
      case "account":
        index = 0;
        break;
      case "scientific":
        index = 1;
        break;
      case "design":
        index = 2;
        break;
      case "developer":
        index = 3;
        break;
      case "av":
        index = 4;
        break;
      case "administration":
        index = 5;
        break;
      default:
        index= 10;
        break;
    }

    teamMembers[index] = value;
    setNewProject({
      ...newProject,
      teamMembers: teamMembers,
    });
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProject({
      ...newProject,
      [name]: value,
    });
  };

    const { name, budgetNumber, client, description } = newProject;
    return (
      <div className="mt-5 col-lg-6">
        <h1>Create new project</h1>

        <form onSubmit={handleFormSubmit} className="d-flex flex-column">
          <div className="row">
            <div className="col-12">
              <label className="mt-1 mb-0">Name:</label>
              <input
                className="w-100"
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label className="mt-1 mb-0">Budget number</label>
              <input
                className="w-100"
                type="text"
                name="budgetNumber"
                value={budgetNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-4">
              <label className="mt-1 mb-0">Client:</label>
              <input
                className="w-100"
                type="text"
                name="client"
                value={client}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-4">
              <label className="mt-1 mb-0">Project type</label>
              <select
                className="w-100"
                name="type"
                onChange={handleChange}
                required
              >
                <option value="">Select a project type:</option>
                <option value="Leaflet">Leaflet</option>
                <option value="Slidekit">Slidekit</option>
                <option value="eDetailing">eDetailing</option>
                <option value="Website">Website</option>
                <option value="Event">Event</option>
                <option value="Video">Video</option>
              </select>
            </div>
          </div>

          <h3 className="mt-3">Project team members:</h3>
          <div className="row">
            <div className="col-4">
              <label className="mt-1 mb-0">Account:</label>
              <select
                className="w-100"
                name="account"
                onChange={handleUsers}
                required
              >
                <option value="">Select a person</option>
                {userList.map((user) => {
                  if (user.role === "Account") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="col-4">
              <label className="mt-1 mb-0">Scientific:</label>
              <select
                className="w-100"
                name="scientific"
                onChange={handleUsers}
              >
                <option value="">Select a person</option>
                {userList.map((user) => {
                  if (user.role === "Scientific") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="col-4">
              <label className="mt-1 mb-0">Design:</label>
              <select
                className="w-100"
                name="design"
                onChange={handleUsers}
              >
                <option value="">Select a person</option>
                {userList.map((user) => {
                  if (user.role === "Design") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="col-4">
              <label className="mt-1 mb-0">Developer:</label>
              <select
                className="w-100"
                name="developer"
                onChange={handleUsers}
              >
                <option value="">Select a person</option>
                {userList.map((user) => {
                  if (user.role === "Developer") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="col-4">
              <label className="mt-1 mb-0">Audiovisual:</label>
              <select className="w-100" name="av" onChange={handleUsers}>
                <option value="">Select a person</option>
                {userList.map((user) => {
                  if (user.role === "AV") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="col-4">
              <label className="mt-1 mb-0">Administration:</label>
              <select
                className="w-100"
                name="administration"
                onChange={handleUsers}
              >
                <option value="">Select a person</option>
                {userList.map((user) => {
                  if (user.role === "Administration") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="col-12 mt-3">
              <h3>Description:</h3>
              <textarea
                className="w-100"
                type="text"
                name="description"
                onChange={handleChange}
                value={description}
                required
              ></textarea>
            </div>
          </div>

          <input
            type="submit"
            className="my-5 btn btn-success p-2 font-weight-bold"
            value="Create the project"
          />
        </form>
      </div>
    );
  }

export default withAuth(NewProject);
