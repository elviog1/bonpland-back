const mongoose = require("mongoose")

const photoSchema = new mongoose.Schema({
    img: {type:String, required: true},
    description: {type:String, required: true},
})

const Photo = mongoose.model("photos", photoSchema)
module.exports = Photo