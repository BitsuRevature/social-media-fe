# Use an official Node.js runtime as the base image
FROM node:23-alpine

# Set the working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React application
RUN npm run build

# Expose the port the app runs on
EXPOSE 5173

# Start the application using a lightweight server
CMD ["npx", "serve", "-s", "dist" , "-l", "5173"]