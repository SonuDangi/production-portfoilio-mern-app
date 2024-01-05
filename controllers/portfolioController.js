
const nodemailer = require("nodemailer");
const sendGridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(

    sendGridTransport({
        auth:{
            api_key: process.env. API_SENDGRID
        },
    })
);

const sendEmailController  = (req,res) => {


    try {
        const {name,email,msg} = req.body
        if(!name || !email || !msg) {
            return res.status(500).send({
                success: false,
                message: "please provide all fields"
            })
        
        }
        transporter.sendMail({
            to:'sonveerthakur081@gmail.com',
            from:'sonveerthakur081@gmail.com',
            subject:'regarding mern portfolio app',
            html:`
               <h5>Details information</h5>
               <ul>
                 <li><p>Name : ${name}</p></li>
                 <li><p>Name : ${email}</p></li>
                 <li><p>Name : ${msg}</p></li>
               </ul>

            `
        })

        return res.status(200).send({success: true, message: "your messgae send successfully"})
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({success: false, message:"send email api error", error});
    }
} 

module.exports = {sendEmailController};