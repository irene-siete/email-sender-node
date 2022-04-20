const {Router}=require("express")
const router= Router()
const { google }=require("googleapis")
const nodemailer=require("nodemailer")
const password=process.env.PASSWORD

router.post('/send-email', (req, res) => {
    const {username, email, message} = req.body
    //???????????? que
    contentHTML = `
    
                <h1>ole</h1>
                <ul>
                    <li>no : ${username}</li>
                    <li>ola: ${email}</li>
                </ul>
                <p>${message}</p>
            `

    const CLIENT_ID=process.env.CLIENT_ID
    const CLIENT_SECRET=process.env.CLIENT_SECRET
    const REDIRECT_URI=process.env.REDIRECT_URI
    const REFRESH_TOKEN=process.env.REFRESH_TOKEN
    const MY_EMAIL=process.env.MY_EMAIL
    const NAME=process.env.NAME

    const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)

    oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

    async function sendMail(){

        try{
            const accessToken= await oAuth2Client.getAccessToken()
            const transport = nodemailer.createTransport({
                service:"gmail",
                auth:{
                    type:"OAuth2",
                    user:MY_EMAIL,
                    clientId:CLIENT_ID,
                    clientSecret:CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken:accessToken
                },

            })
            const mailOptions={
                from:`${NAME}, <${MY_EMAIL}>`,
                to:req.body.email,
                subject: "my email sender",
                html: contentHTML
            }
            const result=await transport.sendMail(mailOptions)
            return result
        }catch(err){
            console.log(err)
        }
    }
    sendMail().then(result=>res.status(200).send('email sent'))
        .catch(error=>console.log(error.message))
})
module.exports=router