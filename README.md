# Todo Server

This repository contains the server-side code for a Todo application. The server handles all backend functionalities related to managing tasks, including CRUD operations and task status transitions.

## Project Purpose

The Todo Server was developed to provide a backend solution for managing tasks in a Todo application. It supports operations such as creating, updating, deleting tasks, and moving tasks between different states (Todo, In Progress, Done). This server implementation serves as a demonstration of CRUD operations and integration with a MongoDB database.

## Features

- User Authentication: Secure user authentication and authorization mechanisms.
- CRUD Operations: Users can create, read, update, and delete tasks.
- Task State Management: Tasks can be moved between Todo, In Progress, and Done states.
- Error Handling: Robust error handling for graceful degradation.
- Security: Implementation of security best practices to protect data integrity.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose (ODM for MongoDB)
- JSON Web Tokens (JWT) for authentication
- Axios for HTTP requests

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/mjrafi01/todo-server.git
   cd todo-server
   
2. Install dependencies:
   ```sh
   npm install

3. Configuration
Create a .env file in the root directory and add the following environment variables:
```sh
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

5. Usage
Start the server using the following command:
nodemon index.js
## API Endpoints


### Todo Collection

- **GET /todoCollection**: Fetch all tasks.
- **POST /todoCollection**: Create a new task.
- **PATCH /todoCollection/:id**: Update a task.
- **DELETE /todoCollection/:id**: Delete a task.

### In Progress Collection

- **GET /onProgressCollection**: Fetch all tasks in progress.
- **POST /onProgressCollection**: Move a task from Todo to In Progress.
- **PATCH /onProgressCollection/:id**: Update a task in progress.
- **DELETE /onProgressCollection/:id**: Remove a task from In Progress.

### Done Collection

- **GET /doneCollection**: Fetch all completed tasks.
- **POST /doneCollection**: Move a task from In Progress to Done.
- **PATCH /doneCollection/:id**: Update a completed task.
- **DELETE /doneCollection/:id**: Remove a completed task.

   

   
