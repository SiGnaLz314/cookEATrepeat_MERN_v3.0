require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const app = express();
const MongoStore = require('connect-mongo')(session);
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session()); // Calls deserializer

const uri = process.env.ATLAS_URI;
// MongoClient constructor
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
// app.use(
// 	session({
// 		secret: process.env.SECRET_KEY, //pick a random string to make the hash that is generated secure
// 		store: new MongoStore({ mongooseConnection: connection }),
// 		resave: false, //required
// 		saveUninitialized: false //required
// 	})
// )


const authRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');
const usersRouter = require('./routes/users');
const uploadRouter = require('./routes/fileUpload');

app.use('/users', authRouter);
app.use('/recipes', recipesRouter);
app.use('/users', usersRouter);
app.use('/fileUpload', uploadRouter);

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