# Anvaya CRM Dashboard

A full-stack CRM application designed to track leads, manage them by assigned agents and status, and generate reports to provide clear insights into lead progress and business performance.

Built with a React frontend, Express/Node backend, MongoDB databases.

## Demo Link

[Live Demo](https://major-project2-frontend-two.vercel.app/) 

## Quick Start

```
git clone https://github.com/vickykumar3510/MajorProject2_frontend.git
cd <MajorProject2_frontend>
npm install
npm run dev
```
## Technologies
- React JS
- React Router
- Node JS
- Express
- MongoDB

## Demo Video
Watch a walkthrough of all the major features of this app: [Google Drive Link](https://drive.google.com/drive/folders/1zyp1T-NHZIX2T3y74WWfJKo9ZL7bEU4t?usp=sharing)

## Features
**Home**
- Display all the Lead Name
- Button and Links to display all the lead by Status
- Add a New Lead button provided
- Navigate to all the pages through Sidebar

**Leads**
- Display all the Lead with Status and Sales Agent name
- Filter by Status, Sales Agent, Tags, Lead Source dropdown available
- "Sort by Priorty" and "Time to Close" button are available
- Add a New Lead button also provided

**Add New Lead**
- Lead form is there to add a new Lead.

**Lead by Status**
- Showing all the leads by Status with Sales Agent name
- Agents and Priority dropdown are available
- Sort by "Time to Close" dropdown is available

**Sales Agent Management**
- Showing all the Sales Agent and their email id
- Add a New Sales Agent button is also provided

**Add New Sales Agent**
- A form is provided to create a new sales agent

**Reports**
- Report Overview is provided with the help of pie chart and bar diagrams
- Total Leads closed and in Pipeline, Leads Closed by Sales Agent, Lead Status Distribution charts are there

**Lead Management**
- All details about a particular lead is provided
- Edit Lead button is available
- Comments feature is also available so that Sales Agents can provided their status through text
- Filter Comments by Sales Agent dropdown is there to filter the comments by Sales Agent

**Edit Lead Page**
- A form is provided to edit the lead according to the latest status.

**Leads by Sales Agent**
- Display all the leads of a Sales Agent and its status
- Filter by Status and Filter by Priority dropdown are provided
- Sort by "Time to Close" button is also provided

**Settings**
- Display All Leads and All Sales Agents with delete button

##API Reference
--
**GET/api/leads**<br>
List of all leads<br>

Sample Response:
```
[{ _id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt, __v }]
```

**GET/api/agents**<br>
List of all Sales Agents<br>

Sample Response:

```
[{ _id, name, email, createdAt, __v }]
```

**GET/api/leads/:id/comments**<br>
List of all comments on a lead<br>

Sample Response:

```
[{ id, commentText, author, createdAt }]
```

**GET/api/report/pipeline**<br>
Number of total leads in pipeline and total closed leads<br>

Sample Response:

```
[{ totalLeadsInPipeline, totalLeadsClosed }]
```

**GET/api/report/agent-closures**<br>
Number of leads closed by sales agents<br>

Sample Response:

```
[{ labels, counts }]
```

**GET/api/report/status-distribution**<br>
Report of lead status distribution<br>

Sample Response:

```
[{ labels, counts }]
```

**PUT/api/leads/:id**<br>
Update a lead<br>

Sample Response:

```
[{ _id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt, __v }]
```

**DELETE/api/leads/:id**<br>
Delete a lead<br>

Sample Response:

```
[{ message }]
```

**DELETE/api/agents/:id**<br>
Delete an agent<br>

Sample Response:

```
[{ message }]
```

**POST/api/agents**<br>
For add a Sales Agent<br>
```
[{ _id, name, email, createdAt, __v }]
```

**POST/api/leads**<br>
For create a Lead<br>
```
[{ _id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt, __v }]
```

**POST/api/leads/:id/comments**<br>
For add a comment on a lead<br>
```
[{ id, commentText, author, createdAt }]
```

##Contact 
--
For bugs or feature requests, please reach out to vicky.kumar3510@gmail.com