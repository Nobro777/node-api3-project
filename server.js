const express = require('express');
// const morgan = require('morgan'); // THIRD PARTY MIDDLEWARE
// const postRouter = require('./posts/postRouter.js');
// const helmet = require('helmet'); //THIRD PARTY MIDDLEWARE
const server = express();

// server.use(morgan("dev"));
// server.use(helmet());
// server.use(logger);
// server.use(express.json());
// server.use('/api/posts', postRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});




//custom middleware

// function logger(req, res, next) {

//   const method = req.method;
//   const endpoint = req.originalUrl;
//   console.log(`${method} to ${endpoint}`);

//   next();

// }

module.exports = server;
