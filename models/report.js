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
    // images: {
    //   type: String
    // },
    // pdf: {
    //   type: String
    // }
  },{timestamps: true});
  
  module.exports = mongoose.model('Report', reportSchema);