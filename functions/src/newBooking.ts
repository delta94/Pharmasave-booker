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
/* eslint-disable @typescript-eslint/semi, no-magic-numbers */
import * as functions from "firebase-functions";
import {Booking} from "./interfaces";
import globals from "./globals"
/* eslint-enable @typescript-eslint/semi */

type DocData = {[key: string]: string | undefined | null}

/**
 * Reads database for specific day
 * @param {FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>} dbRef - database reference of specific month
 * @param {string} fullDay - full day (with leading zero if applicable)
 */
const readDayData = async (
    dbRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
    fullDay: string,
): Promise<void | DocData | Error> => {
    return await dbRef.get() // Read from database
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
}

/**
 * Set a new booking
 * @param {FirebaseFirestore.Firestore} database - database to write to
 * @param {Booking} data - booking data
 * @param {functions.https.CallableContext} context - auth context
 * @returns {Promise<number, Error>} exit code or error message
 */
const writeNewBooking = async (
    database: FirebaseFirestore.Firestore,
    data: Booking,
    context: functions.https.CallableContext,
): Promise<number | Error> => {
    const [year, month, day] = data.day.split("/"), // Year month and day to set to
        fullDay = day.length < 2 ? `0${day}` : day,
        dbRef = database // Database reference
            .collection("agenda")
            .doc(year)
            .collection(month),
        {time} = data, // Time to set to
        readData = await readDayData(dbRef, fullDay)
    
    if (!context.auth || !context.auth.uid) { // Check if auth even exists
        return 1
    } else if (readData instanceof Error) {
        return 2
    } else if (readData && readData[time]) { // If booking already exists
        return 3
    }
    
    // Set database refernece to uid
    return await dbRef.doc(fullDay).set({[time]: context.auth?.uid})
        .then(() => 0)
        .catch((err: Error) => {
            console.log(err, err.message)
            
            return Error(err.message)
        })
}

export default writeNewBooking
