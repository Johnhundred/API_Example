const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compress = require('compression');
const helmet = require('helmet');
const authenticationRoute = require('./routes/authentication');
const logger = require('./modules/logger');
const settings = require('./config/settings');
const { ErrorHandler } = require('./modules/error');

const app = express();

// Streaming morgan HTTP request logging to winston.
app.use(require('morgan')('combined', { stream: logger.stream }));

// Parse body parameters and attach them to the request: request.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable CORS for production
if (settings.env === 'production') {
  app.use(cors({ origin: false }));
}

app.use(cors({ origin: false }));

// Enable gzip compression
app.use(compress());

// Basic security
app.use(helmet());

app.use('api/v1/authentication', authenticationRoute);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Error: Unknown endpoint.');
  err.status = 404;

  next(err);
});

// Error handler
app.use(ErrorHandler);

module.exports = app;
