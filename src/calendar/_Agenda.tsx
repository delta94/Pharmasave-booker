/**
 * Defines the agenda component
 */
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

/* eslint-disable @typescript-eslint/semi, max-lines */
import {
    firestore,
    functions
} from "../firebase";
import CustomDate from "../CustomDate";
import React from "react";
import globals from "./../globals";
/* eslint-enable @typescript-eslint/semi */

type ExistingBookings =
    {[key: string]: any}
type AgendaState = {
    [key: string]:
    string |
    number |
    Date |
    JSX.Element |
    Promise<void | ExistingBookings> | {},
}

/* eslint-disable no-magic-numbers */
const [minutesPerHour, halfWayPoint] = [60, 12],
    newEntry = functions.httpsCallable("newBooking")
/* eslint-enable no-magic-numbers */


export default class Agenda extends React.Component
    <{}, AgendaState> {

    private static _dbPull = async (
        year: string,
        month: string,
        day: string
    ): Promise<void | ExistingBookings> => {
        const pullData = await firestore.collection("agenda")
            .doc(year)
            .collection(month)
            .doc(day)
            .get()
            .then((doc) => doc as ExistingBookings)
            .catch((err: Error) => {
                console.log(err.message)
                alert(`Error fetching data from database: ${err.message}`)
            })

        return pullData
    }

    public constructor(props: {}) {
        super(props)

        this.state = {
            selected: "",
            dayOfWeek: 0,
            month: 0,
            date: new Date(),
            table: <div/>,
            data: {},
        }
    }

    /**
     * Initially pull from db
     * @returns {void} void
     */
    public componentDidMount = (): void => {
        const date = new Date(),
            year = date.getFullYear().toString(),
            month = date.getMonth(),
            day = date.getDay(),
            fullMonth = month.toString().length < 2
                ? `0${month + 1}`
                : (month + 1).toString(),
            fullDay = day.toString().length < 2
                ? `0${day}`
                : day.toString()
        
        this.setState(Agenda._dbPull(year, fullMonth, fullDay))
    }

    /**
     * Formats the minutes into a string (e.g 4500 to "45", or NaN to "00")
     * @param {number | undefined} minutes - minutes to format; undefined for "00"
     * @returns {string} formatted minutes
     */
    private _formatMinutes = (minutes: number | undefined): string => {

        if (minutes) {
            let newMinutes = minutes?.toString()

            if (newMinutes.length > 2) {
                newMinutes = newMinutes.substr(0, newMinutes.length - 1)

                return this._formatMinutes(Number(newMinutes))
            }

            return newMinutes
        }

        return "00"
    }

    /**
     * Converts numerical time with decimal in 24 hour time to stringed time out of 60 in 12 hour time with AM/PM
     * @param {number} time - numerical time
     * @returns {string} stringified 12 hour time
     */
    private _convertTime = (time: number): string => {
        /* eslint-disable prefer-destructuring */
        const stringTime = time.toString(),
            minutes = stringTime.split(".")[1]

        let output = "",
            indicators: string,
            hours = stringTime.split(".")[0]
        /* eslint-enable prefer-destructuring */
        
        if (
            (Number(hours) > halfWayPoint) ||
            (Number(hours) === halfWayPoint && minutes === "5")) { // If afternoon
            indicators = "Pm"
            hours = (Number(hours) - halfWayPoint).toString() // Convert to 12 hour time
            hours = (hours === "0" ? "12" : hours)
        } else if (Number(hours) === halfWayPoint && !minutes) { // If noon
            indicators = "Noon"
        } else { // If morning
            indicators = "Am"
        }
        
        output += `${hours}:` // Hours
        output += this._formatMinutes(
            Math.floor((Number(minutes) * minutesPerHour))
        )
        output += ` ${indicators}` // Am/Pm
        
        return output
    }

    /**
     * Calculates the increments for the agenda with the globals
     * @param {number | null} dayOfWeek - the day of week to calculate the business hours with. Null if not open
     * @returns {Array.<string>} array of incremenets
     */
    private _calcIncrements = (dayOfWeek: number | null): string[] => {
        const increment = globals.calendar.increment / minutesPerHour,
            increments: string[] = []
        
        if (dayOfWeek) {
            /* eslint-disable prefer-destructuring */
            for (
                let time = globals.hours[dayOfWeek]![0];
                time < globals.hours[dayOfWeek]![1];
                time += increment
            ) {
                increments.push(this._convertTime(time))
            }
            /* eslint-enable prefer-destructuring */
        } else {
            increments.push("Store is closed this day")
        }

        return increments
    }

    /**
     * Make a new entry to the db
     * @param {string} day - day to add entry to
     * @param {string} time - time to add entry to
     * @param {string} type - type of booking (service, pickup, or inStore)
     * @returns {Promise<number>} return 0 on success
     */
    private _makeNewEntry = async (day: string, time: string, type: string): Promise<number> => (
        await newEntry({
            day,
            time,
            type,
        }).then((res) => {
            if (res.data instanceof Array) {
                alert(`Error code ${res.data[0]}, ${res.data[1]}`)
            } else if (res.data === 0) {
                alert(`Success! Your booking is scheduled for ${CustomDate.addZeros(day)} at ${time}`)
            } else {
                alert(`Error, unknown cause`)
            }

            return 0
        })
    )

    /**
     * Creates a booking <td> element
     * @param {string} type = type of booking (service, pickup, or inStor)
     * @param {string} iter - time
     * @param {string} day - day to call function with
     * @returns {JSX.Element} <td> with props
     */
    private _bookingtd = (type: string, iter: string, day: string): JSX.Element => (
        <td
            className={`${type}-col agenda-col`}
            id={`${type}-${iter}`}
            onClick={async (): Promise<void> => {
                await this._makeNewEntry(
                    day,
                    CustomDate.to24Hour(iter),
                    `${type}`,
                )
            }}
        ></td>
    )

    /**
     * Pushes the tables values to tableVals
     * @param {Array.<string>} iterations - iterations of times
     * @param {Array.<JSX.Element>} tableVals - array to push to
     * @param {number} dayOfWeek - specific day of week
     * @param {string} day - specific day to call cloud function with
     * @returns {void} void
     */
    private _pushTableVals = (
        iterations: string[],
        tableVals: JSX.Element[],
        dayOfWeek: number,
        day: string
    ): void => {
        for (const iter of iterations) {
            tableVals.push(
                <tr key={`agenda-${dayOfWeek}-${iter}-row`}>
                    <th
                        scope = "row"
                        key = {`agenda-${dayOfWeek}-${iter}-head`}
                    >
                        {iter}
                    </th>
                    {this._bookingtd("pickup", iter, day)}
                    {this._bookingtd("service", iter, day)}
                    {this._bookingtd("inStore", iter, day)}
                </tr>
            )
        }
    }

    /**
     * Returns a table head for agenda
     * @returns {JSX.Element} thead element
     */
    private _thead = (): JSX.Element => (
        <thead>
            <tr key="agenda-head">
                <th className="agenda-header" key="agenda-time" scope="col">Time</th>
                <th className="agenda-header text-center" key="agenda-pickup" scope="col">Curbside Pickup</th>
                <th className="agenda-header text-center" key="agenda-services" scope="col">Services</th>
                <th className="agenda-header text-center" key="agenda-col" scope="col">In-store</th>
            </tr>
        </thead>
    )

    /**
     * Changes selected day of agenda
     * @param {string} day - day to change to
     * @returns {void} void
     */
    public changeDay = (day: string): void => {
        const dateData = day.split("/").map((data) => Number(data)),
            date = new Date(dateData[0], dateData[1], dateData[2]),
            dayOfWeek = date.getDay(),
            iterations = this._calcIncrements(dayOfWeek),
            tableVals: JSX.Element[] = []

        this.setState({
            selected: `${dateData[0]}/${Number(dateData[1]) + 1}/${dateData[2]}`,
            dayOfWeek,
            month: date.getMonth(),
            date,
        })

        this._pushTableVals(iterations, tableVals, dayOfWeek, day)

        this.setState({
            table: (
                <table className="table">
                    <this._thead/>
                    <tbody>
                        {tableVals.map((val) => val)}
                    </tbody>
                </table>
            )
        })

    }

    public render = (): JSX.Element => (
        <div id="agenda">
            <p className="text-center">
                {/* eslint-disable-next-line */}
                {`${CustomDate.getWordDay(this.state.dayOfWeek as number)} ${CustomDate.getWordMonth(this.state.month as number)} ${(this.state.date as Date).getDate()}, ${(this.state.date as Date).getFullYear()}`}
            </p>
            <hr className="clearfix w-100 d-md-none pb-3"/>
            {this.state?.table}
        </div>
    )

}
