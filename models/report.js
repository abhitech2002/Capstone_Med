const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    images: {
      data: Buffer,
      contentType: String
    },
    // pdf: {
    //   data: Buffer,
    //   contentType: String
    // }
  },{timestamps: true});
  
  module.exports = Report = mongoose.model('Report', reportSchema);