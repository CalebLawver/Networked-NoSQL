const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

const db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/NoSQL-Network',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

mongoose.set('debug', true);

// Api get, put, post, delete requests will go here.

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}!`);
});