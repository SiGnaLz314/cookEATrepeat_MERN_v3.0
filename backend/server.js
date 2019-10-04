const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

const uri = process.env.ATLAS_URI;
// MongoClient constructor
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
    );
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const recipesRouter = require('./routes/recipes');
const usersRouter = require('./routes/users');
const uploadRouter = require('./routes/fileUploadRoutes');

app.use('/recipes', recipesRouter);
app.use('/users', usersRouter);
app.use('/fileUpload', uploadRouter);

app.listen(port, () => {
    console.log(`SERVER is running on port: ${port}`);
});