/**
 * Defines the calendar component
 */

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
import React from "react";
/* eslint-enable @typescript-eslint/semi */


export default class Calendar extends React.Component
    <{}, {[key: string]: string[] | string}> {

    public constructor (props: {}) {
        super(props)
        this.state = {
            days: this._days.long,
            current: `day-square-${new Date()
                .getDate()
                .toString()
            }`,
        }
    }

    private _days = {
        short: ["S", "M", "T", "W", "T", "F", "S"],
        med: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
        // eslint-disable-next-line
        long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    }

    /**
     * Window resize handler.
     * @returns {void} void
     */
    private _onWindowResize = (): void => {
        const modileWidth = 450,
            tabletWidth = 800

        if (window.innerWidth < modileWidth) {
            this.setState({days: this._days.short})
        } else if (window.innerWidth < tabletWidth) {
            this.setState({days: this._days.med})
        } else {
            this.setState({days: this._days.long})
        }
    }

    /**
     * Get the start and end date of the month.
     * @returns {Date[]} [start of month, end of month]
     */
    private _monthStartEnd = (): Date[] => {
        const date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth(),
            firstDay = new Date(year, month, 1),
            lastDay = new Date(year, month + 1, 0)

        return [firstDay, lastDay]
    }

    /**
     * Pushes a full week
     * @param {Array.<JSX.Element>} week - week to push to
     * @param {number} day - day to push to
     * @param {number} cur - current day
     * @returns {void} void
     */
    private _pushToGoodWeek = (week: JSX.Element[], day: number, cur: number): void => {
        week.push(
            <td
                className = {
                    /* eslint-disable-next-line */
                    `day-square ${this.state.current === `day-square-${day.toString()}` ? "selected" : ""}`
                }
                key = {`calendar-${day.toString()}`}
                id = {`day-square-${day.toString()}`}
                onClick = {(): void => {
                    this.setState({current: `day-square-${cur.toString()}`})
                }}
            ><div><span>{day}</span></div></td>
        )
    }

    /**
     * Pushes array of weeks to weeks
     * @param {Array.<Array.<JSX.Element>>} weeks array of weeks to push to (reference to)
     * @param {number} day initial day
     * @param {number} end end day
     * @param {number} offsetDay offset day counting calendary grids instead of days
     * @param {number} startDate starting day
     * @returns {void} void
     */
    private _pushWeeks (
        weeks: JSX.Element[][],
        day: number,
        end: number,
        offsetDay: number,
        startDate: number
    ): void {
        let _offsetDay = offsetDay,
            _day = day

        while (_day <= end) {
            const week: JSX.Element[] = []

            for (let _ = 0; _ < 7; _++) { // 7 days/week
                if (_day > end) { // Don't overshoot month
                    break
                } else if (_offsetDay - startDate < 1) { // Don't undershoot either
                    week.push(
                        <td key={`calendar-offsetday-${_offsetDay.toString()}`}/>
                    )
                    _offsetDay++
                } else { // Ah yes, goldilocks
                    const cur = _day

                    this._pushToGoodWeek(week, _day, cur)
                    _offsetDay++
                    _day++
                }
            }
            weeks.push(week)
        }
    }

    /**
     * Create the calendar
     * @returns {JSX.Element} => <tbody>Calendar</tbody>
     */
    public renderCalendar = (): JSX.Element => {
        const end = this._monthStartEnd()[1].getDate(),
            // Future: currentDate = new Date(),
            startDate = this._monthStartEnd()[0].getDay(),
            // Future: maxAheadTime = 7,
            weeks: JSX.Element[][] = [],
            day = 1,
            offsetDay = 1
        let key = 0
        
        this._pushWeeks(weeks, day, end, offsetDay, startDate)

        return (
            <tbody>
                {weeks.map((week) => {
                    key++

                    return React.createElement(
                        "tr",
                        {key: `row-${key}`},
                        week.map((dayOfWeek) => dayOfWeek),
                    )
                })}
            </tbody>
        )
    }

    /**
     * Attatch window resize handler.
     * @returns {void} void
     */
    public componentDidMount = (): void => {
        window.addEventListener("resize", this._onWindowResize)
    }

    public render = (): JSX.Element => (
        <table className="table table-bordered" id="calendar">
            <thead className="thead-light">
                <tr key="table-header">
                    <th className="calendar-header" scope="col">
                        {this.state.days[0]}
                    </th>
                    <th className="calendar-header" scope="col">
                        {this.state.days[1]}
                    </th>
                    <th className="calendar-header" scope="col">
                        {this.state.days[2]}
                    </th>
                    <th className="calendar-header" scope="col">
                        {this.state.days[3]}
                    </th>
                    <th className="calendar-header" scope="col">
                        {this.state.days[4]}
                    </th>
                    <th className="calendar-header" scope="col">
                        {this.state.days[5]}
                    </th>
                    <th className="calendar-header" scope="col">
                        {this.state.days[6]}
                    </th>
                </tr>
            </thead>
            <this.renderCalendar/>
        </table>
    )
    
}
