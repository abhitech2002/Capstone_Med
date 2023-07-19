const express = require('express')
const Patient = require('../models/patient')
const { default: mongoose } = require('mongoose')
const patientRouter = express.Router()

// Creating a patient 
patientRouter.post('/', (req, res) => {
    const { name, age, gender, phone, address, preIllness } = req.body

    const newPatient = new Patient({
        name, age, gender, phone, address, preIllness
    })

    newPatient.save()
        .then((patient) => {
            res.status(201).json({
                message: 'Patient Crated Successfully.',
                data: patient
            })
        })
        .catch((error) => {
            // console.log(error)
            res.status(500).json({
                message: "Patient Creation failed.",
                data: {},
                error: error.message ? error.message : error.toString(),
            })
        })
})


// Getting all patient
patientRouter.get('/', (req, res) => {
    Patient.find()
        .then((patient) => {
            res.status(200).json({
                message: "Patient data fetch successfully.",
                data: patient
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: "Patient Data Fetching failed",
                data: {},
                error: error.message ? error.message : error.toString(),
            })
        })
})

// Updating a Patient data
patientRouter.put('/:id', (req, res) => {
    const patientId = req.params.id
    const { name, age, gender, phone, address, preIllness } = req.body

    // Checking if the patientId is valid objectId
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
        return res.status(400).json({
            error: 'Invalid patient ID'
        })
    }

    Patient.findByIdAndUpdate(patientId, {
        name, age, gender, phone, address, preIllness
    }, { new: true })
        .then((patient) => {
            if (patient) {
                return res.status(404).json({
                    message: "Patient Not Found"
                })
            }
            res.status(200).json({
                message: "Patient updated successfully",
                data: patient,
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Updation Failed',
                data: {},
                error: error.message ? error.message : error.toString(),

            })
        })
})

// Deleting a patient
patientRouter.delete('/:id', (req, res) => {
    const patientId = req.params.id

    Patient.findByIdAndDelete(patientId)
        .then((patient) => {
            if (!patient) {
                return res.status(404).json({
                    message: "Patient Not Found",
                    data: {},
                    error: error.message ? error.message : error.toString(),
                })
            }
            res.status(200).json({
                message: "Patient Deleted Successfully",
                data: patient
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: "Patient Deletion failed",
                data: {},
                error: error.message ? error.message : error.toString(),
            })
        })
})

// Getting a single patient
patientRouter.get('/:id', (req, res) => {
    const patientId = req.params.id;

    Patient.findById(patientId)
        .then((patient) => {
            if (!patient) {
                return res.status(404).json({ error: 'Patient not found' });
            }
            res.status(200).json({ message: "Data fetch successfuuly.", data: patient });
        })
        .catch((error) => {
            res.status(500).json({ message: "Data not fetch successfuuly", error: error.message });
        });
});

module.exports = patientRouter