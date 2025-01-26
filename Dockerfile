# Use an official Node.js image as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy all application code, excluding those in .dockerignore
COPY . .

# Expose the port on which the Node.js application will run
EXPOSE 3000

# Run the application
CMD ["node", "src/index.js"]
