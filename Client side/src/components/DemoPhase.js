import PhaseCard from "../components/PhaseCard";
import React, { useState, useEffect } from "react";

export const DemoPhase = (props) => {

const [isUpdated, setIsUpdated] = useState(false)
const [phase, setPhase] = useState(props.phase)

useEffect(() => {
  !isUpdated && setIsUpdated(true)
  setPhase(props.phase)
}, [isUpdated])


const updatePage = () => {
  setIsUpdated(false);
};

const teamMembers = [
  {
    name: "Marta ",
    email: "marta@promo.com",
    role: "Account",
  },
  {
    name: "Jorge",
    email: "jorge@promo.com",
    role: "Scientific",
  },
  {
    name: "Maria",
    email: "maria@promo.com",
    role: "Design",
  },
  {
    name: "Josep",
    email: "josep@promo.com",
    role: "Developer",
  },
];

let today = new Date();
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

let tasks = [
  {
    name: "Maquetación del material",
    assignedUser: '["Account"]',
    message: "",
    spentTime: "05:45",
    deadline: `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`,
    isItOver: true,
    completedOn: yesterday,
    firstTask: true,
    activeTask: false,
    demonstrationPurposes: true
  },
  {
    name: "Revisión de la maquetación",
    assignedUser: '["Account"]',
    message: "",
    spentTime: "01:30",
    deadline: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`,
    isItOver: true,
    completedOn: yesterday,
    firstTask: false,
    activeTask: false,
    demonstrationPurposes: true
  },
  {
    name: "Validación por cliente",
    assignedUser: '["Account"]',
    message: "",
    spentTime: "02:00",
    deadline: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`,
    isItOver: true,
    completedOn: today,
    firstTask: false,
    activeTask: false,
    demonstrationPurposes: true
  },
  {
    name: "Maquetación del material",
    assignedUser: '["Account"]',
    message: "",
    spentTime: "00:00",
    deadline: `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`,
    isItOver: false,
    completedOn: false,
    firstTask: true,
    activeTask: true,
    demonstrationPurposes: true
  },
  {
    name: "Revisión de la maquetación",
    assignedUser: '["Account"]',
    message: "",
    spentTime: "00:00",
    deadline: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`,
    isItOver: false,
    completedOn: false,
    firstTask: false,
    activeTask: false,
    demonstrationPurposes: true
  },
  {
    name: "Validación por cliente",
    assignedUser: '["Account"]',
    message: "",
    spentTime: "00:00",
    deadline: `${tomorrow.getFullYear()}-${tomorrow.getMonth()}-${tomorrow.getDate()}`,
    isItOver: false,
    completedOn: false,
    firstTask: false,
    activeTask: false,
    demonstrationPurposes: true
  },
];

let basicTasks =     [{
name: "Maquetación del material",
assignedUser: '["Account"]',
message: "",
spentTime: "00:00",
deadline: `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`,
isItOver: false,
completedOn: false,
firstTask: true,
activeTask: true,
demonstrationPurposes: true
},
{
name: "Revisión de la maquetación",
assignedUser: '["Account"]',
message: "",
spentTime: "00:00",
deadline: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`,
isItOver: false,
completedOn: false,
firstTask: false,
activeTask: false,
demonstrationPurposes: true
},
{
name: "Validación por cliente",
assignedUser: '["Account"]',
message: "",
spentTime: "00:00",
deadline: `${tomorrow.getFullYear()}-${tomorrow.getMonth()}-${tomorrow.getDate()}`,
isItOver: false,
completedOn: false,
firstTask: false,
activeTask: false,
demonstrationPurposes: true
},
];


let demoPhase = {
isItOver: false,
tasks: tasks,
basicTasks: basicTasks,
name: "Design phase",
demonstrationPurposes: true,
};






return (
    <div className="my-3">
      <PhaseCard
        phase={demoPhase}
        teamMembers={teamMembers}
        projectId={"demoPurposes"}
        user={"demoPurposes"}
        isProjectOver={false}
        updatePage={updatePage}
      />

        </div>
    )
}


