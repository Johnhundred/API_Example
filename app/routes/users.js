const express = require('express');
const {
  getUserList,
  getUserById,
  createUser,
} = require('../controllers/users');

const router = express.Router();

router.get('/', async (request, response, next) => {
  try {
    const users = await getUserList()
      .catch((err) => {
        throw err;
      });

    response.json(users);
  } catch (err) {
    err.msg = 'Failed to retrieve user list.';
    next(err);
  }
});

router.get('/:id', async (request, response, next) => {
  try {
    const user = await getUserById(request.params.id)
      .catch((err) => {
        throw err;
      });

    response.json(user);
  } catch (err) {
    err.msg = 'Failed to find a user with that ID.';
    next(err);
  }
});

router.post('/', async (request, response, next) => {
  try {
    await createUser(request.body)
      .catch((err) => {
        throw err;
      });

    response.status(201).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
