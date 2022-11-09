const User = require("../models/user")
const crypto = require("crypto")
const bcryptjs = require("bcryptjs")

const userController  = {
    userSignUp: async (req,res)=>{
        try{
            let {name,lastName,email,password,from,photo}=req.body
            let user = await User.findOne({email})
            if(!user){ // no existe el user? crealo
                let logged = false;
                let verified = false;
                let code = crypto.randomBytes(15).toString("hex")
                let role = "user"
                if(from === "form"){ // se crea por formulario
                    password = bcryptjs.hashSync(password,10)
                    user = await new User({name,role,photo,lastName,email,password:[password],from:[from],logged,verified,code}).save()
                    // sendmail(mail,code)
                    res.status(200).json({
                        message:"usuario creado por form",
                        success: true
                    })
                }else{
                    password = bcryptjs.hashSync(password,10)
                    verified = true
                    user = await new User({name,role,photo,lastName,email,password:[password],from:[from],logged,verified,code}).save()
                    res.status(200).json({
                        message:"usuario creado con " + from,
                        success: true
                    })
                }
            }else{
                if(user.from.includes(from)){
                    res.status(200).json({
                        message: "usuario ya existe",
                        success: false
                    })
                }else{
                    user.from.push(from)
                    user.verified = true
                    user.password.push(bcryptjs.hashSync(password,10))
                    await user.save()
                    res.status(200).sjon({
                        message: "usuario creado con " + from,
                        success: true
                    })
                }
            }
        }catch(error){
            console.log(error)
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },
    userSignIn: async(req,res) =>{
        const {email,password,from} = req.body
        try{
            const user = await User.findOne({email})
            if(!user){
                res.status(404).json({
                    message: "no existe el usuario, registrese",
                    success: false
                })
            }else if(user.verified){
                const checkPass = user.password.filter(passwordElement => bcryptjs.compareSync(password,passwordElement))
                if(from === "form"){
                    if(checkPass.length >0){
                        const loginUser ={
                            id: user._id,
                            name: user.name,
                            lastName: user.lastName,
                            email: user.email,
                            role: user.role,
                            photo: user.photo,
                        }
                        user.logged = true
                        await user.save()
                        // const token
                        res.status(200).json({
                            success: true,
                            response: {user: loginUser},
                            message: "Bienvenido " + user.name
                        })
                    }else{
                        res.status(400).json({
                            success:false,
                            message: "usuario o contraseña invalida"
                        })
                    }
                }else{ // por red social
                    if(checkPass.length>0){
                        const loginUser ={
                            id: user._id,
                            name: user.name,
                            lastName: user.lastName,
                            email: user.email,
                            role: user.role,
                            photo: user.photo,
                        }
                        user.logged =true
                        await user.save()
                        // token
                        res.status(200).json({
                            success: true,
                            response:{user:loginUser},
                            message: "Bienvenido " +user.name
                        })
                    }else{// contraseña invalida
                        res.status(400).json({
                            success:false,
                            message: "Credencial invalida"
                        })
                    }
                }
            }else{ // usuario existe pero no esta verificado
                res.status(401).json({
                    success: false,
                    message: "Verifique su cuenta por favor"
                })
            }
        }catch(error){
            console.log(error)
            res.status(400).json({
                success:false,
                message: error.message
            })
        }
    },
    userSignOut: async(req,res)=>{
        const {id}=req.params
        try{
            const user = await User.findOne({_id:id})
            if(user.logged){
                user.logged = false
                await user.save()
                res.status(200).json({
                    success:true,
                    message: "Usuario desconectado"
                })
            }
        }catch(error){
            console.log(error)
            res.status(400).json({
                success:false,
                message: error.message
            })
        }
    },
    getOneUser: async(req,res)=>{
        const{id}=req.params
        try{
            let user = await User.findOne({_id:id})
            if(user){
                res.status(200).json({
                    success:true,
                    message:"Usuario encontrado",
                    response: user
                })
            }else{
                res.status(400).json({
                    success:false,
                    message: "No se encontro al usuario"
                })
            }
        }catch(error){
            console.log(error)
            res.status(400).json({
                success:false,
                message: error.message
            })
        }
    },
    getAll: async(req,res)=>{
        let users
        let query = {}
        try{
            users = await User.find(query)
            res.status(200).json({
                message: "todos los usuarios encontrados",
                resonse: users,
                success: true
            })
        }catch(error){
            console.log(error)
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    }
}
module.exports = userController