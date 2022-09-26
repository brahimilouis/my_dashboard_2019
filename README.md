# Dashboard 

> Our dashboard is made to give you simple access to some api implemented like : Youtube, Cinéma for film and series informations, the weather, Finance like money exchanges
 
## What is it?

Widgets can be customized with the name and the refresh rates.<br> 

**Current Services:**

- Weather

- Youtube

- Cinéma

- Finance
  

## Requirement

  

- [Node](https://nodejs.org/en/) >= 8
- [Nuxt.js](https://github.com/nuxt/nuxt.js)>= 2.2
- [Vuetify.js](https://vuetifyjs.com/)>= 1.3

 

## Build Setup

MongoDB must be installed in your setup if you want to make it run with npm run dev.
Dashboard can be launch with a docker. Explanation below.

``` bash

# install dependencies
$ npm install
  
# build for production
$ npm run build

# start the dashboard
$ npm run dev

Docker with dockerd previously launched : 

# build an image from the Dockerfile (use sudo if there is any problem)
$ docker-compose build

# launch the app in the container (use sudo if there is any problem)
$ docker-compose up

```
The service server run on port 8080.
You have access the about.json with localhost:8080/about.json

## PROJECT DOCUMENTATION

Inside the repository, you can find a folder: DOCUMENTATION with some diagrams explaining to you the project itself. You can maintain it easily and propose some new features.
This folder will contain: 
- An Architecture Diagram
- A Dashboard usage explanation
- Mockup