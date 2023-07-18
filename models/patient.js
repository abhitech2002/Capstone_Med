const mongoose = require('mongoose')

// Creating Schema fo Patient
const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required:true
    },
    preIllness: {
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Patient', patientSchema)