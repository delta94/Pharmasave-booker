var fs  = require('fs')
//var path = require('path')
var config = JSON.parse(fs.readFileSync("./config.json"))
//var nodemailer = require('nodemailer')
import * as nodemailer from "nodemailer"

//let userEmail = 'zhanl5542@wrdsb.ca'
//let userEmail = 'aa9037764@gmail.com'
/*
var newBooking = {
    "day": '2020/06/1',
    "time": "12:00",
    "type": "Pickup"
}
*/
let transporter = nodemailer.createTransport({
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
/*
let HelperOptions = {
    from: '"Carriage Crossing Pharmacy" <carriagecrossingpharmacy@gmail.com>',
    to: userEmail,
    subject: "Booking confirmed",
    text: `Your ${newBooking.type.toLowerCase()} has been confirmed for ${newBooking.day} ${newBooking.time}.\nTo cancel your booking, please visit our website`
}

let send = transporter.sendMail(HelperOptions, (error, info) => {
    if(error){
        return console.log(error)
    }
    console.log(info)
})
*/
let sendMail = ((userEmail: string, newBooking: {[key: string]: any}) => {
    let HelperOptions = {
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