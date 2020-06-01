/**
 * Carriage Crossing Pharmacy Booker
 * Copyright (C) 2020 Luke Zhang, Ethan Lim
 * 
 * https://luke-zhang-04.github.io/
 * https://github.com/ethanlim04
 * This program is free software: you can redistribute it and/or modif
 * it under the terms of the GNU General Public License as published b
 * the Free Software Foundation, either version 3 of the License, o
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be usefu
 * but WITHOUT ANY WARRANTY; without even the implied warranty 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See t
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public Licen
 * 
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
/* eslint-disable @typescript-eslint/semi */
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
/* eslint-enable @typescript-eslint/semi */

// Test run newBooking({"day": "2020/06/1", "time": "12:00"}, {})
  
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://carriage-crossing-pharmacy.firebaseio.com",
})

const database = admin.firestore()

interface Booking {
    [index: string]: any,
    type: "pickup" | "service" | "in-store",
    day: string,
    time: string,
}

/**
 * Set a new booking
 * @param {Booking} data - booking data
 * @param {functions.https.CallableContext} context - auth context
 */
export const newBooking = functions.https.onCall(async (
    data: Booking,
    context,
): Promise<number | Error> => {
    if (!context.auth) {
        return Error("Unauthenticated error. Please make sure you're logged in.")
    }

    const [year, month, day] = data.day.split("/"), // Year month and day to set to
        fullDay = day.length < 2 ? `0${day}` : day,
        dbRef = database // Database reference
            .collection("agenda")
            .doc(year)
            .collection(month)
            .doc(fullDay),
        {time} = data // Time to set to
    
    return await dbRef.set({[time]: context.auth.uid})
        .then(() => 0)
        .catch((error: Error) => {
            console.log(error, error.message)
            
            return Error(error.message)
        })
})
