import React from "react";
import { NavLink } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

const ProjectList = (props) => {
  let deadline, activeRole;
  let today = new Date();
  let tomorrow = new Date(today.getDate() + 1);
  let deadlineDate = new Date(props.project.deadline);
  today.setHours(2, 0, 0, 0);
  tomorrow.setHours(2, 0, 0, 0);
  deadlineDate.setHours(2, 0, 0, 0);

  function readableDate(unreadableDate) {
    let weekDay = unreadableDate.getDay();
    let day = unreadableDate.getDate();
    let month = unreadableDate.getMonth();

    switch (month) {
      case 0:
        month = "January";
        break;
      case 1:
        month = "February";
        break;
      case 2:
        month = "March";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
        break;
      case 7:
        month = "August";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "October";
        break;
      case 10:
        month = "November";
        break;
      case 11:
        month = "December";
        break;
      default:
        month = "somewhere in time, on ";
        break;
    }

    switch (weekDay) {
      case 1:
        weekDay = "Monday";
        break;
      case 2:
        weekDay = "Tuesday";
        break;
      case 3:
        weekDay = "Wednesday";
        break;
      case 4:
        weekDay = "Thursday";
        break;
      case 5:
        weekDay = "Friday";
        break;
      case 6:
        weekDay = "Saturday";
        break;
      case 0:
        weekDay = "Sunday";
        break;
      default:
        month = "Someday";
        break;
    }

    //    console.log(dateText.charAt(9));
    //    if (dateText.charAt(9) !== 0) { day += dateText.charAt(8); }

    switch (day) {
      case 1:
        day += "st";
        break;
      case 2:
        day += "nd";
        break;
      case 3:
        day += "rd";
        break;
      default:
        day += "th";
    }

    if (day.charAt(0) === "0") {
      day = day.slice(1);
    }
    return `${weekDay}, ${month} the ${day}`;
  }

  switch (true) {
    case deadlineDate.getTime() < today.getTime():
      deadline = (
        <p className="mt-0">
          Missed deadline:{" "}
          <b className="missed-deadline font-weight-bold">
            {readableDate(deadlineDate)}
          </b>
        </p>
      );
      break;
    case deadlineDate.getTime() === today.getTime():
      deadline = (
        <p className="mt-0">
          Next deadline:{" "}
          <b className="deadline-today font-weight-bold">today</b>
        </p>
      );
      break;
    case deadlineDate.getTime() === tomorrow.getTime():
      deadline = (
        <p className="mt-0">
          Next deadline:{" "}
          <b className="deadline-tomorrow font-weight-bold">tomorrow</b>
        </p>
      );
      break;
    case deadlineDate.getTime() > today.getTime():
      deadline = (
        <p className="mt-0">
          Next deadline:{" "}
          <b className="deadline-far">{readableDate(deadlineDate)}</b>
        </p>
      );
      break;
    default:
      deadline = <p className="mt-0">Awaiting project task distribution</p>;
      break;
  }

  if (props.project.currentRole === props.user.role) {
    activeRole = "active-role";
  } else {
    activeRole = "text-muted inactive-role font-italic";
  }

  return (
    <NavLink
      className={`list-group-item list-group-item-action pl-5 country-menu ${activeRole}`}
      to={`/project/${props.project.budgetNumber}/details`}
      activeClassName="active"
    >
      <h6>{props.project.budgetNumber}</h6>
      <h5>{props.project.name}</h5>
      <p className="mb-0">Currently waiting for: {props.project.currentRole}</p>
      {deadline}
    </NavLink>
  );
};

export default withAuth(ProjectList);
