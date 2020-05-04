import React from "react";

export const DemoProject = () => {


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

  let tasks1 = [
    {
      name: "Maquetación del material",
      assignedUser: '["Account"]',
      message: "",
      spentTime: "05:45",
      deadline: yesterday,
      isItOver: true,
      completedOn: yesterday,
      firstTask: true,
      activeTask: false,
      demonstrationPurposes: true,
    },
    {
      name: "Revisión de la maquetación",
      assignedUser: '["Account"]',
      message: "",
      spentTime: "01:30",
      deadline: today,
      isItOver: true,
      completedOn: yesterday,
      firstTask: false,
      activeTask: false,
      demonstrationPurposes: true,
    },
    {
      name: "Validación por cliente",
      assignedUser: '["Account"]',
      message: "",
      spentTime: "02:00",
      deadline: today,
      isItOver: true,
      completedOn: today,
      firstTask: false,
      activeTask: false,
      demonstrationPurposes: true,
    },
    {
      name: "Maquetación del material",
      assignedUser: '["Account"]',
      message: "",
      spentTime: "00:00",
      deadline: yesterday,
      isItOver: false,
      completedOn: false,
      firstTask: true,
      activeTask: true,
      demonstrationPurposes: true,
    },
    {
      name: "Revisión de la maquetación",
      assignedUser: '["Account"]',
      message: "",
      spentTime: "00:00",
      deadline: today,
      isItOver: false,
      completedOn: false,
      firstTask: false,
      activeTask: false,
      demonstrationPurposes: true,
    },
    {
      name: "Validación por cliente",
      assignedUser: '["Account"]',
      message: "",
      spentTime: "00:00",
      deadline: tomorrow,
      isItOver: false,
      completedOn: false,
      firstTask: false,
      activeTask: false,
      demonstrationPurposes: true,
    },
  ];

  let basicTasks1 = [
    {
      name: "Maquetación del material",
      assignedUser: '["Account"]',
      message: "",
      spentTime: "00:00",
      deadline: yesterday,
      isItOver: false,
      completedOn: false,
      firstTask: true,
      activeTask: true,
      demonstrationPurposes: true,
    },
    {
      name: "Revisión de la maquetación",
      assignedUser: '["Account"]',
      message: "",
      spentTime: "00:00",
      deadline: today,
      isItOver: false,
      completedOn: false,
      firstTask: false,
      activeTask: false,
      demonstrationPurposes: true,
    },
    {
      name: "Validación por cliente",
      assignedUser: '["Account"]',
      message: "",
      spentTime: "00:00",
      deadline: tomorrow,
      isItOver: false,
      completedOn: false,
      firstTask: false,
      activeTask: false,
      demonstrationPurposes: true,
    },
  ];

  let tasks2 = [
    {
      name: "Programación del material",
      assignedUser: '["Account"]',
      message: "",
      spentTime: "00:00",
      deadline: yesterday,
      isItOver: false,
      completedOn: false,
      firstTask: true,
      activeTask: false,
      demonstrationPurposes: true,
    },
    {
      name: "Validación con cliente",
      assignedUser: '["Account"]',
      message: "",
      spentTime: "00:00",
      deadline: today,
      isItOver: false,
      completedOn: false,
      firstTask: false,
      activeTask: false,
      demonstrationPurposes: true,
    },
  ];

  let basicTasks2 = [
    {
      name: "Programación del material",
      assignedUser: '["Account"]',
      message: "",
      spentTime: "00:00",
      deadline: yesterday,
      isItOver: false,
      completedOn: false,
      firstTask: true,
      activeTask: true,
      demonstrationPurposes: true,
    },
    {
      name: "Validación con cliente",
      assignedUser: '["Account"]',
      message: "",
      spentTime: "00:00",
      deadline: today,
      isItOver: false,
      completedOn: false,
      firstTask: false,
      activeTask: false,
      demonstrationPurposes: true,
    },
  ];

  let demoPhase1 = {
    _id: "demoPhase1",
    isItOver: false,
    tasks: tasks1,
    basicTasks: basicTasks1,
    name: "Design phase",
    demonstrationPurposes: true,
  };

  let demoPhase2 = {
    _id: "demoPhase2",
    isItOver: false,
    tasks: tasks2,
    basicTasks: basicTasks2,
    name: "Design phase",
    demonstrationPurposes: true,
  };

  return ({
    isItOver: false,
    teamMembers: [],
    phases: [demoPhase1, demoPhase2],
    _id: "demoProject",
    name: "Demo project",
    budgetNumber: "B12345",
    client: "Project client",
    description:
      "Demo project to show how the basic PromoManager functionality loop. Real projects can be edited, have multiple assigned users, with specific tasks each, and new phases and tasks can be added.",
    type: "eDetailing",
    version: 1,
  });
};

export default DemoProject