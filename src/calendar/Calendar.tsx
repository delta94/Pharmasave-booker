/**
 * Defines the calendar component
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
import Agenda from "./_Agenda";
import CustomDate from "../CustomDate";
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
            selected: new CustomDate().formatDate(),
            keys: this._keys.long,
        }
    }

    /**
     * Attatch window resize handler.
     * @returns {void} void
     */
    public componentDidMount = (): void => {
        window.addEventListener("resize", this._onWindowResize)
        // eslint-disable-next-line
        this._agendaRef.current?.changeDay(this.state?.selected as string)
        this._onWindowResize()
    }

    private _days = {
        short: ["S", "M", "T", "W", "T", "F", "S"],
        med: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
        // eslint-disable-next-line
        long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    }

    private _keys = {
        short: ["Su", "M", "Tu", "W", "Th", "F", "Sa"], // Unique keys
        med: this._days.med,
        long: this._days.long,
    }

    private _agendaRef = React.createRef<Agenda>()

    /**
     * Window resize handler.
     * @returns {void} void
     */
    private _onWindowResize = (): void => {
        const modileWidth = 450,
            tabletWidth = 800

        if (window.innerWidth < modileWidth) {
            this.setState({
                days: this._days.short,
                keys: this._keys.short,
            })
        } else if (window.innerWidth < tabletWidth) {
            this.setState({
                days: this._days.med,
                keys: this._keys.med,
            })
        } else {
            this.setState({
                days: this._days.long,
                keys: this._keys.long,
            })
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
     * Procedure to complete on square click
     * @param {number} cur - current day
     * @param {string} curDay - formatted year and month
     * @returns {void} void
     */
    private _onSquareClick = (cur: number, curDay: string): void => {
        this.setState({
            current: `day-square-${cur.toString()}`,
            selected: `${curDay}/${cur.toString()}`
        })
        // eslint-disable-next-line
        this._agendaRef.current?.changeDay(`${curDay}/${cur.toString()}`)
    }

    /**
     * Pushes a full week
     * @param {Array.<JSX.Element>} week - week to push to
     * @param {number} day - day to push to
     * @param {number} cur - current day
     * @returns {void} void
     */
    private _pushToGoodWeek = (
        week: JSX.Element[],
        day: number,
        cur: number,
    ): void => {
        
        /* eslint-disable newline-per-chained-call, max-len */
        const curDay =
            `${(new Date().getFullYear()).toString()}/${(new Date().getMonth()).toString()}`
        /* eslint-enable newline-per-chained-call, max-len */

        week.push(
            <td
                className = {
                    /* eslint-disable-next-line */
                    `day-square ${this.state.current === `day-square-${day.toString()}` ? "selected" : ""}`
                }
                key = {`calendar-${day.toString()}`}
                id = {`day-square-${day.toString()}`}
                onClick = {(): void => this._onSquareClick(cur, curDay)}
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
    private _renderCalendar = (): JSX.Element => {
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
     * Renders table heads
     * @returns {Array.<JSX.Element>} table heads
     */
    private _renderTableHead = (): JSX.Element[] => [
        /* eslint-disable max-len */
        // Can't use a loop here because it messes up key every time this.state mutates
        <th className="calendar-header" scope="col" key={`th-${this.state.keys[0]}`}>
            {this.state.days[0]}
        </th>,
        <th className="calendar-header" scope="col" key={`th-${this.state.keys[1]}`}>
            {this.state.days[1]}
        </th>,
        <th className="calendar-header" scope="col" key={`th-${this.state.keys[2]}`}>
            {this.state.days[2]}
        </th>,
        <th className="calendar-header" scope="col" key={`th-${this.state.keys[3]}`}>
            {this.state.days[3]}
        </th>,
        <th className="calendar-header" scope="col" key={`th-${this.state.keys[4]}`}>
            {this.state.days[4]}
        </th>,
        <th className="calendar-header" scope="col" key={`th-${this.state.keys[5]}`}>
            {this.state.days[5]}
        </th>,
        <th className="calendar-header" scope="col" key={`th-${this.state.keys[6]}`}>
            {this.state.days[6]}
        </th>,
    ]
    /* eslint-enable max-len */

    private _cal = (): JSX.Element => (
        <div>
            <table className="table table-bordered" id="calendar">
                <thead className="thead-light">
                    <tr key="table-header">
                        {this._renderTableHead().map((row) => row)}
                    </tr>
                </thead>
                <this._renderCalendar/>
            </table>
            <Agenda ref={this._agendaRef}/>
        </div>
    )

    public render = (): JSX.Element => {
        if (this.state) {
            return <this._cal/>
        }
        
        return <div>Loading...</div>
    }
    
}
