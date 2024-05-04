const express = require('express');
const EmployerController = express.Router();
const Employer = require('../models/EmployerSchema'); // Adjust the path as needed

// Create a new employer
EmployerController.post('/employer', async (req, res) => {
    try {
        const employerData = new Employer(req.body);
        const savedEmployer = await employerData.save();
        res.status(201).json(savedEmployer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all employers
EmployerController.get('/employer', async (req, res) => {
    try {
        const employers = await Employer.find();
        res.json(employers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific employer by ID
EmployerController.get('/employer/:id', async (req, res) => {
    try {
        const employer = await Employer.findById(req.params.id);
        if (!employer) {
            res.status(404).json({ message: 'Employer not found' });
            return;
        }
        res.json(employer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an employer by ID
EmployerController.put('/employer/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedEmployer = await Employer.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedEmployer) {
            res.status(404).json({ message: 'Employer not found' });
            return;
        }

        res.json(updatedEmployer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an employer by ID
EmployerController.delete('/employer/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedEmployer = await Employer.findByIdAndDelete(id);

        if (!deletedEmployer) {
            res.status(404).json({ message: 'Employer not found' });
            return;
        }

        res.json({ message: `Employer with ID ${id} has been deleted` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = EmployerController;
