const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../models/user.model')

const strategy = new GoogleStrategy(
	{
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: '/users/google/callback'
	},
	function(accessToken, refreshToken, profile, done) {
		// testing
		console.log('GOOGLE PROFILE')
		console.log(profile)
        
        const { id, name, photos } = profile
		User.findOne({ 'google.googleId': id }, (err, userMatch) => {
			if (err) {
				console.log('Error!! trying to find user with googleId')
				console.log(err)
				return done(null, false)
			}
			// if there is already someone with that googleId
			if (userMatch) {
				return done(null, userMatch)
			} else {
				// if no user in our db, create a new user with that googleId
				console.log('Google User Create')
				console.log(id)
				console.log(profile)
				console.log('new user created')
				const newGoogleUser = new User({
					'google.googleId': id,
					firstName: name.givenName,
					lastName: name.familyName,
					photos: photos
				})
				newGoogleUser.save((err, savedUser) => {
					if (err) {
						console.log('Error!! google user not saved')
						console.log(err)
						return done(null, false)
					} else {
						return done(null, savedUser)
					}
				}) 
			}
		})
	}
)

module.exports = strategy