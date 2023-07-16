const mongoose = require('mongoose')

// Schema for Physician
const physicainSchema = new mongoose.Schema({

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
    specialization:{
        type: String,
        required: [true, 'Specialization of Physician is required.']
    },
    timing:{
        type:Object,
        required: [true, 'work timing is required']
    }   
},{timestamps:true})

module.exports = mongoose.model('Physician', physicainSchema)