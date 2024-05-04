const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
    weight: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    }
});

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    sets: [setSchema] // Embedding set schema within exercise schema
});

const workoutSchema = new mongoose.Schema({
    workoutName: {
        type: String,
        required: true
    },
    exercises: [exerciseSchema], // Embedding exercise schema within workout schema
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Workout', workoutSchema);
