const express = require('express');
const cors = require('cors');
const db = require('./db/db');
const path = require('path');

const spotRouter = require('./routes/spot-router');

const app = express();
const apiPort = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public/uploads")));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api', spotRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
}

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));