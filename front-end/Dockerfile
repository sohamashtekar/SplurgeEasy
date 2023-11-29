FROM node:21-alpine3.17

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to /app
COPY package*.json /app/

# Install the dependencies
RUN npm install --legacy-peer-deps --force

# Copy the rest of the code to /app
COPY . /app/

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]