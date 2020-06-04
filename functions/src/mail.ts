var fs  = require('fs')
//var path = require('path')
var config = JSON.parse(fs.readFileSync("./config.json"))
//var nodemailer = require('nodemailer')
import * as nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'carriagecrossingpharmacy@gmail.com',
        pass: config.password
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendMail = ((userEmail: string, newBooking: {[key: string]: any}) => {
    const HelperOptions = {
        from: '"Carriage Crossing Pharmacy" <carriagecrossingpharmacy@gmail.com>',
        to: userEmail,
        subject: "Booking confirmed",
        text: `Your ${newBooking.type.toLowerCase()} has been confirmed for ${newBooking.day} ${newBooking.time}.\nTo cancel your booking, please visit our website`
    }

    transporter.sendMail(HelperOptions, (error, info) => {
        if(error){
            return console.log(error)
        }
        console.log(info)
    })
})


export default sendMail
