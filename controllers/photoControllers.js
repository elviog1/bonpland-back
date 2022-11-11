const Photo = require("../models/photo")

const photoControllers = {
    createPhoto: async (req,res) =>{
        let{img,description} = req.body
        try{
            let photo = await new Photo({img,description}).save()
            if(photo){
                res.status(201).json({
                    message: "Photo created",
                    success: true
                })
            }
        }catch(error){
            console.log(error)
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },
    getAllPhoto: async(req,res) =>{
        let query= {}

        try{
            let photo = await Photo.find({query})
            if(photo){
                res.status(200).json({
                    message: "All photos find",
                    response: photo,
                    success: true
                })
            }
        }catch(error){
            console.log(error)
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },
}

module.exports = photoControllers