FROM node:21-alpine3.17

RUN apk update && apk add bash

# Set the working directory to /src
WORKDIR /src

# Copy the package.json and package-lock.json files to /src
COPY package*.json /src/

# Install the dependencies
RUN npm install --legacy-peer-deps --force

# Copy the rest of the code to /src
COPY . /src/

# Expose port 3000
EXPOSE 3000