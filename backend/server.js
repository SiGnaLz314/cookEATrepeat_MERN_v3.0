require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");
const passport = require('passport');
const session = require('express-session');
const app = express();
const MongoStore = require('connect-mongo')(session);
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(express.json());
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

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


// CONNECT-MONGO Config
app.use(
	session({
		secret: process.env.SECRET_KEY, //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: connection }),
		resave: false, //required mark sessions active (wait for changes)
		saveUninitialized: false, //required dont save session automatically (wait for changes)
        cookie: { 
            secure: false, // Does not use HTTPS
        },
        key:'connect.sid' // Session ID (???)
    })
)
app.use(passport.initialize());
app.use(passport.session()); // Calls deserializer

// Moved below passport.session to ensure its enabled with passport.session
app.use(cors());

// Added for Session Debugging
app.all('*', function (req, res, next) {
    console.log("********")
    console.log("All Routes session:", req.session);
    console.log("********")
    console.log("All Routes sessionID:", req.sessionID);
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