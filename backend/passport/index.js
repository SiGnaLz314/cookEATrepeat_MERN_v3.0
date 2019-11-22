const passport = require('passport');
const LocalStrategy = require('./localStrategy');
//GOOGLE STRATEGY needs API Trusted Domain Verification (Will complete after hosting domain)
//const GoogleStrategy = require('./googleStrategy');
const User = require('../models/user.model');

// User Serialization for persistent Login Sessions
passport.serializeUser((user, done) => {
    console.log('Serializing user... ');
    console.log(user);
    // Passport Docs:
    done(null, user.id);
    // done(null, {_id: user._id});
});

passport.deserializeUser( (id, done) => {
    console.log('Deserializing user... ')
    User.findById(id, 
        (err, user) => {
            console.log('Deserialized User: ');
            console.log(user);
            // Passport Docs:
            done(err, user);
            // done(null, user);
    });
});

passport.use(LocalStrategy);
// SEE NOTE ABOVE
//passport.use(GoogleStrategy);

module.exports = passport;