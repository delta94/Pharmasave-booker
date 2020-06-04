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
import {Booking, BookingTypes} from "./interfaces";
import globals from "./globals"
/* eslint-enable @typescript-eslint/semi */

type DocData = {[key: string]: {[key: string]: string} | undefined}
type UserData = {[key: string]: boolean} | undefined | (number | string)[]
type FirestoreCollectionRef
    = FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>

export default class NewBooker {

    private _adgendadb: FirestoreCollectionRef

    public constructor (
        private _database: FirebaseFirestore.Firestore,
        private _data: Booking,
        private _context: functions.https.CallableContext,
    ) {
        this._adgendadb = this._database // Database reference
            .collection("agenda")
    }

    /**
     * Add's 0s to the dates
     * @param {string} date - date to format
     * @param {string} seperator - char the date is seperatred by
     * @returns {string} - date with zeros
     */
    private static _addZeros = (
        date: string, seperator: string = "/"
    ): string => {
        let newDate = `${date.split(seperator)[0]}${seperator}`

        if (date.split(seperator)[1].length < 2) {
            newDate += `0${date.split(seperator)[1]}${seperator}`
        } else {
            newDate += `${date.split(seperator)[1]}${seperator}`
        }

        if (date.split(seperator)[2].length < 2) {
            newDate += `0${date.split(seperator)[2]}`
        } else {
            newDate += date.split(seperator)[2]
        }

        return newDate
    }

    /* eslint-disable max-lines-per-function */
    /**
     * Set a new booking
     * @returns {Promise<number | Array.<string | number>>} exit code or error message
     */
    public writeNewBooking = async (): Promise<number | (string | number)[]> => {
        const [year, month, day] = this._data.day.split("/"), // Year month and day to set to
            fullDay = day.length < 2 ? `0${day}` : day,
            fullMonth = month.length < 2
                ? `0${Number(month) + 1}`
                : (Number(month) + 1).toString(),
            dbRef = this._adgendadb
                .doc(year)
                .collection(fullMonth),
            {time, type} = this._data, // Time to set to
            [hours, minutes] = time.split(":"),
            date = new Date(Number(year), Number(fullMonth), Number(day))
        
        // Bunch of error checks
        if (!this._context.auth || !this._context.auth.uid) { // Check if auth even exists
            // return [1, "Not authenticated"]
        } if (!globals.hours[date.getDate()]) { // If the store is open
            return [3, "Booking is on a store closure"]
        } else if (Number(hours) < globals.hours[date.getDate()]![0]) {
            return [3.1, "Booking is too early"]
        } else if (
            Number(hours) > globals.hours[date.getDate()]![1] ||
            Number(hours) === globals.hours[date.getDate()]![1] &&
            Number(minutes) === 30
        ) {
            return [3.2, "Booking is too late"]
        } else if (!["pickup", "service", "inStore"].includes(type)) {
            return [4, `Invalid booking type ${type}`]
        }
        
        const readData = await this._readDayData(dbRef, fullDay) // Make read after validation (save money)
        
        // More error checks
        if (readData instanceof Error) { // Return 2 if error
            return [5, "Unknown error; Problem reading from database"]
        } else if (readData && readData[type] && readData[type]![time]) { // If booking already exists
            return [6, "Time slot already taken"]
        }

        // Set database refernece to uid
        return await this._setData(
            dbRef,
            fullDay,
            time,
            this._data.date,
            type,
            readData ? readData : {},
        )
    }
    /* eslint-enable max-lines-per-function */

    /**
     * Reads database for specific day
     * @param {FirestoreCollectionRef} dbRef - database reference of specific month
     * @param {string} fullDay - full day (with leading zero if applicable)
     * @returns {Promise<void | DocData | Error>} - void if first booking for day, DocData if bookings exist, and Error if read fails
     */
    private _readDayData = async (
        dbRef: FirestoreCollectionRef,
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
     * Sets the booking to the database, and to the user doc
     * @param {FirestoreCollectionRef} dbRef - database reference for the booking only
     * @param {string} doc - doc to set booking to
     * @param {string} time - time to set to
     * @param {string} date - date to set to
     * @param {BookingTypes} type - type of booking
     * @param {DocData} readData - data pulled from Firestore
     * @returns {Promise<number | Array.<stirng | number>>} - 0 for success, array with error code and string if error
     */
    private _setData = async (
        dbRef: FirestoreCollectionRef,
        doc: string,
        time: string,
        date: string,
        type: BookingTypes,
        readData: DocData,
    ): Promise<number | (string | number)[]> => {
        const _readData = readData

        if (_readData[type]) {
            _readData[type]![time] = this._context.auth!.uid
        } else {
            _readData[type] = {[time]: this._context.auth!.uid}
        }

        return await dbRef.doc(doc)
            .set(_readData, {merge: true})
            .then(async () => (
                await this._setUserData(date)
            ))
            .catch((err: Error) => [5, err.message])
    }

    /**
     * Writes to user doc to keep track of user bookings
     * @param {string} date - date of booking
     * @returns {Promise<number | Array.<stirng | number>>} - 0 for success, array with error code and string if error
     */
    private _setUserData = async (
        date: string
    ): Promise<number | (string | number)[]> => {
        const userData: UserData = await this._database.collection("users")
            .doc(this._context.auth!.uid) // Get user data
            .get()
            .then((doc) => doc.data()?.bookings as {[key: string]: boolean})
            .catch((err: Error) => [3, err.message])
        
        if (userData instanceof Array) { // If error, return it
            return userData
        }

        const bookings = userData ? userData : {} // User data
        
        bookings[NewBooker._addZeros(date)] = true

        return await this._database.collection("users")
            .doc(this._context.auth!.uid) // Set user data
            .set({
                bookings,
            }, {merge: true})
            .then(() => 0)
            .catch((err: Error) => [3, err.message])
    }

}
