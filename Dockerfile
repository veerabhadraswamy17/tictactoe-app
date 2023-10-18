# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all the source files to the container
COPY . .

# Build the React app for production
RUN npm run build

# Expose the port that your app will run on (usually 3000)
EXPOSE 3000

# Command to start your app
CMD ["npm", "start"]
