const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const passport = require('../passport');

const UserController = require('../controllers/users.controller')(User);


/**
 * POST: Register User Info.
 * 
 * Creates User Object in Database with user input details.
 * 
 * @alias /signup
 * @see signup.coponent
 */
router.route('/signup').post(UserController.SignUpUser);

/**
 * POST: LOGIN: PRODUCTION.
 * 
 * Uses passport.authenticate('local') as designed.  Does not provide debugging details.
 * 
 */
router.route('/login').post( passport.authenticate('local'), UserController.Login );

/**
 * Get: User.
 * 
 * Supplies the boolean for loggedIn.
 * 
 * @alias /
 * @see App
 */
router.route('/').get(UserController.GetLoggedInUser);

/**
 * Logout.
 * 
 * Ensures that req.user object is destroyed.
 * 
 */
router.route('/logout').post(UserController.Logout);

module.exports = router;