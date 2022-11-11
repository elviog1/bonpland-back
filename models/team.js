const mongoose = require("mongoose")

const teamSchema = new mongoose.Schema({
    name: {type:String, required:true},
    country: {type:String, required:true},
    city: {type:String, required:true},
    fundation: {type:String, required:true},
    dt: {type:String, required:true},
    photo: {type:String, required:true},
    
})

const Team = mongoose.model("teams",teamSchema)
module.exports = Team