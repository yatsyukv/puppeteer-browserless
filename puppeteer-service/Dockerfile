FROM node:10-slim

# Move to the web root
WORKDIR /var/www/html

# Copy Node package list and install modules
COPY package.json .
COPY package-lock.json .
RUN npm install && npm install -g concurrently

# Copy the application
COPY . .

# Build the application
RUN npm run build

# Ports
EXPOSE 80

# Start the Node application
CMD [ "npm", "start" ]
