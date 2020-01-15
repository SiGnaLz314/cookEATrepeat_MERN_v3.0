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

var environment = process.env.NODE_ENV || 'development';

const adminRouter = require('./routes/admin');
const recipesRouter = require('./routes/recipes');
const usersRouter = require('./routes/users');
const uploadRouter = require('./routes/upload');

// MIDDLEWARE
//  debugging
app.use(morgan('dev'));
//  handling json data
app.use(express.json());
//  read url data
app.use(express.urlencoded({ extended: true }));
//  read body data (express includes this -- may be removed)
app.use(bodyParser.urlencoded({ extended: true }));
//  read body data in json
app.use(bodyParser.json());

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
app.use(passport.session()); // Calls serializeUser and deserializerUser

app.use(cors({ credentials: true }));

// Middleware to set headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

// Middleware to determine and set environment based variables
if (environment === 'production') {
    app.use(express.static('client/build'));
} else {
    app.use(express.static('client/public'));
}

// ROUTES
//  Declared below passport.session() to ensure sessionData is sent with each request.
app.use('/api/profiles', adminRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/users', usersRouter);
app.use('/api/upload', uploadRouter);

// MIDDLEWARE to send all uncaught routes to index.html
if (environment === 'production') {
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`SERVER is running on port: ${port}`);
});


module.exports = app;