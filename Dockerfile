# Docker file for Chat (https://github.com/jarne/Chat)

# Start from Node.js base image
FROM node:14.17

# Create SSH directory for root user
RUN mkdir /root/.ssh

# Add GitHub host keys
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

# Go into the webserver folder
WORKDIR /var/www

# Clone the repository
RUN git clone https://github.com/jarne/Chat.git

# Change permissions of app folder to application user
RUN chown -R node:node /var/www/Chat

# Switch to non-root user
USER node

# Go into the application folder
WORKDIR /var/www/Chat

# Install dependecies with NPM
RUN npm install

# Start the application
CMD ["npm", "start"]

# Open used ports
EXPOSE 3000
