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
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {Booking} from "./interfaces";
import NewBooker from "./newBooking"
/* eslint-enable @typescript-eslint/semi */

// Test run newBooking({"day": "2020/5/6", "time": "12:00", "type": "pickup"})
  
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://carriage-crossing-pharmacy.firebaseio.com",
})

const database = admin.firestore()

/**
 * Set a new booking
 * @param {Booking} data - booking data
 * @param {functions.https.CallableContext} context - auth context
 */
export const newBooking = functions.https.onCall(async (
    data: Booking,
    context,
): Promise<number | (number | string)[]> => {
    const newBook = new NewBooker(database, data, context)

    return await newBook.writeNewBooking()
})
