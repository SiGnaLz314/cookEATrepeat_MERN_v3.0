require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");
const passport = require('passport');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const port = process.env.PORT || 5000;
const morgan = require('morgan');

const adminRouter = require('./routes/admin');
const recipesRouter = require('./routes/recipes');
const usersRouter = require('./routes/users');
const uploadRouter = require('./routes/upload');

var environment = process.env.NODE_ENV || 'development';

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")))

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


// SESSION Config
var sessionStore = new MongoStore({ mongooseConnection: connection });
app.use(
	session({
		secret: process.env.SECRET_KEY, // Pick a random string to make the hash
		store: sessionStore, // Store session data in MongoStore
		resave: false, // REQUIRED: Mark sessions active (wait for changes)
        saveUninitialized: false, // REQUIRED: Dont save session automatically (wait for changes)
        cookie: {
            // maxAge: 2 * 24 * 60 * 60 * 1000, // Only store for 2 Days
            maxAge:  60 * 60 * 1000, // TEST: Only store for 60 minute(s)
            httpOnly: true,
            secure: false, // Does not use HTTPS
        },
        name:'connect.sid' // SessionID (connect.sid is default)
    })
)
app.use(passport.initialize());
app.use(passport.session()); // Calls serializeUser and deserializerUser(?)

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// Routes are below passport.session for proper order
app.use('/profiles', ensureAuthenticated, adminRouter);
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
if (environment === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500).json(err);
        res.json(err);
    });
}

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`SERVER is running on port: ${port}`);
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('http://localhost:3000/login');
}

module.exports = app;