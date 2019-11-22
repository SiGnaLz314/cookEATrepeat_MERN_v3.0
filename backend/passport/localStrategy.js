const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
    {
        usernameField: 'username' // Can be changed 'username' is default
    },
    (username, password, done) => {
        User.findOne({'local.username': username}, (err, user) => {
            if(err) {
                return done(err);
            }
            if(!user) {
                return done(null, false, {message: 'Incorrect Username/Password'});
            }
            if(!user.checkPassword(password)) {
                return done(null, false, {message: 'Incorrect Passoword/Username'});
            }
            return done(null, user)
        })
    }
)

module.exports = strategy;