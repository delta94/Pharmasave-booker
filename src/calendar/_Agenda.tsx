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
    JSX.Element |
    Promise<void | AgendaUtils.ExistingBookings> | {},
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
            data: {},
        }
    }

    /**
     * Initially pull from db
     * @returns {void} void
     */
    public componentDidMount = (): void => {
        const date = new Date(),
            {year, month, day} = AgendaUtils.getDateValues(date)
        
        this.setState(AgendaUtils.dbPull(year, month, day))
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
                    {["pickup", "service", "instore"].map((type) => (
                        <AgendaUtils.bookingtd
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
            date = new Date(dateData[0], dateData[1], dateData[2]),
            dayOfWeek = date.getDay(),
            iterations = AgendaUtils.calcIncrements(dayOfWeek),
            tableVals: JSX.Element[] = [],
            {year, month, day} = AgendaUtils.getDateValues(date)

        this.setState({
            selected: `${dateData[0]}/${Number(dateData[1]) + 1}/${dateData[2]}`,
            dayOfWeek,
            month: date.getMonth(),
            date,
            data: {},
        })

        this._pushTableVals(iterations, tableVals, dayOfWeek, day)

        this.setState({
            table: (
                <table className="table">
                    <AgendaUtils.thead/>
                    <tbody>{tableVals.map((val) => val)}</tbody>
                </table>
            ),
            data: AgendaUtils.dbPull(year, month, day),
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
