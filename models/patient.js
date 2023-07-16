const mongoose = require('mongoose')


// Schema for patient 
const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Name is Required."]
    },
    gender:{
        type: String,
        required: [true, 'Gender is Required.']
    },
    age:{
        type: Number,
        required: [true, "Age is required."]
    }, 
    address: {
        type: String,
        required: [true, 'Address is required.']
    },
    phone:{
        type: Number,
        required: [true, 'Phone Number is required.']
    },
    pre_illness:{
        type: String,
        required:[true, 'Previous illness record required.']
    }
})

module.exports = mongoose.model('Patient', patientSchema)