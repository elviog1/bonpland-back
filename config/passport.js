const passport = require("passport")
const passportJWT = require("passport-jwt")

const {JWT_PASS} = process.env
const User = require("../models/user")

passport.use(
    new passportJWT.Strategy({
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_PASS
    },
    async (jwt_payload,done) =>{
        try{
            let user = await User.findOne({_id:jwt_payload.id})
            if(user){
                user = {
                    userID: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    photo: user.photo
                }
                return done(null,user)
            }else{
                return done(null,false)
            }
        }catch(error){
            console.log(error)
            return done(error,false)
        }
    }
    )

)
module.exports = passport