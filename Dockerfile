# docker file for Chat (https://github.com/jarne/Chat)

# Start from Node.js base image
FROM node:11.14

# Create SSH directory for root user
RUN mkdir /root/.ssh

# Add GitHub host keys
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

# Go into the webserver folder
WORKDIR /var/www

# Clone the repository and move the files to the right place
RUN git clone https://github.com/jarne/Chat.git

# Go into the application folder
WORKDIR /var/www/Chat

# Install dependecies with NPM
RUN npm install

# Start the application
CMD ["npm", "start"]

# Open used ports
EXPOSE 3000
