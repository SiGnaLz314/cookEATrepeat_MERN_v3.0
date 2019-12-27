const router = require('express').Router();
const User = require('../models/user.model');

/**
 * GET: Profiles.
 * 
 * @alias /Profiles
 * @see profiles.component
 */
router.route('/').get((req, res, next) => {
    // console.log("Session Debugging: ")
    // console.log("Profiles: req.session", req.session);
    // console.log("Profiles req.sessionID: ", req.sessionID);
    // console.log("Profiles req.session.passport: ", req.session.passport);
    console.log(`Profiles req.isAuthenticated ${req.isAuthenticated()}`);
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;