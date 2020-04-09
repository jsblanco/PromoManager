import React from "react";
import { NavLink } from "react-router-dom";

const ProjectList = props => {
    return (
        <NavLink
        className="list-group-item list-group-item-action country-menu"
        to={`/project/${props.project.budgetNumber}/details`}
        activeClassName="active"
      >
        {props.project.budgetNumber} {props.project.name}
      </NavLink>
  );
};

export default ProjectList;

