const Game = require('../models/games')

const gameControllers ={
    createGame : async (req,res) =>{
        let {date,team1,team2,goalTeam1,goalTeam2} = req.body
        try {
            let game = await new Game({date,team1,team2,goalTeam1,goalTeam2}).save()
            if(game){
                res.status(201).json({
                    message: "Game created",
                    success: true
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },
    allGames: async (req,res)=>{
        let query ={}
        try {
            let game = await Game.find({query})
            res.status(200).json({
                message: "All games found",
                success:true,
                response: game
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message,
                success:false
            })
        }
    },
    deleteGame : async (req,res)=>{
        let {id} = req.params
        try {
            let game = await Game.findOneAndDelete({_id: id})
            if(game){
                res.status(200).json({
                    message: "Game deleted",
                    success:true
                })
            }else{
                res.status(404).json({
                    message: "Not found game",
                    success:false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message,
                success:false
            })
        }
    }
}

module.exports = gameControllers