const nodemailer = require("nodemailer")
const {google} = require("googleapis")
const { response } = require("../app")
const OAuth2 = google.auth.OAuth2

const sendMail= async (mail,code) =>{
    const client = new OAuth2(
        process.env.GOOGLE_ID,
        process.env.GOOGLE_SECRET,
        process.env.GOOGLE_URL
    )
    client.setCredentials({
        refresh_token:process.env.GOOGLE_REFRESH
    })
    const accessToken = client.getAccessToken()
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.GOOGLE_USER,
            type: "OAuth2",
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            refreshToken: process.env.GOOGLE_REFRESH,
            accessToken:accessToken
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    const mailOption = {
        from: process.env.GOOGLE_USER,
        to: mail,
        subject: "Verify your account",
        html: `
        <div style="background-color:black;
                    min-height:400px">
        <h1 style="color: white; 
        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        width: 100%;">
     Thank you for create an account in MyTinerary</h1>
  <p style="color: white; 
       font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
       width: 100%;
       margin-bottom: 40px;">
     You are only one step away from having your account </p>
  <a style="text-decoration:none; 
            color: white; 
            font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; 
            background-color: rgb(255, 81, 0);
            border-radius: 7px;
            padding: 20px;
            font-size: 18px;
            width: 100%;
            margin-top: 40px;" 
         href='https://my-tinerary-dreamjuan-back.herokuapp.com/auth/verify/${code}'>
     Click here to verify your account</a>
        </div>`
    }
    await transport.sendMail(mailOption,(error,response)=>{
        if(error){
            console.log(error)
        }else{
            console.log(response)
        }
    })
}

module.exports = sendMail