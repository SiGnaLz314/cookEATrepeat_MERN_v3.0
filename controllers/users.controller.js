// @flow
"use strict";

let UserCtlr = (User) => {
    let UserObj = {};

    UserObj.SignUpUser = (req, res, next) => {
        const { admin, username, firstName, lastName, password } = req.body
    
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
                'admin': admin,
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
    }

    UserObj.Login = (req, res, next) => {
            var userInfo = {
                user: req.user.username,
                admin: req.user.admin,
            }
            res.json(userInfo);
            next();
        },
        (req, res, next) => {
            req.login(req.user, () => {
                req.session.save(() => {
                });
        });
    }

    UserObj.GetLoggedInUser = (req, res, next) => {
        if (req.user) {
            return res.json({ user: req.user });
        } else {
            return res.json({ user: null });
        }
    }

    UserObj.Logout = (req, res, next) => {
        if (req.user) {
            req.logout();
            res.status(200).clearCookie('connect.sid', {
                path: '/'
            });
            req.session.destroy(function (err) {
                res.redirect('/');
            });
        } else {
            return res.clearCookie('connect.sid', { path: '/' }).status(200).send('Logged Out, Cookies Cleared');
        }
    }

    return UserObj;
}

module.exports = UserCtlr;