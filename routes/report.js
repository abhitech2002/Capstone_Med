const express = require('express')
const multer = require('multer')
const Report = require('../models/report')

const reportRouter = express.Router()

// Set up Multer for file uploads



// create a report
reportRouter.post('/', (req, res) => {
    const { title, description } = req.body;
  
    // const images = req.files ? req.files.map(file => file.filename) : [];
    // const pdf = req.file ? req.file.filename : '';
  
    const newReport = new Report({
      title, description,
    });
    newReport.save()
        .then((report) => {
            res.status(201).json({
                data: report
            });
        })
        .catch((error) => {
            res.status(500).json({ 
                error: error.message 
            });
        });

})

// Getting all reports
reportRouter.get('/', (req, res) => {
    Report.find()
        .then((reports) => {
            res.status(200).json({
                data: reports
            });
        })
        .catch((error) => {
            res.status(500).json({ 
                error: error.message 
            });
        });
  });
  

// updating reports
reportRouter.put('/:id', (req, res) => {
    const reportId = req.params.id;
    const { title, description } = req.body;
  
    Report.findByIdAndUpdate(reportId, {
      title, description, 
      updatedAt: Date.now()
    }, { new: true })
        .then((report) => {
            if (!report) {
            return res.status(404).json({ error: 'Report not found' });
            }
            res.status(200).json({data: report});
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
  });

// Delete a report
reportRouter.delete('/:id', (req, res) => {
    const reportId = req.params.id;
  
    Report.findByIdAndRemove(reportId)
      .then((report) => {
        if (!report) {
          return res.status(404).json({ error: 'Report not found' });
        }
        res.status(200).json({ message: 'Report deleted successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });
  
  module.exports = reportRouter;


  