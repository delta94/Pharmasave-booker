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
/* eslint-enable @typescript-eslint/semi */

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
export const newBooking = functions.https.onCall((data: Booking, context): string => {
    if (!context.auth) {
        return "not logged in"
    }
    return "success"
})
