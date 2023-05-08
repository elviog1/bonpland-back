const mongoose = require('mongoose')

const noticeSchema = new mongoose.Schema({
    title: {type:String, required: true},
    notice: {type:String, required: true},
    date: {type:String, required: true},
    images: {type:String, required: true},
})

const Notice = mongoose.model("notices", noticeSchema)
module.exports = Notice