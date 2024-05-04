const express = require('express');
const WorkoutController = express.Router();
const Workout = require('../models/WorkoutSchema'); // Adjust the path as needed

// Create a new workout
WorkoutController.post('/workout', async (req, res) => {
    try {
        const workoutData = new Workout(req.body);
        const savedWorkout = await workoutData.save();
        res.status(201).json(savedWorkout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all workouts
WorkoutController.get('/workout', async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific workout by ID
WorkoutController.get('/workout/:id', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            res.status(404).json({ message: 'Workout not found' });
            return;
        }
        res.json(workout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a workout by ID
WorkoutController.put('/workout/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedWorkout) {
            res.status(404).json({ message: 'Workout not found' });
            return;
        }

        res.json(updatedWorkout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a workout by ID
WorkoutController.delete('/workout/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedWorkout = await Workout.findByIdAndDelete(id);

        if (!deletedWorkout) {
            res.status(404).json({ message: 'Workout not found' });
            return;
        }

        res.json({ message: `Workout with ID ${id} has been deleted` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = WorkoutController;
