const express = require('express'),
      cookie = require('cookie-parser'),
      session = require('express-session')
      users = require('./routes/index'),
      app = express();


const bodyParser = require('body-parser')

app.use(cookie())
app.use(
        session({
            secret: 'groupe de aurel et louis',
            resave: true,
            saveUninitialized: true,
        }),
)

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json());

app.use(users)


module.exports = {
    path: '/',
    handler: app,
};
