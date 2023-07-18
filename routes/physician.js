const express = require('express')
const Physician = require('../models/physician')

const physicianRouter = express.Router()

// creating a physician
physicianRouter.post('/', (req, res) => {
    const {name, specialization, phone, email, address} = req.body

    const newPhysician = new Physician({
        name, specialization, phone, email, address
    })

    newPhysician.save()
        .then((physician) => {
            res.status(201).json({
                message: "Physician created successfully.",
                data: physician
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: "Physician Creation failed",
                data: {},
                error: error.message
            })
        })
})

// Getting all physician data
physicianRouter.get('/', (req, res) => {
    Physician.find()
        .then((physician) => {
            if(!physician){
                return res.status(404).json({
                    message: "Physician Not Found.",
                    data: {},
                    error: error.message
                })
            }
            res.status(200).json({
                message:"Physician Data Fetch Successfully.",
                data: physician,
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: "Physician Fetching Failed.",
                data: {},
                error: error.message 
            })
        })
})

// Updating a physician data
physicianRouter.put('/:id', (req, res) => {
    const physicianId = req.params.id;
    const { name, specialization, phone, email, address } = req.body;

    Physician.findByIdAndUpdate(physicianId, {
        name, specialization , phone, email, address
    }, { new: true })
        .then((physician)=>{
            if(!physician){
                return res.status(404).json({
                    message: "Physician Not Found.",
                    data: {},
                    error: error.message
                })
            }
            res.status(200).json({
                message:"Physician Updation Successfully.",
                data: physician,
            })
        })
        .catch((error)=>{
            res.status(500).json({
                message: "Physician Updation Failed.",
                data: {},
                error: error.message 
            })
        })
})

// Deleting a physician
physicianRouter.delete('/:id', (req, res) => {
    const physicianId = req.params.id

    Physician.findByIdAndDelete(physicianId)
        .then((physician) => {
            if(!physician){
                return res.status(404).json({
                    message: "Physician Not Found.",
                    data: {},
                    error: error.message
                })
            }
            res.status(200).json({
                message:"Physician Deletion Successfully.",
                data: physician,
            })
        })
        .catch((error)=>{
            res.status(500).json({
                message: "Physician Deletion Failed.",
                data: {},
                error: error.message 
            })
        })
})

module.exports = physicianRouter