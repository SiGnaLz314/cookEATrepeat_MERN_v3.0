const router = require('express').Router();
const User = require('../models/user.model');

/**
 * GET: Profiles.
 * 
 * @alias http://localhost:3000/Profiles
 * @see profiles.component
 */
router.route('/').get((req, res, next) => {
    // console.log("Session Debugging: ")
    // console.log("Profiles: req.passport.user", req);
    // console.log("Profiles req.sessionID: ", req.sessionID);
    // console.log("Profiles req.session: ", req.session);
    // console.log("Profiles req._passport.instance: ", req._passport.instance);
    
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;