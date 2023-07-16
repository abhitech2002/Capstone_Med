// Importing Required modules
const router = require("express").Router();
const patient = require('../models/patient')

// Routes of patient
// Get All /patients

router.get('/', (req, res) => {
    patient.find({}) // find method to get the data
        .then((patients) => res
            .status(200)
            .json({
                message: "Patient Fetch Successfully."
            })
        )
        .catch((error) => res
            .status(422)
            .json({
                message: 'Patient fetch failed'
            })
        )
})

// post /patients
router.post('/', (req, res) => {
    const { body } = req 
    const newPatients = new patient({ $set: body })

    newPatients.save()
        .then((patients) =>
            res.status(201).json({
                message: "Patients Created Successfully",
                data: patients
            })
        )
        .catch((error) =>
            res.status(422).json({
                message: "patients Creation failed",
                data: {},
                error: error.message ? error.message : error.toString()
            })
        )
})

// Put /patients/:id
router.put('/:id', (req, res) => {
    const { id } = req.params
    const { body } = req

    patient.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then((patients) => {
            if (!patients) {
                return res.status(404).json({
                    message: "Patient Not found",
                    data: {},
                    error: error.message ? error.message : error.toString(),
                })
            }
            else {
                return res.status(201)
                    .json({
                        message: "Patients data updated Successfully",
                        data: patients
                    })
            }
        })
        .catch((error) => res
            .status(422)
            .json({
                message: "Post updation failed.",
                data: {},
                error: error.message ? error.message : error.toString(),
            })
        )
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    patient.findByIdAndDelete(id)
        .then((patients) => {
            if (!patients) {
                return res.status(404).json({
                    message: "Patient Not found",
                    data: {},
                    error: error.message ? error.message : error.toString(),
                })
            }
            else {
                res
                    .status(200)
                    .json({
                        message: "Patients deleted Successfully",
                        data: patients
                    })
            }
        })
        .catch((error) => res
            .status(200)
            .json({
                message: 'Patients deletion failed',
                data: {},
                error: error.message ? error.message : error.toString(),
            })
        )
})

module.exports = router