import React, { useState, useEffect, Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import userService from "../lib/user-service";

const EditProject = props =>{
  const [project, setProject] = useState({
    name: "",
    userList: [],
    type: "",
    client: "",
    description: "",
    teamMembers: [],
    budgetNumber: props.match.params.budgetNumber,
    id: "",
    teamNames: [],
    originalMembers: ""
  });

  useEffect(()=>{
    async function anyName(){
    let budgetNumber = props.match.params.budgetNumber;
    let userList = await userService.getUsers();
    let projectData = await userService.getProject(budgetNumber);
    let teamMembersInOrder = [];
    let teamMembersNames = [];
    let originalMembers = [];
    projectData.teamMembers.map((member) => {
      switch (member.role) {
        case "Account":
          teamMembersInOrder[0] = member._id;
          teamMembersNames[0] = member.name;
          break;
        case "Scientific":
          teamMembersInOrder[1] = member._id;
          teamMembersNames[1] = member.name;
          break;
        case "Design":
          teamMembersInOrder[2] = member._id;
          teamMembersNames[2] = member.name;
          break;
        case "Developer":
          teamMembersInOrder[3] = member._id;
          teamMembersNames[3] = member.name;
          break;
        case "AV":
          teamMembersInOrder[4] = member._id;
          teamMembersNames[4] = member.name;
          break;
        case "Administration":
          teamMembersInOrder[5] = member._id;
          teamMembersNames[5] = member.name;
          break;
      }
    });
    setProject({
      ...project,
      name: projectData.name,
      type: projectData.type,
      client: projectData.client,
      description: projectData.description,
      userList: userList,
      teamMembers: teamMembersInOrder,
      teamNames: teamMembersNames,
      originalMembers: originalMembers,
      id: projectData._id,
    });
  }
  anyName()
  }, [])
  

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      name,
      client,
      description,
      type,
      teamMembers,
      originalMembers,
      id,
    } = project;
    userService
      .updateProject({
        name,
        client,
        description,
        type,
        teamMembers,
        originalMembers,
        id,
      })
      .then(() =>
        props.history.push(`/project/${project.budgetNumber}/details`)
      )
  };

  const handleUsers = (event) => {
    const { name, value } = event.target;
    let index;
    let teamMembers = project.teamMembers
    switch (name) {
      case "Account":
        index = 0;
        break;
      case "Scientific":
        index = 1;
        break;
      case "Design":
        index = 2;
        break;
      case "Developer":
        index = 3;
        break;
      case "AV":
        index = 4;
        break;
      case "Administration":
        index = 5;
        break;
      default:
        index= 10;
        break;
    }

    teamMembers[index] = value;
    setProject({
      ...project,
      teamMembers: teamMembers,
    });
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setProject({
      ...project,
      [name]: value,
    });
  };




    const { name, budgetNumber, client, description } = project;
    let member = [];

    for (let i = 0; i < 6; i++) {
      if (project.teamMembers[i]) {
        member[i] = (
          <option
            defaultValue={project.teamMembers[i]}
            className="font-weight-bold"
            selected
          >
            Currently: {project.teamNames[i]}
          </option>
        );
      } else {
        member.push();
      }
    }

    return (
      <div className="mt-5 col-lg-6">
        <h1>Edit project {project.budgetNumber}</h1>

        <form onSubmit={handleFormSubmit} className="d-flex flex-column">
          <div className="row">
            <div className="col-12">
              <label className="mt-2 mb-0">Name:</label>
              <input
                className="w-100"
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label className="mt-2 mb-0">Budget number</label>
              <p className="w-100 text-secondary font-italic">
                {project.budgetNumber} - This value cannot be changed
              </p>
            </div>
            <div className="col-4">
              <label className="mt-2 mb-0">Client:</label>
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
              <label className="mt-2 mb-0">Project type</label>
              <select
                className="w-100 py-1"
                name="type"
                onChange={handleChange}
                required
              >
                <option value={project.type} className="font-weight-bold">
                  Currently: {project.type}
                </option>
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
              <label className="mt-2 mb-0">Account:</label>
              <select
                className="w-100 py-1"
                name="Account"
                onChange={handleUsers}
                required
              >
                {member[0]}
                {project.userList.map((user) => {
                  if (user.role === "Account") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
                <option value="">Nobody from this department</option>
              </select>
            </div>
            <div className="col-4">
              <label className="mt-2 mb-0">Scientific:</label>
              <select
                className="w-100 py-1"
                name="Scientific"
                onChange={handleUsers}
              >
                {member[1]}
                {project.userList.map((user) => {
                  if (user.role === "Scientific") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
                <option value="">Nobody from this department</option>
              </select>
            </div>
            <div className="col-4">
              <label className="mt-2 mb-0">Design:</label>
              <select
                className="w-100 py-1"
                name="Design"
                onChange={handleUsers}
              >
                {member[2]}
                {project.userList.map((user) => {
                  if (user.role === "Design") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
                <option value="">Nobody from this department</option>
              </select>
            </div>
            <div className="col-4">
              <label className="mt-2 mb-0">Developer:</label>
              <select
                className="w-100 py-1"
                name="Developer"
                onChange={handleUsers}
              >
                {member[3]}
                {project.userList.map((user) => {
                  if (user.role === "Developer") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
                <option value="">Nobody from this department</option>
              </select>
            </div>
            <div className="col-4">
              <label className="mt-2 mb-0">Audiovisual:</label>
              <select
                className="w-100 py-1"
                name="AV"
                onChange={handleUsers}
              >
                {member[4]}
                {project.userList.map((user) => {
                  if (user.role === "AV") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
                <option value="">Nobody from this department</option>
              </select>
            </div>
            <div className="col-4">
              <label className="mt-2 mb-0">Administration:</label>
              <select
                className="w-100 py-1"
                name="Administration"
                onChange={handleUsers}
              >
                {member[5]}
                {project.userList.map((user) => {
                  if (user.role === "Administration") {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  }
                })}
                <option value="">Nobody from this department</option>
              </select>
            </div>
            <div className="col-12 mt-4">
              <h3>Description:</h3>
              <textarea
                className="w-100"
                type="text"
                name="description"
                onChange={handleChange}
                value={project.description}
                required
              ></textarea>
            </div>
          </div>

          <input
            type="submit"
            className="my-5 btn btn-success p-2 font-weight-bold"
            value="Edit this project"
          />
        </form>
      </div>
    );
  }

export default withAuth(EditProject);

