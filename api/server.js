const express = require('express');
const { logger } = require('./middleware/middleware');
const server = express();
const usersRouter = require('./users/users-router');

server.use(express.json());
server.use(logger);
server.use('/api/users', usersRouter);



// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  })
})



module.exports = server;
