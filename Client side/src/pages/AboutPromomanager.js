import React from "react";
import { DemoPhase } from "../components/DemoPhase";
import { DemoProjectCard } from "../components/DemoProjectCard";


export const AboutPromomanager = () => {



  return (
    <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-7 m-5">
        <h1>What is PromoManager?</h1>

        <p>
          Promotional agencies usually have to juggle numerous projects at the
          same time, which require the participation of different departments
          and meeting tight deadlines. For this to work, every department must
          be coordinated and every task must be met in time. Without the proper
          organisation, however, it is easy to lose track of the state of a
          specific project, missing crucial deadlines.
        </p>
        <p>
          PromoManager it a project management tool to help these agencies
          manage their projects, coordinate their tasks and meet their
          deadlines.
        </p>

        <h3>Who is behind PromoManager?</h3>

        <p>
          PromoManager was created by Jorge Sánchez Blanco on April 2020, as his
          final project for the Web Development full-time bootcamp at Ironhack.
          It is a React.js-based app running on an Express Node.JS-based backend
          and a MongoDB database.
        </p>

        <h3>How it works</h3>

        <p>
          Upon registering on the platform, users must define their role in the
          company. Users that select "Account" will act as administrators in the
          platform, creating, modifying and closing projects.
        </p>

        <p>
          The core of the platform is the list of projects. Every project has a
          specific set of users assigned upon creation. Projects can be divided
          into phases (such as Content creation, Design, Programming...), which
          represent the fundamental stages of the project creation. Client
          approval is required to proceed from one phase to the next.
        </p>

        <p>
          Each phase is subsequently divided into tasks, which are assigned a
          user and a deadline. These tasks represent the inner workflow of the
          company, preparing the project in order to show it to the client.
          Active tasks look like this:
        </p>


<h3 className="mt-4">Project workflow demo</h3>

<DemoProjectCard />

        <p>
          Upon completing all tasks in a phase, the phase can be completed, if
          client approval has been received, or reset from the start, if the
          client demands changes. If the phase is reset, their round number will
          increase by one, all completed tasks will be hidden, and can be
          consulted by checking the phase history.
        </p>

        <h5 className="mt-3 pb-1">Project workflow in PromoManager</h5>
        <img className="w-100 mb-3" src={"./data structure.png"} />
        <p>
          In every project, the first task not marked as complete is considered
          as active. Their assigned user will be notified and will need to
          complete the task in order for his colleagues to proceed with their
          project.Finally, if all phases in a project are completed, the project
          can be closed, and it will no longer appear on the user's project list
          unless specifically looking for finished projects.
        </p>

        <p>
          Users with the "Account" role can create, edit and close projects;
          create phases and populate them with tasks, and assign a deadline and
          a user to these tasks.
        </p>

        <p>
          Upon login, users are greeted into a welcome page showing all their
          active tasks and deadlines, so they can easily assess their workload.
          The navbar will also show notifications with the number of active
          tasks at all times.
        </p>

        <p>
          All users see, in their left sidebar, a list with all their assigned
          ongoing projects. If they are the user assigned to the active task of
          a project, said project will appear at the top of the list with a
          white background. However, if the active task is assigned to a
          different user, the project will appear at the bottom of the sidebar
          with a grey background.
        </p>

        <p>
          All projects in the sidebar show the project name and budget number,
          and the assigned user and deadline of the active task, in order for
          users to be able to see, at a glance, the state of the project.
        </p>

        <p>
          Finally, the sidebar has a toggle button to switch between ongoing and
          finished projects, and a search field to look for projects by name or
          budget number.
        </p>
      </div>
    </div>
  );
};
