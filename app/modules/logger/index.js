const winston = require('winston');
const settings = require('../../config/settings');

const { logLevel } = settings[settings.env];

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      filename: `${settings.rootDir}logs/combined.log`,
      level: logLevel,
      timestamp: () => { // eslint-disable-line
        return (new Date()).toISOString();
      },
      handleExceptions: true,
      json: true,
      maxsize: 5242880 * 2, // 10MB
      maxFiles: 5, // Current + 4
      colorize: false,
    }),
    new winston.transports.Console({
      level: logLevel,
      timestamp: () => { // eslint-disable-line
        return (new Date()).toISOString();
      },
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write: (message, encoding) => { // eslint-disable-line
    logger.info(message.trim());
  },
};

logger.logDatabase = (message) => {
  logger.logDatabaseMessages.info(message.trim());
};

logger.logDatabaseMessages = new winston.Logger({
  transports: [
    new winston.transports.File({
      filename: `${settings.rootDir}logs/database.log`,
      level: 'error',
      timestamp: () => { // eslint-disable-line
        return (new Date()).toISOString();
      },
      json: true,
      maxsize: 5242880 * 2, // 10MB
      maxFiles: 5, // Current + 4
      colorize: false,
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
