const router = require('express').Router();
const User = require('../models/user.model');


router.route('/').get((req, res, next) => {
    //console.log("Profiles: req.passport.user", req);
    console.log("Profiles req.sessionID: ", req.sessionID);
    console.log("Profiles req.session: ", req.session);
    console.log("Profiles req._passport: ", req._passport);
    console.log("Profiles: req**", );
    
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;