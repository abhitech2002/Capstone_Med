const express = require('express')
const multer = require('multer')
const Report = require('../models/report')

const reportRouter = express.Router()


// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Validate file type 
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1048 * 1048, // 5 MB limit for image files
  },
}).single('images');

// create a report
reportRouter.post('/', (req, res) => {

  upload(req, res, (err) => {
    if (err) {
      console.log(err)
      return res.status(500).json({
        error: 'Failed to upload image',
      });
    }
    const newImage = new Report({
      title: req.body.title,
      description: req.body.description,
      images: {
        data: req.file ? req.file.filename : '',
        contentType: 'image/png',
      },
    })
    newImage.save()
      .then((report) => {
        res.status(201).json({
          message: "Report Uploaded Successfully.",
          data: report
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Report upload failed.",
          error: error.message
        });
      });
  })
})

// Getting all reports
reportRouter.get('/', (req, res) => {
  Report.find()
    .then((reports) => {
      res.status(200).json({
        message:"Report Fetched Successfully.",
        data: reports
      });
    })
    .catch((error) => {
      res.status(500).json({
        message:"Report Fetched failed.",
        data: {},
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
        return res.status(404).json({ 
          data: {},
          error: 'Report not found' 
        });
      }
      res.status(200).json({ 
        message: "Report Updated Successfully",
        data: report 
      });
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


