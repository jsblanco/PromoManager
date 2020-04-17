# Project- PALCONY - Social interaction amidst a quarantine 



## Description
Promotional agencies usually have to juggle numerous projects at the same time, which require the participation of different departments and meeting tight deadlines. For this to work, every department must be coordinated and every task must be met in time. Without the proper organisation, however, it is easy to lose track of the state of a specific project, missing crucial deadlines.

PromoManager it a project management tool to help these agencies manage their projects, coordinate their tasks and meet their deadlines.

## How it works
Upon registering on the platform, users must define their role in the company. Users that select "Account" will act as administrators in the platform, creating, modifying and closing projects.

The core of the platform is the list of projects. Every project has a specific set of users assigned upon creation. Projects can be divided into phases (such as Content creation, Design, Programming...), which represent the fundamental stages of the project creation. Client approval is required to proceed from one phase to the next.

Each phase is subsequently divided into tasks, which are assigned a user and a deadline. These tasks represent the inner workflow of the company, preparing the project in order to show it to the client. Upon completing all tasks in a phase, the phase can be completed, if client approval has been received, or reset from the start, if the client demands changes. If the phase is reset, their round number will increase by one,  all completed tasks will be hidden, and can be consulted by checking the phase history.  

In every project, the first task not marked as complete is considered as active. Their assigned user will be notified and will need to completethe task in order for his colleagues to proceed with their project.

Finally, if all phases in a project are completed, the project can be closed, and it will no longer appear on the user's project list unless specifically looking for finished projects.

Users with the "Account" role can create, edit and close projects; create phases and populate them with tasks, and assign a deadline and a user to these tasks.

Upon login, users are greeted into a welcome page showing all their active tasks and deadlines, so they can easily assess their workload. The navbar will also show notifications with the number of active tasks at all times.

All users see, in their left sidebar, a list with all their assigned ongoing projects. If they are the user assigned to the active task of a project, said project will appear at the top of the list with a white background. However, if the active task is assigned to a different user, the project will appear at the bottom of the sidebar with a grey background.

All projects in the sidebar show the project name and budget number, and the assigned user and deadline of the active task, in order for users to be able to see, at a glance, the state of the project.

Finally, the sidebar has a toggle button to switch between ongoing and finished projects, and a search field to look for projects by name or budget number.

## MVP
- Responsive webpage (mobile-first, tablet, laptop)
- Enable users to register on the website and select their role in the company
- Enable users with the "Account" role to:
        - Create projects
        - Assign users to each project
        - Divide the project into phases
        - Populate phases with tasks
        - Assign tasks and deadlines to each task
- Display all projects the user is assigned to in the sidebar
- To have at least a landing-page, sign-up form, log-in form, a FAQs wildframe and a wildframe were the user profile info is displayed. 
- Sign up-form and log-in form must have some validation format (i.e. password must be longer than 6 characters).
- User data and event data must be stored on MongoDB collections.
- Passwords must be stored in an encrypted format

## Backlog
- Create a Clients database entry
- Modify and restart completed phases


### Git
https://github.com/jsblanco/PromoManager


### Slides
https://drive.google.com/file/d/1oZse7d1FqoG-pqUHwBnAz7R8lzTBP-FT/view?usp=sharing