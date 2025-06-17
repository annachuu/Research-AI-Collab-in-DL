const express = require('express')
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUsers
} = require('../controllers/userController')

/**
 * Registers the route for user registration.
 * @name POST /api/auth/register
 */
router.post('/register', registerUser);

/**
 * Registers the route for user login.
 * @name POST /api/auth/login
 */
router.post('/login', loginUser);

/**
 * Registers the route for user lists.
 * @name POST /api/users
 */
router.get('/', getUsers);

module.exports = router