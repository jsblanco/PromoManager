import React from "react";
import { NavLink } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

const ProjectList = props => {

let deadline, activeRole

if (props.project.deadline){
  deadline = <p className="mt-0">Deadline for the current task: {props.project.deadline}</p>
} else {
  deadline = <p className="mt-0">Awaiting project task distribution</p>
}

if (props.project.currentRole === props.user.role ){
  activeRole=""
} else {
  activeRole="text-muted bg-light font-italic"
}

    return (
        <NavLink
        className={`list-group-item list-group-item-action country-menu ${activeRole}`}
        to={`/project/${props.project.budgetNumber}/details`}
        activeClassName="active"
      >
        <h6>
        {props.project.budgetNumber} 
        </h6>
      <h5>
        {props.project.name}
      </h5>
        <p className="mb-0">Currently waiting for: {props.project.currentRole}</p>
        {deadline}
      </NavLink>
  );
};

export default withAuth(ProjectList);

