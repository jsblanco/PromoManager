import React from "react";
import { NavLink } from "react-router-dom";

const ProjectList = props => {
    return (
        <NavLink
        className="list-group-item list-group-item-action country-menu"
        to={`/project/${props.project.budgetNumber}/details`}
        activeClassName="active"
      >
        <h5>
        {props.project.budgetNumber} 
        </h5>
      <h4>
        {props.project.name}
      </h4>
      <p>Currently awaiting: {props.project.currentRole}</p>
      </NavLink>
  );
};

export default ProjectList;

