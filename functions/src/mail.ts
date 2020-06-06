/**
 * Carriage Crossing Pharmacy Booker
 * Copyright (C) 2020 Luke Zhang, Ethan Lim
 * 
 * https://luke-zhang-04.github.io/
 * https://github.com/ethanlim04
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful
 * but WITHOUT ANY WARRANTY; without even the implied warranty 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public Licence
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
/* eslint-disable @typescript-eslint/semi */
import * as config from "./config.json";
import * as nodemailer from "nodemailer";
/* eslint-disable @typescript-eslint/semi */


const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        port: 25,
        auth: {
            user: "carriagecrossingpharmacy@gmail.com",
            pass: config.password
        },
        tls: {
            rejectUnauthorized: false
        }
    }),

    /**
     * Sends an email to the user
     * @param {string} userEmail - Email to send to
     * @param {Object.<string, any>} newBooking - NewBooking data
     * @returns {void} void
     */
    sendMail = (userEmail: string, newBooking: {[key: string]: any}): void => {
        const email = "<carriagecrossingpharmacy@gmail.com>",
            from = `Carriage Crossing Pharmacy" ${email}`,
            helperOptions = {
                from,
                to: userEmail,
                subject: "Booking confirmed",
                text: `Your ${(newBooking.type as string).toLowerCase()} has been confirmed for ${newBooking.day} ${newBooking.time}.\nTo cancel your booking, please visit our website`
            }

        transporter.sendMail(helperOptions, (error, info) => {
            if (error) {
                console.log(error)

                return
            }
            console.log(info)
        })
    }

export default sendMail
