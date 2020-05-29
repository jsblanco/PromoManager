import React from "react";

export const DemoProject = () => {

  let today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let beforeYesterday = new Date();
  beforeYesterday.setDate(beforeYesterday.getDate() - 2);

  let tasks0 = [
    {
      name: "Content creation",
      assignedUser: '["Guest user"]',
      message: "",
      spentTime: "02:30",
      deadline: beforeYesterday,
      isItOver: true,
      completedOn: beforeYesterday,
      firstTask: true,
      activeTask: false,
      demonstrationPurposes: true,
    },
    {
      name: "Client validation",
      assignedUser: '["Guest user"]',
      message: "",
      spentTime: "00:45",
      deadline: yesterday,
      isItOver: true,
      completedOn: beforeYesterday,
      firstTask: false,
      activeTask: false,
      demonstrationPurposes: true,
    },
  ];

  let basicTasks0 = [
    {
      name: "Content creation",
      assignedUser: '["Guest user"]',
      message: "",
      spentTime: "00:00",
      deadline: beforeYesterday,
      isItOver: true,
      completedOn: false,
      firstTask: true,
      activeTask: false,
      demonstrationPurposes: true,
    },
    {
      name: "Client validation",
      assignedUser: '["Guest user"]',
      message: "",
      spentTime: "00:00",
      deadline: beforeYesterday,
      isItOver: true,
      completedOn:false,
      firstTask: false,
      activeTask: false,
      demonstrationPurposes: true,
    },
  ];
  
  let tasks1 = [

    {
      name: "Applying design",
      assignedUser: '["Guest user"]',
      message: "",
      spentTime: "05:30",
      deadline: yesterday,
      isItOver: true,
      message: "Graphs in page 4 are warped",
      completedOn: beforeYesterday,
      firstTask: true,
      activeTask: false,
      demonstrationPurposes: true,
    },
    {
      name: "Design review",
      assignedUser: '["Guest user"]',
      message: "",
      spentTime: "02:15",
      deadline: yesterday,
      isItOver: true,
      completedOn: yesterday,
      firstTask: false,
      activeTask: false,
      demonstrationPurposes: true,
    },
    {
      name: "Client validation",
      assignedUser: '["Guest user"]',
      message: "",
      spentTime: "00:20",
      deadline: yesterday,
      isItOver: true,
      completedOn: today,
      firstTask: false,
      activeTask: false,
      demonstrationPurposes: true,
    },
    //AQUI!!
      {
      name: "Applying design",
      assignedUser: '["Guest user"]',
      message: "",
      spentTime: "01:30",
      deadline: yesterday,
      isItOver: false,
      completedOn: false,
      firstTask: true,
      activeTask: true,
      demonstrationPurposes: true,
    },
    {
      name: "Design review",
      assignedUser: '["Guest user"]',
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
      name: "Client validation",
      assignedUser: '["Guest user"]',
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
      name: "Applying design",
      assignedUser: '["Guest user"]',
      message: "",
      spentTime: "00:00",
      deadline: "",
      isItOver: false,
      completedOn: false,
      firstTask: true,
      activeTask: true,
      demonstrationPurposes: true,
    },
    {
      name: "Design review",
      assignedUser: '["Guest user"]',
      message: "",
      spentTime: "00:00",
      deadline: "",
      isItOver: false,
      completedOn: false,
      firstTask: false,
      activeTask: false,
      demonstrationPurposes: true,
    },
    {
      name: "Client validation",
      assignedUser: '["Guest user"]',
      message: "",
      spentTime: "00:00",
      deadline: "",
      isItOver: false,
      completedOn: false,
      firstTask: false,
      activeTask: false,
      demonstrationPurposes: true,
    },
  ];

  let tasks2 = [
    {
      name: "Programming",
      assignedUser: '["Guest user"]',
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
      name: "Client validation",
      assignedUser: '["Guest user"]',
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
      name: "Programming",
      assignedUser: '["Guest user"]',
      message: "",
      spentTime: "00:00",
      deadline: "",
      isItOver: false,
      completedOn: false,
      firstTask: true,
      activeTask: true,
      demonstrationPurposes: true,
    },
    {
      name: "Client validation",
      assignedUser: '["Guest user"]',
      message: "",
      spentTime: "00:00",
      deadline: "",
      isItOver: false,
      completedOn: false,
      firstTask: false,
      activeTask: false,
      demonstrationPurposes: true,
    },
  ];

  let demoPhase0 = {
    _id: "0",
    isItOver: true,
    tasks: tasks0,
    basicTasks: basicTasks0,
    name: "Content creation",
    demonstrationPurposes: true,
  };

  let demoPhase1 = {
    _id: "1",
    isItOver: false,
    tasks: tasks1,
    basicTasks: basicTasks1,
    name: "Design phase",
    demonstrationPurposes: true,
  };

  let demoPhase2 = {
    _id: "2",
    isItOver: false,
    tasks: tasks2,
    basicTasks: basicTasks2,
    name: "Design phase",
    demonstrationPurposes: true,
  };

  const projectDescription =
    "This is a demonstration project. It is meant to show how the basic PromoManager functionality loop. Real projects can be edited, have multiple assigned users, with specific tasks each, and new phases and tasks can be added.";

  return {
    isItOver: false,
    teamMembers: [{ name: "Guest user", role: "Guest user" }],
    phases: [demoPhase0, demoPhase1, demoPhase2],
    _id: "demoProject",
    name: "Demo project",
    budgetNumber: "B12345",
    client: "Project client",
    description: projectDescription,
    type: "eDetailing",
    version: 1,
  };
};

export default DemoProject;
