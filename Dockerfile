# base image
FROM node:12

# set working directory
RUN mkdir -p /usr/local/app
COPY . /usr/local/app/
WORKDIR /usr/local/app

# add `/app/node_modules/.bin` to $PATH
ENV DB_HOST mongo

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm i --slient
RUN npm run build --silent


# start app
CMD ["npm", "run", "start"]

EXPOSE 8080