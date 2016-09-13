FROM node:6

# Create the folder where the app will run
RUN mkdir -p /var/app
WORKDIR /var/app

# Install dependencies
COPY package.json /var/app/
RUN npm install --production

# Copy these files into the folder
COPY *.js /var/app/

# Set the default arguments to 'start'
CMD ['npm', 'start']
