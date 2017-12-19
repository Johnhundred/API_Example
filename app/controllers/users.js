const validator = require('validator');
const Models = require('../models/');
const logger = require('../modules/logger'); // eslint-disable-line
const { xssProtect } = require('../modules/xssfilter');
const settings = require('../config/settings'); // eslint-disable-line

module.exports.getUserList = async () => {
  try {
    let users = await Models.User.getUserList()
      .catch((err) => {
        throw err;
      });

    if (users) {
      users = await xssProtect(users);
      return users;
    }

    throw Error('Could not generate user list.');
  } catch (err) {
    throw err;
  }
};

module.exports.getUserById = async (id) => {
  try {
    const sanitizedId = validator.toInt(id);

    let user = await Models.User.getUser(sanitizedId)
      .catch((err) => {
        throw err;
      });

    if (user) {
      user = await xssProtect(user);
      return user;
    }

    throw Error('No user with that ID.');
  } catch (err) {
    throw err;
  }
};

module.exports.createUser = async (data) => {
  try {
    let { email } = data;

    if (validator.isEmail(email)) {
      email = validator.normalizeEmail(email);
    } else {
      const error = Error('Email validation failed.');
      error.msg = 'Please submit a correctly formatted email';
      throw error;
    }

    await Models.User.createUser(email)
      .catch((err) => {
        throw err;
      });

    return true;
  } catch (err) {
    throw err;
  }
};
