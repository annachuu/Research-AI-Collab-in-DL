const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


/**
 * registerUser()
 * Controller function to register a new user.
 * @params {req, res} - The request and response object.
 * @returns {object} - success state and data of the new user.
 */

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username && !password) {
            res.status(400).json({ success: false, error: "Please add username and password" });            
        }

        const userExists = await User.findOne({ username });

        if (userExists) {
            res.status(400).json({ success: false, error: "Username already exists" });  
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username: username,
            password: hashedPassword
        })
        res.status(200).json({success: true, data: newUser})  
    }catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }  
})

/**
 * loginUser()
 * Controller function to log in a user.
 * @params {req, res} - The request and response object.
 * @returns {object} - success state and data of the logged-in user or an error message.
 */
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({ success: true, data: user });
        } else if (!user) {
            res.status(400).json({ success: false, error: "You don't have an account. Please register first." });
        } else {
            res.status(400).json({ success: false, error: 'Wrong Username or Password' });
        }
    }catch (error) {
        res.status(500).json({ success: false, message: error.message });
    } 
});


/**
 * getUsers()
 * @route GET /api/users
 * @access Private
 * @returns {object} - success state and data of users.
 */
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.status(200).json({success: true, data: users})
})


module.exports = {
    registerUser,
    loginUser,
    getUsers
}