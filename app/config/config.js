const settings = require('./settings');

const {
  user,
  password,
  dbName,
  host,
} = settings[settings.env].db;

module.exports = {
  development: {
    username: user,
    password,
    database: dbName,
    host,
    dialect: 'postgres',
  },
  production: {
    username: user,
    password,
    database: dbName,
    host,
    dialect: 'postgres',
  },
};
