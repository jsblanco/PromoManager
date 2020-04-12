import React, { Component } from "react";
import userService from "../lib/user-service";

export default class PhaseCreator extends Component {
  state = { name: "", projectId: this.props.projectId };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  createNewPhase = () => {
    const {projectId, name}= this.state;  
    userService.createPhase({projectId, name})
};

  render() {
    return (
      <div className="card py-4 px-2">
        <form onSubmit={this.createNewPhase} className="d-flex flex-column">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-8 d-flex align-items-center justify-content-center">
              <label>Name:</label>
              <input
                className="w-75 mx-2"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
            </div>

            <input
              type="submit"
              className="col-2 my-0 btn btn-success font-weight-bold"
              value="Create phase"
            />
          </div>
        </form>
      </div>
    );
  }
}

/*
  name: {type: String, required: true},
  project: { type: Schema.Types.ObjectId, ref: 'Project',required: true},
  isItOver: {type: Boolean, default: false},
  tasks: { type: Array},
  basicTasks: [{ type: Schema.Types.ObjectId, ref: 'Task'}],

*/
