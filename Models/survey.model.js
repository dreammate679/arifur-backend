const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    issues: {
        type: [String],
        default: []
    },
    otherIssues: {
        type: String,
        default: ""
    },
    jobSupport: {
        type: [String],
        default: []
    },
    otherJobSupport: {
        type: String,
        default: ""
    },
    infrastructure: {
        type: [String],
        default: []
    },
    otherInfrastructure: {
        type: String,
        default: ""
    },
    healthcareEducation: {
        type: String,
        default: ""
    },
    environmentConcerns: {
        type: String,
        default: ""
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey