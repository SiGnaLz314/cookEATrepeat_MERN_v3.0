const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../models/user.model');

// User Serialization for persistent Login Sessions
passport.serializeUser((user, done) => {
    // console.log('Serializing user: ');
    // console.log(user._id);
    console.log("Serialized User:")
    console.log(user);
    console.log('')
    console.log('')
    done(null, user._id);
});

// ISSUE NOT Being Called.
// Express Session is creting new Session on each request
// findOne never finds an _id that matches (? Perplexing)
passport.deserializeUser( (id, done) => {
    console.log('Deserializing user... ')
    User.findById(id, 'username',
        (err, user) => {
            if(err){
                console.log("Deserializing Error:", err);
                done(err);
            }
            console.log('Deserialized User: ');
            console.log(user);
            done(null, user);
    });
});

passport.use(LocalStrategy);

module.exports = passport;