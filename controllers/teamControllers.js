const Team = require("../models/team")

const teamControllers ={
    createTeam: async (req,res) =>{
        let {name,country,city,photo,fundation,dt} = req.body
        try{
            await new Team({name,country,city,photo,fundation,dt}).save()
            res.status(201).json({
                message: "Team created",
                success: true
            })
        }catch(error){
            console.log(error)
            res.status(400).json({
                message: "Team no created",
                success: false
            })
        }
    },
    getAllTeam: async(req,res) =>{
        let query= {}
        try{
            let team = await Team.find({query})
            res.status(200).json({
                message: "All teams",
                response: team,
                success: true
            })
        }catch(error){
            console.log(error)
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },
}

module.exports = teamControllers