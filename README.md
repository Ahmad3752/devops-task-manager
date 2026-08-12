# DevOps Task Manager(CI/CD)

A small, clean **Node.js + Express** web application built to practice DevOps and CI/CD. It is intentionally simple: an in-memory task list, no database, no build step. Use it as a starting point for learning Docker, Jenkins, CI/CD, and AWS deployment.

## Features

- **Home page** (`GET /`) — clean HTML interface titled *DevOps Task Manager* to view tasks and add new ones.
- **Task API**
  - `GET /api/tasks` — returns all tasks as JSON.
  - `POST /api/tasks` — adds a task. Accepts `{ "title": "Learn Jenkins" }`.
- **Health endpoint** (`GET /health`) — returns `{ "status": "ok" }`. This is the endpoint a Jenkins pipeline can use later to verify a deployed instance is healthy.

## Tech Stack

- Node.js
- Express
- Plain HTML / CSS / JavaScript
- Jest + Supertest for automated tests

## Project Structure

```
devops-task-manager/
├── src/
│   └── app.js          # Express app (routes, validation)
├── public/
│   ├── index.html      # Home page
│   ├── style.css       # Styling
│   └── app.js          # Frontend logic (fetch + render)
├── tests/
│   └── app.test.js     # Jest + Supertest tests
├── server.js           # Entry point, reads PORT, starts server
├── package.json
├── package-lock.json
└── .gitignore
```

## Requirements

- Node.js 18 or newer
- npm

## Install

```bash
npm install
```

## Run Locally

```bash
npm start
```

The server reads the `PORT` environment variable and defaults to `3000`.

- App: http://localhost:3000
- Health: http://localhost:3000/health
- Tasks API: http://localhost:3000/api/tasks

To run on a different port:

```bash
PORT=8080 npm start
```

On Windows PowerShell:

```powershell
$env:PORT=8080; npm start
```

## Run Tests

```bash
npm test
```

Tests cover:

- `GET /` returns HTTP 200.
- `GET /health` returns HTTP 200.
- `GET /health` returns `{ "status": "ok" }`.
- `GET /api/tasks` returns an array.
- `POST /api/tasks` creates a task.
- `POST /api/tasks` rejects invalid input (missing, empty, or non-string title).

## Next Phases

This app is ready to be extended for DevOps practice:

1. **Docker** — containerize the app with a `Dockerfile`.
2. **Jenkins CI** — add a pipeline that installs deps and runs `npm test`.
3. **Jenkins CD** — deploy the tested build to a server.
4. **AWS EC2 deployment** — run the container or app on EC2.
5. **AWS ECR** — pushing the container to ecr 
