# pull official base image
FROM node:18.12.0-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g

# add app
COPY . ./

EXPOSE 4200

# start app
CMD ["npm", "start"]