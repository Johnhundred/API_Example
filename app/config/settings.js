const path = require('path');
require('dotenv').config({ path: '../../.env' });

const dbUrl = process.env.DATABASE_URL || null;
let prodName;
let prodUser;
let prodPassword;
let prodDb;

// Capture/Isolate DB vars from Heroku DB string for Sequelize CLI (Migrations) usage
// Only real choice, given that DB details can change, and these are not separately available
// Utilized for production only (On Heroku)
if (dbUrl) {
  const temp = dbUrl.split('@');
  const tempTwo = temp[1];
  const tempThree = tempTwo.split(':');
  prodName = tempThree[0]; // eslint-disable-line
}

// Same as above
if (dbUrl) {
  const temp = dbUrl.split('@');
  const tempTwo = temp[0];
  const tempThree = tempTwo.split(':');
  prodUser = tempThree[1].replace('//', '');
  prodPassword = tempThree[2]; // eslint-disable-line

  const tempFour = temp[1].split('/');
  prodDb = tempFour[1]; // eslint-disable-line
}

// Make root dir available as a variable
const thisDir = path.resolve(__dirname);
const dirArray = thisDir.split('/');
const rootDir = `/${dirArray[1]}/`;

// Config vars
const vars = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  rootDir,

  tokenSecret: process.env.JWT_TOKEN_SECRET || 'shhh4Aw00w1',
  tokenMaxAge: process.env.JWT_TOKEN_MAX_AGE || '30d',
  logLevel: process.env.LOG_LEVEL || 'debug',

  development: {
    db: {
      connectionCount: process.env.DATABASE_CONNECTION_COUNT || 5,
      minConnectionCount: process.env.DATABASE_MIN_CONNECTION_COUNT || 0,
      connectionIdleTimeout: process.env.DATABASE_CONNECTION_TIMEOUT || 10000,
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'admin',
      dbName: process.env.POSTGRES_DB || 'local_dev',
      host: process.env.POSTGRES_HOST || '172.17.0.1',
      port: process.env.POSTGRES_PORT || 5432,
      url: process.env.DATABASE_URL || false,
    },
  },

  production: {
    db: {
      connectionCount: process.env.DATABASE_CONNECTION_COUNT || 10,
      minConnectionCount: process.env.DATABASE_MIN_CONNECTION_COUNT || 0,
      connectionIdleTimeout: process.env.DATABASE_CONNECTION_TIMEOUT || 10000,
      user: process.env.POSTGRES_USER || prodUser,
      password: process.env.POSTGRES_PASSWORD || prodPassword,
      dbName: process.env.POSTGRES_DB || prodDb,
      host: prodName,
      port: process.env.POSTGRES_PORT || 5432,
      url: process.env.DATABASE_URL || false,
    },
  },

  testing: {
    db: {
      connectionCount: process.env.DATABASE_CONNECTION_COUNT || 5,
      minConnectionCount: process.env.DATABASE_MIN_CONNECTION_COUNT || 0,
      connectionIdleTimeout: process.env.DATABASE_CONNECTION_TIMEOUT || 10000,
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'admin',
      dbName: process.env.POSTGRES_DB || 'local_dev',
      host: process.env.POSTGRES_HOST || '172.17.0.1',
      port: process.env.POSTGRES_PORT || 5432,
      url: process.env.DATABASE_URL || false,
    },
  },
};

module.exports = vars;
