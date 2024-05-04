const express = require("express");
const mongoose = require("mongoose");
const workoutController = require("./controller/WorkoutController");


const cors = require('cors');
const dotenv = require('dotenv'); // Import dotenv

// Load environment variables from .env
dotenv.config();

const connectionString = process.env.MONGODB_CONNECTION_STRING; // Access the MongoDB connection string from .env

mongoose.connect(connectionString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();
const port = process.env.PORT

app.use(express.json());
app.use(cors());
app.use('/api', workoutController)


app.listen(port, () => {
    console.log("Server running on port " + process.env.PORT + "...");
});
