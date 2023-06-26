# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Copy the source code
COPY . ./

# Build the React app
RUN npm run build

# Expose the port your app listens on (typically 3000)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
