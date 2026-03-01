# Use an official Node runtime as a parent image
FROM node:24-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
# We do this before copying the rest of the code to leverage Docker layer caching
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE ${NODEuPORT}
EXPOSE ${VITEuPORT}

# Command to run the app
CMD ["npm", "run", "dev"]