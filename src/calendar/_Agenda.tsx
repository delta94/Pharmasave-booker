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
import * as AgendaUtils from "./_AgendaUtils";
import CustomDate from "../CustomDate";
import React from "react";
/* eslint-enable @typescript-eslint/semi */

type AgendaState = {
    [key: string]:
    string |
    number |
    Date |
    JSX.Element,
}

type Cache = AgendaUtils.ExistingBookings

type StringedObj = {[key: string]: string}

interface BookingTdProps {
    [index: string]: string,
    type: string,
    day: string,
    time: string,
    key: string,
}


export default class Agenda extends React.Component
    <{}, AgendaState> {

    public constructor (props: {}) {
        super(props)

        this.state = {
            selected: "",
            dayOfWeek: 0,
            month: 0,
            date: new Date(),
            table: <div/>,
        }
    }

    /**
     * Initially pull from db
     * @returns {void} void
     */
    public componentDidMount = (): void => {
        const dateObj = new Date(),
            {year, month} = AgendaUtils.getDateValues(dateObj),
            newData = {[year]: {[month]: {}}} as AgendaUtils.ExistingBookings
        
        this._cache = {[year]: {[month]: {}}}
         
        console.log("Componentdidmount cache")
        this._cache = {data: newData}
        console.log(this._cache)
    }

    private _cache: Cache = {}

    /**
     * Creates a booking <td> element
     * @param {BookingTdProps} props - time, day, and type of booking
     * @returns {JSX.Element} <td> with props
     */
    private _bookingtd = (props: BookingTdProps): JSX.Element => {
        const dayString = CustomDate.addZeros(props.day),
            time = CustomDate.to24Hour(props.time),
            [year, month, day] = dayString.split("/"),
            offsetMonth = AgendaUtils.offsetZero((Number(month)).toString())
            
        let bookingData = this._cache.data[year][offsetMonth][day],
            colour = "green"
        
        if (bookingData && (bookingData as StringedObj)[props.type]) {
            const curBookingData =
                (bookingData as {[key: string]: StringedObj})[props.type]

            if (curBookingData[time]) {
                colour = "red"
            }
        }

        return (
            <td
                className={`${props.type}-col agenda-col td-${colour}`}
                id={`${props.type}-${props.iter}`}
                onClick={async (): Promise<void> => {
                    await AgendaUtils.makeNewEntry(
                        props.day,
                        CustomDate.to24Hour(props.time),
                        `${props.type}`,
                    )
                }}
            ></td>
        )
    }

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
                    {["pickup", "service", "inStore"].map((type) => (
                        <this._bookingtd
                            type={type}
                            time={iter}
                            day={day}
                            key={`agendautils-bookingtd-${type}`}
                        />
                    ))}
                </tr>
            )
        }
    }

    /**
     * Changes selected day of agenda
     * @param {string} dayString - day to change to
     * @returns {void} void
     */
    public changeDay = (dayString: string): void => {
        const dateData = dayString.split("/").map((data) => Number(data)),
            _date = new Date(dateData[0], dateData[1], dateData[2]),
            dayOfWeek = _date.getDay(),
            iterations = AgendaUtils.calcIncrements(dayOfWeek),
            tableVals: JSX.Element[] = [],
            {year, month, date} = AgendaUtils.getDateValues(_date)
 
        this.setState({
            selected: `${dateData[0]}/${Number(dateData[1]) + 1}/${dateData[2]}`,
            dayOfWeek,
            month: _date.getMonth(),
            date: _date,
        })

        const newData = (this._cache as AgendaUtils.ExistingBookings).data
        
        console.log("Checking cache")
        if (newData && !newData[year][month][date]) {
            console.log("Data not in cache, pulling")
            AgendaUtils.dbPull(year, month, date).then((res) => {
                console.log("Pulled")
                if (res) {
                    newData[year][month][date] = {
                        [Object.keys(res)[0]]: res[Object.keys(res)[0]],
                        [Object.keys(res)[1]]: res[Object.keys(res)[1]],
                        [Object.keys(res)[2]]: res[Object.keys(res)[2]],
                    }
                    this._cache = {data: newData}
                    console.log(this._cache)
                }
                this._pushTableVals(iterations, tableVals, dayOfWeek, dayString)
                this.setState({
                    table: (
                        <table className="table">
                            <AgendaUtils.thead/>
                            <tbody>{tableVals.map((val) => val)}</tbody>
                        </table>
                    ),
                })
            })
        } else {
            console.log("Data found in cache", this._cache)
            this._pushTableVals(iterations, tableVals, dayOfWeek, dayString)
            this.setState({
                table: (
                    <table className="table">
                        <AgendaUtils.thead/>
                        <tbody>{tableVals.map((val) => val)}</tbody>
                    </table>
                ),
            })
        }
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
