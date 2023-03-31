const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    date: {type:String, required : true},
    team1: {type:String, required:true},
    goalTeam1: {type:Number, required:true},
    team2: {type:String, required:true},
    goalTeam2: {type:Number, required:true}
})

const Game = mongoose.model("games",gameSchema)
module.exports = Game