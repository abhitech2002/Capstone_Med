const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Report", reportSchema)