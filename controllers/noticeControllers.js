const Notice = require('../models/notice')

const noticeControllers = {
    createNotice: async(req,res) =>{
        let {title, notice, date,images} = req.body
        try {
            let newNotice = await new Notice({title, notice, date,images}).save()
            if(newNotice){
                res.status(201).json({
                    message: 'notice created',
                    success: true
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message,
                success:false
            })
        }
    },
    getAllNotice: async(req,res) =>{
        let query={}
        try {
            let notices = await Notice.find({query})
            if(notices){
                res.status(200).json({
                    message: 'found all notices',
                    success:true,
                    response: notices
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


module.exports = noticeControllers 