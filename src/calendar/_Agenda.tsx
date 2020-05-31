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

/* eslint-disable @typescript-eslint/semi */
import CustomDate from "../CustomDate";
import React from "react";
import globals from "../globals";
/* eslint-enable @typescript-eslint/semi */

/* eslint-disable no-magic-numbers */
const [minutesPerHour, halfWayPoint] = [60, 12]
/* eslint-enable no-magic-numbers */


export default class Agenda extends React.Component
    <{}, {[key: string]: string | number | Date | JSX.Element}> {

    public constructor (props: {}) {
        super(props)
        this.state = {
            selected: "",
            dayOfWeek: 0,
            month: 0,
            date: new Date(),
            table: <div/>
        }
    }

    /**
     * Formats selected day
     * @returns {string} selected day
     */
    private _selectedDay = (): string => {
        const days = (this.state?.selected as string).split("/")

        if (days.length > 0) {
            if (days[1] && days[1].length < 2) {
                days[1] = `0${days[1]}`
            }
            if (days[2] && days[2].length < 2) {
                days[2] = `0${days[2]}`
            }

            return days.join("/")
        }

        return ""
    }

    /**
     * Converts numerical time with decimal in 24 hour time to stringed time out of 60 in 12 hour time with AM/PM
     * @param {number} time - numerical time
     * @returns {string} stringified 12 hour time
     */
    private _convertTime = (time: number): string => {
        const stringTime = time.toString(),
            [hours, minutes] = stringTime.split("."),
            displayMins = Math.floor((Number(minutes) * minutesPerHour))

        let output = "",
            indicators: string
        
        if (
            (Number(hours) > halfWayPoint) ||
            (Number(hours) === halfWayPoint && minutes === "5")) {
            indicators = "Pm"
        } else if (Number(hours) === halfWayPoint && !minutes) {
            indicators = "Noon"
        } else {
            indicators = "Am"
        }
        
        output += `${hours}:` // Hours
        output += displayMins // Minutes
            ? displayMins.toString().substr(0, displayMins.toString().length - 1)
            : "00"
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

        for (const iter of iterations) {
            tableVals.push(
                <tr>
                    <th scope="row" key={`agenda-${dayOfWeek}-${iter}`}>{iter}</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            )
        }

        const table =
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Time</th>
                        <th scope="col">Curbside Pickup</th>
                        <th scope="col">Services</th>
                        <th scope="col">In-store</th>
                    </tr>
                </thead>
                <tbody>
                    {tableVals.map((val) => val)}
                </tbody>
            </table>

        this.setState({table})

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
