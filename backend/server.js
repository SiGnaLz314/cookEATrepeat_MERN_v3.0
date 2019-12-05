require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");
const passport = require('passport');
const session = require('express-session');
const app = express();
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(express.json());
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoClient constructor
const uri = process.env.ATLAS_URI;
mongoose.Promise = global.Promise;
mongoose.connect(uri, {
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true,
        useFindAndModify: false });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})


// EXPRESS-SESSION Config
var sessionStore = new MongoStore({ mongooseConnection: connection });
app.use(
	session({
		secret: process.env.SECRET_KEY, // Pick a random string to make the hash
		store: sessionStore, // Store session data in MongoStore
		resave: false, // REQUIRED: Mark sessions active (wait for changes)
		saveUninitialized: false, // REQUIRED: Dont save session automatically (wait for changes)
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000, // Only store for 2 Days
            httpOnly: true,
            secure: false, // Does not use HTTPS
        },
        key:'connect.sid' // SessionID (connect.sid is default)
    })
)
app.use(passport.initialize());
app.use(passport.session()); // Calls deserializer

// Moved below passport.session to ensure its enabled with passport.session
app.use(cors());

// Added for Session Debugging
app.all('*', function (req, res, next) {
    console.log("********")
    console.log("All Routes session.cookie.expires:", req.session.cookie.expires);
    console.log("********")
    console.log("All Routes sessionID:", req.sessionID);
    console.log('All Routes Is Authenticated: ', req.isAuthenticated());
    console.log('')
    console.log('')
    next(); // pass control to the next handler
  });

// Routes are below passport.session for proper order
const adminRouter = require('./routes/admin');
const recipesRouter = require('./routes/recipes');
const usersRouter = require('./routes/users');
const uploadRouter = require('./routes/upload');
app.use('/profiles', adminRouter);
app.use('/recipes', recipesRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.listen(port, () => {
    console.log(`SERVER is running on port: ${port}`);
});

module.exports = app;