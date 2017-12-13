const Sequelize = require('sequelize');
const Fs = require('fs');
const Path = require('path');
const settings = require('../config/settings');
const { logDatabaseMessages } = require('../modules/logger');

const {
  connectionCount,
  minConnectionCount,
  connectionIdleTimeout,
  url,
  user,
  password,
  dbName,
  host,
} = settings[settings.env].db;
let sequelize;

// If we have a full connection string (heroku), use that
if (url) {
  sequelize = new Sequelize(url, {

    pool: {
      max: connectionCount,
      min: minConnectionCount,
      idle: connectionIdleTimeout,
    },

    dialectOptions: { decimalNumbers: true },

    logging: logDatabaseMessages.info,

    timezone: 'Europe/Copenhagen',
  });

  sequelize
    .authenticate()
    .then(() => {
      logDatabaseMessages.info('Database connection established.');
    })
    .catch((err) => {
      logDatabaseMessages.error('Unable to connect to the database:', err);
    });
} else {
  sequelize = new Sequelize(dbName, user, password, {
    host: host, // eslint-disable-line
    dialect: 'postgres',

    pool: {
      max: connectionCount,
      min: minConnectionCount,
      idle: connectionIdleTimeout,
    },

    dialectOptions: { decimalNumbers: true },

    logging: logDatabaseMessages.info,

    timezone: 'Europe/Copenhagen',
  });

  sequelize
    .authenticate()
    .then(() => {
      logDatabaseMessages.info('Database connection established.');
    })
    .catch((err) => {
      logDatabaseMessages.info('Unable to connect to the database:', err);
    });
}

const db = {};

// Synchronously read all the files in this directory (except index and dotfiles)
// - and import them as models
Fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(Path.join(__dirname, file));
    db[model.name] = model;
  });

// If the model has an associate key, run it - passing in all models for association purposes
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export connection
db.sequelize = sequelize;

// Export uninstantiated sequelize class to create a separate connection if needed
// - testing, separate setup, whatever
db.Sequelize = Sequelize;

module.exports = db;
