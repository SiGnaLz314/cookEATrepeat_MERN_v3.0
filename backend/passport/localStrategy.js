const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
    {
        usernameField: 'username' // Can be changed 'username' is default
    },
    (username, password, done) => {
        User.findOne({'local.username': username}, (err, userMatch) => {
            if(err) {
                return done(err);
            }
            if(!userMatch) {
                return done(null, false, {message: 'Incorrect Username/Password'});
            }
            if(!userMatch.checkPassword(password)) {
                return done(null, false, {message: 'Incorrect Passoword/Username'});
            }
            return done(null, userMatch)
        })
    }
)

module.exports = strategy;