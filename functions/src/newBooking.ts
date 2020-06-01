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
import * as functions from "firebase-functions";
import {Booking} from "./interfaces";
import verifyContext from "./verification";
/* eslint-enable @typescript-eslint/semi */

/**
 * Set a new booking
 * @param {FirebaseFirestore.Firestore} database - database to write to
 * @param {Booking} data - booking data
 * @param {functions.https.CallableContext} context - auth context
 */
const writeNewBooking = async (
    database: FirebaseFirestore.Firestore,
    data: Booking,
    context: functions.https.CallableContext,
): Promise<number | Error> => {
    if (await !verifyContext(context)) {
        return 1
    }

    const [year, month, day] = data.day.split("/"), // Year month and day to set to
        fullDay = day.length < 2 ? `0${day}` : day,
        dbRef = database // Database reference
            .collection("agenda")
            .doc(year)
            .collection(month)
            .doc(fullDay),
        {time} = data // Time to set to
    
    // Set database refernece to uid
    return await dbRef.set({[time]: context.auth?.uid})
        .then(() => 0)
        .catch((error: Error) => {
            console.log(error, error.message)
            
            return Error(error.message)
        })
}

export default writeNewBooking
