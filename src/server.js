'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/routes.js');
const PORT = process.env.PORT || 3030;
// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', proofOfLife);
function proofOfLife(req, res) {
  res.status(200).json('SERVER IS ALIVE!');
}
app.use(authRoutes);

// Catchalls
app.use(notFound);
app.use(errorHandler);

function start() {
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  }

module.exports = {
  server: app,
  start:start
};