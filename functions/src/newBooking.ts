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
/* eslint-disable @typescript-eslint/semi, no-magic-numbers, one-var */
import * as functions from "firebase-functions";
import {Booking} from "./interfaces";
import globals from "./globals"
/* eslint-enable @typescript-eslint/semi */

type DocData = {[key: string]: string | undefined | null}

/**
 * Reads database for specific day
 * @param {FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>} dbRef - database reference of specific month
 * @param {string} fullDay - full day (with leading zero if applicable)
 * @returns {Promise<void | DocData | Error>} - void if first booking for day, DocData if bookings exist, and Error if read fails
 */
const readDayData = async (
    dbRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
    fullDay: string,
): Promise<void | DocData | Error> => (
    await dbRef.get() // Read from database
        .then((snapshot): DocData | void => {
            let _readData

            snapshot.forEach((doc) => { // Read selected day
                if (doc.id === fullDay) {
                    _readData = doc.data()
                }
            })

            return _readData
        })
        .catch((err: Error) => err)
)

/**
 * Set a new booking
 * @param {FirebaseFirestore.Firestore} database - database to write to
 * @param {Booking} data - booking data
 * @param {functions.https.CallableContext} context - auth context
 * @returns {Promise<number | (Error | number)[]>} exit code or error message
 */
const writeNewBooking = async (
    database: FirebaseFirestore.Firestore,
    data: Booking,
    context: functions.https.CallableContext,
): Promise<number | (string | number)[]> => {
    const [year, month, day] = data.day.split("/"), // Year month and day to set to
        fullDay = day.length < 2 ? `0${day}` : day,
        fullMonth = month.length < 2
            ? `0${Number(month) + 1}`
            : (Number(month) + 1).toString(),
        dbRef = database // Database reference
            .collection("agenda")
            .doc(year)
            .collection(fullMonth),
        {time} = data, // Time to set to
        [hours, minutes] = time.split(":"),
        date = new Date(Number(year), Number(fullMonth), Number(day))
    
    // Bunch of error checks
    if (!context.auth || !context.auth.uid) { // Check if auth even exists
        return [1,"Not authenticated"]
    } else if (!globals.hours[date.getDate()]) { // If the store is open
        return [3, "Booking is on a store closure"]
    } else if (Number(hours) < globals.hours[date.getDate()]![0]) {
        return [3.1, "Booking is too early"]
    } else if (
        Number(hours) > globals.hours[date.getDate()]![1] ||
        Number(hours) === globals.hours[date.getDate()]![1] &&
        Number(minutes) === 30
    ) {
        return [3.2, "Booking is too late"]
    }
    
    const readData = await readDayData(dbRef, fullDay) // Make read after validation (save money)
    
    // More error checks
    if (readData instanceof Error) { // Return 2 if error
        return [4, "Unknown error; Problem reading from database"]
    } else if (readData && readData[time]) { // If booking already exists
        return [5, "Time slot already taken"]
    }

    // Set database refernece to uid
    return await dbRef.doc(fullDay).set({[time]: context.auth?.uid})
        .then(() => 0)
        .catch((err: Error) => [4, err.message])
}

export default writeNewBooking
