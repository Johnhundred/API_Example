const express = require('express');
const bodyParser = require('body-parser');
const authenticationRoute = require('./routes/authentication');
const logger = require('./modules/logger');
const { ErrorHandler } = require('./modules/error');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Dev settings
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Streaming morgan HTTP request logging to winston.
app.use(require('morgan')('combined', { stream: logger.stream }));

app.use('api/authentication', authenticationRoute);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Error: Unknown endpoint.');
  err.status = 404;

  next(err);
});

// Error handler
app.use(ErrorHandler);

module.exports = app;
