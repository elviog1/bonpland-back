const mongoose = require("mongoose")

const playerSchema = new mongoose.Schema({
    name: {type:String, required:true},
    lastname: {type:String, required:true},
    date: {type:String, required:true},
    height: {type:Number, required:true},
    country: {type:String, required:true},
    city: {type:String, required:true},
    photo: {type:String, required:true},
    description: {type:String, required:true},
    captain: {type:Boolean, required:true},
    
})

const Player = mongoose.model("players",playerSchema)
module.exports = Player