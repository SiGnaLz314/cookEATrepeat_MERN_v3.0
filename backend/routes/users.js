const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const passport = require('../passport');


router.route('/google').get(passport.authenticate('google', {scope: ['profile']}))

router.route('/google/callback').get(
    passport.authenticate('google',{
        successRedirect: '/',
        failureRedirect: '/login'
    })
)

router.route('/signup').post( (req, res) => {
    const {username, firstName, lastName, password } = req.body

    User.findOne({ 'local.username': username }, (err, user) => {
        if(user) {
            return res.send({
                err: 'User already exists.'
            });
        }
        const newUser = new User({
            'local.username': username,
            'local.password': password,
            'firstName': firstName,
            'lastName': lastName,
        })
        newUser.save((err, savedUser) => {
                if (err) 
                    return res.json(err)
			    res.json(savedUser)
		    })
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

//PRODUCTION CODE:
router.route('/login').post(
    function(req, res, next) {
        console.log("/login req.session", req.sessionID)
        console.log('-------------');
        console.log("/login req.session", req.session)
        console.log('-------------');
        console.log('')
        console.log('')
        next();
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('Logged In User: ', req.user);
        var userInfo = {
            user: req.user.local.username
        }
        res.send(userInfo);
    }
)

//DEBUGGING CUSTOM ROUTE:
// router.route('/login').post(
//     function (req, res, next) {
//         // call passport authentication passing the "local" strategy name and a callback function
//         passport.authenticate('local', function (error, user, info) {
//           // this will execute in any case, even if a passport strategy will find an error
//           // log everything to console
//         console.log("USERS /login: error", error);
//         console.log("USERS /login: user", user);
//         console.log("USERS /login: info", info);
    
//         if (error) {
//             res.status(401).send(error);
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


router.route('/').get((req, res, next) => {
    if(req.user){
        // console.log(req.sessionID);
        return res.json({ user: req.user });
    } else {
        return res.json({ user: null });
    }
})

router.route('/logout').post((req, res) => {
    if(req.user) {
        req.logout();
        res.redirect('/');
    } else {
        return res.json({message: 'Logged Out'});
    }
})

module.exports = router;