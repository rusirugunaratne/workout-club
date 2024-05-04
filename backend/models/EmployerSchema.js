const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true, // Assuming the company name is required
    },
    noOfEmployees: {
        type: String,
        required: false,
    },
    services: {
        type: String,
        required: false,
    },
    logo: {
        type: String,
        required: false,
    },
    employerDetails: {
        type: String,
        required: false,
    },
    pageVisits: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Employer', employerSchema);
