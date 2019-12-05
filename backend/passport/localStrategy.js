const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;

/**
 * Passport LocalStrategy: passport-local
 *
 * Ensures user exists in database.
 * 
 * @returns error, or truthy. 
 * @see passport/index
 */
const strategy = new LocalStrategy(
    {
        usernameField: 'username' // Can be changed 'username' is default
    },
    (username, password, done) => {
        console.log(`LOCAL STRATEGY Username: ${username}`);
        
        User.findOne({'username': username}, (err, user) => {
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