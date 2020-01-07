const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const passport = require('../passport');


/**
 * POST: Register User Info.
 * 
 * Creates User Object in Database with user input details.
 * 
 * @alias /signup
 * @see signup.coponent
 */
router.route('/signup').post((req, res) => {
    const { username, firstName, lastName, password } = req.body

    User.findOne({ 'username': username }, (err, user) => {
        if (err) {
            console.log(`Sign Up Error: ${err}`);
        }
        else if (user) {
            return res.send({
                err: 'User already exists.'
            });
        }
        const newUser = new User({
            'username': username,
            'password': password,
            'firstName': firstName,
            'lastName': lastName,
        })
        newUser.save((err, savedUser) => {
            if (err)
                return res.json(err)
            res.json(savedUser)
            // res.redirect('./login');
        })
    })
        .catch(err => res.status(400).json('Error: ' + err));
})

/**
 * POST: LOGIN: PRODUCTION.
 * 
 * Uses passport.authenticate('local') as designed.  Does not provide debugging details.
 * 
 */
router.route('/login').post(
    function (req, res, next) {
        next();
    },
    passport.authenticate('local'),
    (req, res, next) => {
        var userInfo = {
            user: req.user.username
        }
        res.json(userInfo);
        next();
    },
    (req, res, next) => {
        req.login(req.user, () => {
            req.session.save(() => {
                // console.log('Req.Session.save():', req.session)
            });
        });
    }
)

/**
 * Login: DEVELOPMENT.
 * 
 * Uses passport.authenticate('local') user defined.  Provides Err insight.
 * 
 */
// router.route('/login').post(
//     function (req, res, next) {
//         // call passport authentication passing the "local" strategy name and a callback function
//         passport.authenticate('local', function (err, user, info) {
//           // this will execute in any case, even if a passport strategy will find an error
//           // log everything to console
//         console.log("USERS /login: error", err);
//         console.log("USERS /login: user", user);
//         console.log("USERS /login: info", info);

//         if (err) {
//             res.status(401).send(err);
//         } else if (!user) {
//             res.status(401).send(info);
//         } else {
//             next();
//         }

//             res.status(401).send(info);
//         })(req, res);
//     },
//       // function to call once successfully authenticated
//     function (req, res) {
//         res.status(200).send('Logged in!');
//     }
// );


/**
 * Get: User.
 * 
 * Supplies the boolean for loggedIn.
 * 
 * @alias /
 * @see App
 */
router.route('/').get((req, res) => {
    if (req.user) {
        // console.log(`/ GET req.user: ${req.user}`);
        return res.json({ user: req.user });
    } else {
        // console.log(`/ GET req.user: ${req.user}`);
        return res.json({ user: null });
    }
})


/**
 * Logout.
 * 
 * Ensures that req.user object is destroyed.
 * 
 */
router.route('/logout').post((req, res) => {
    if (req.user) {
        // console.log('LOGOUT:', req.user);
        req.logout();
        res.redirect('/');
    } else {
        // return res.json({message: 'Logged Out'});
        return res.clearCookie('connect.sid', { path: '/' }).status(200).send('Logged Out, Cookies Cleared');
    }
})

module.exports = router;