
# Social Media Front End
This project is a web application built using TypeScript, JavaScript, React, and Tailwind CSS. It includes features such as user authentication, profile management, and post creation. The application interacts with a backend API for data storage and retrieval.

## React Router Documentation
This project uses React Router to handle client-side routing. Below is an explanation of how React Router is used in this project:

-  **Setup**:
React Router is set up in the App.tsx file, where the BrowserRouter component wraps the main App component.
- **Routes Configuration**:
The routes are configured in the App.tsx file using the Routes and Route components from React Router.
- **Route Components**:
Each route corresponds to a specific component that is rendered when the route is accessed.

## Redux
In this project, Redux is used to manage the state of the application, particularly for handling posts and authentication. Here's a brief explanation of how Redux works in this project:  

### Post State
- **State Management**: The state is managed in a slice called postSlice. The initial state includes an array of posts, a loading flag, and an array of loading IDs.  
- **Async Actions**: Redux Toolkit's createAsyncThunk is used to handle asynchronous actions such as fetching posts, creating posts, deleting posts, adding comments, and liking/unliking posts. These thunks handle API calls using Axios and manage the state based on the API responses.  
- **Reducers**: The slice includes reducers to handle the state changes based on the actions dispatched. The extraReducers field is used to handle the different states (pending, fulfilled, rejected) of the async actions.  
- **Notifications**: The project uses react-toastify to show notifications for different actions like loading, success, and error states.

### Auth State
- **State Management**: The state is managed in a slice called authSlice. The initial state includes properties such as user, isAuthenticated, isLoading, and error.  
- **Async Actions**: Redux Toolkit's createAsyncThunk is used to handle asynchronous actions such as logging in, logging out, and registering users. These thunks handle API calls using Axios and manage the state based on the API responses.  
- **Reducers**: The slice includes reducers to handle the state changes based on the actions dispatched. The extraReducers field is used to handle the different states (pending, fulfilled, rejected) of the async actions.  
- **Notifications**: The project uses react-toastify to show notifications for different actions like loading, success, and error states.

## CI/CD Pipeline:
This Jenkins pipeline automates the process of building, testing, and deploying a Java Spring Boot application. Here is a step-by-step explanation of each stage:  

### Pipeline Overview
- **Agent**: Specifies that the pipeline can run on any available Jenkins agent.
- **Environment**: Defines environment variables, including AWS credentials, Docker credentials, and database connection details.
### Stages
#### Checkout Code:
- Checks out the source code from the Git repository.
#### Build and push docker image:
- Builds a Docker image for the application.
- Tags the Docker image.
- Logs into Docker Hub using the provided credentials.
- Pushes the Docker image to Docker Hub.
#### Remote into docker runner ec2, pull and run image:
- Connects to a remote EC2 instance using SSH.
- Stops and removes any running container named be.
- Pulls the latest Docker image from Docker Hub.

## Run Locally
To run the project locally, follow these steps:  
### Prerequisites
- Ensure you have Node.js and npm installed on your machine.
- Ensure you have Docker installed if you plan to use Docker for running the application.
### Steps
- **Clone the Repository**  
```shell
git clone https://github.com/BitsuRevature/social-media-fe.git
cd social-media-fe
```
- **Install Dependencies**
```shell
npm install
```
- **Run the Application**
```shell
npm run dev
```

**Access the Application Open your browser and navigate to http://localhost:3000.**  
### Using Docker
- Build the Docker Image
```shell
docker build -t social-media-fe .
- Run the Docker Container 
```
```shell 
docker run -p 3000:3000 social-media-fe
```
**Access the Application Open your browser and navigate to http://localhost:3000.**  
**These steps will help you set up and run the project locally on your machine.**

## Technologies Used

| Technology        | Description                                                          |
|-------------------|----------------------------------------------------------------------|
| TypeScript        | A strongly typed programming language that builds on JavaScript.     |
| React             | A JavaScript library for building user interfaces.                   |
| Tailwind CSS      | A utility-first CSS framework for rapid UI development.              |
| Axios             | A promise-based HTTP client for the browser and Node.js.             |
| React Toastify    | A library to add notifications to your React app.                    |
| MUI (Material-UI) | A popular React UI framework with a comprehensive set of components. |
| VS Code           | Integrated development environment (IDE)                             |
| Git               | Version control system                                               |
| GitHub            | Platform for version control and collaboration                       |
| Vi-Test           | Testing framework for React with Vite                                |
| Docker            | Containerization platform                                            |
| Docker Hub        | Cloud-based repository for Docker images                             |
| Jenkins           | Continuous integration and delivery tool                             |