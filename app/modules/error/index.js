const logger = require('../logger');

function getStackTraceString(err) {
  let stack = err.stack || '';

  stack = stack.split('\n').map(line => line.trim());
  stack = stack.join('\n');

  return stack;
}

// Express error handler convention, but eslint complains about the unused next param
module.exports.ErrorHandler = async (err, req, res, next) => { // eslint-disable-line
  // Get stacktrace string for log purposes
  const stackTrace = getStackTraceString(err);
  // Generalized message & status
  let eMessage = 'The server encountered an unexpected error.';
  let status = 500;

  // If the error has a custom message and/or status, use that instead
  if (Object.prototype.hasOwnProperty.call(err, 'message')) {
    eMessage = err.message;
  }

  if (Object.prototype.hasOwnProperty.call(err, 'status')) {
    status = err.status; // eslint-disable-line
  }

  logger.error(`Error handler - Caught error: ${JSON.stringify(err)} Stacktrace: ${stackTrace}`);

  res.status(status).send(eMessage);
};
