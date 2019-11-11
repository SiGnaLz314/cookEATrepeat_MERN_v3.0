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

router.route('/').get((req, res, next) => {
    console.log('USER:');
    console.log(req.user);
    if(req.user){
        return res.json({ user: req.user });
    } else {
        return res.json({ user: null });
    }
})

router.route('/login').post(
    (req, res, next) => {
        console.log(req.body);
        console.log('');
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('Logged In: ', req.user);
        const userData = {
            username: req.user.username
        };
        res.send(userData);
    }
)

router.route('/logout').post((req, res) => {
    if(req.user) {
        req.logout();
        res.send({ msg: 'Logged Out'});
    } else {
        res.send({msg: 'not available'});
    }
})

router.route('/signup').post( (req, res) => {
    const {username, password } = req.body

    User.findOne({ 'local.username': username }, (err, user) => {
        if(user) {
            res.send({
                error: 'User already exists.'
            });
        }
        const newUser = new User({
            'local.username': username,
            'local.password': password
        })
        newUser.save((err, savedUser) => {
                if (err) 
                    return res.json(err)
			    return res.json(savedUser)
		    })
            //.then(() => res.status(200))
            // .then(() => res.json('Recipe Added!'))
            //.catch(err => res.status(400).json('Error: ' + err));
    })
})


module.exports = router;