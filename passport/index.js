const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../models/user.model');

/**
 * serializeUser: adds passport: user to express-session
 * 
 * @see login.component axios.post(URL, {user}, axiosConfig)
 * 
 * IMPORTANT: axios post needs header set to include credentials
 */
passport.serializeUser((user, done) => {
    done(null, user._id);
});

/**
 * deserializeUser: called when sessionID is found in express-session
 * which will be passed as session{...{passport: user}}.
 * 
 * IMPORTANT: axios post needs header set to include credentials.
 * 
 * @see profiles.component axios.get(URL, axiosConfig)
 * 
 */
passport.deserializeUser( (id, done) => {
    User.findById(id, 'username',
        (err, user) => {
            if(err){
                done(err);
            }
            done(null, user);
    });
});

passport.use(LocalStrategy);

module.exports = passport;