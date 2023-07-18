const mongoose = require('mongoose')

const physicianSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    address:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Physician', physicianSchema)