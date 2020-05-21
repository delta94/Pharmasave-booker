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

import React from "react";


class Calendar extends React.Component
    <{}, {[key: string]: string[] | string}> {

    public constructor (props: {}) {
        super(props)
        this.state = {
            days: this.days.long,
            current: `day-square-${new Date().getDate().toString()}`,
        }
    }

    private days = {
        short: ["S", "M", "T", "W", "T", "F", "S"],
        med: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
        /*eslint-disable-next-line*/
        long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    }

    /**
     * Window resize handler.
     * @returns {void} void
     */
    private onWindowResize = (): void => {
        if (window.innerWidth < 450) {
            this.setState({days: this.days.short})
        } else if (window.innerWidth < 800) {
            this.setState({days: this.days.med})
        } else {
            this.setState({days: this.days.long})
        }
    }

    /**
     * Get the start and end date of the month.
     * @returns {Date[]} [start of month, end of month]
     */
    private monthStartEnd = (): Date[] => {
        const date = new Date(), y = date.getFullYear(), m = date.getMonth(),
            firstDay = new Date(y, m, 1),
            lastDay = new Date(y, m + 1, 0)
        return [firstDay, lastDay]
    }

    /**
     * Create the calendar
     * @returns {JSX.Element} => <tbody>Calendar</tbody>
     */
    public renderCalendar = (): JSX.Element => {
        const maxAheadTime = 7,
            end = this.monthStartEnd()[1].getDate(),
            currentDate = new Date(),
            startDate = this.monthStartEnd()[0].getDay(),
            weeks: JSX.Element[][] = []
        
        let day = 1,
            offsetDay = 1,
            key = 0
        
        while (day <= end ) {
            let week: JSX.Element[] = []
            for (let i = 0; i < 7; i++) {
                if (day > end) {
                    break
                } else if (offsetDay - startDate < 1) {
                    week.push(
                        <td key={`calendar-offsetday-${offsetDay.toString()}`}/>
                    )
                    offsetDay++
                } else {
                    let cur = day
                    week.push(
                        <td
                            className = {
                                /*eslint-disable-next-line*/
                                `day-square ${this.state.current === `day-square-${day.toString()}` ? "selected" : ""}`
                            }
                            key = {`calendar-${day.toString()}`}
                            id = {`day-square-${day.toString()}`}
                            onClick = {() => {
                                this.setState({current: `day-square-${cur.toString()}`})
                            }}
                        ><div><span>{day}</span></div></td>
                    )
                    offsetDay++
                    day++
                }
            }
            weeks.push(week)
        }

        return (
            <tbody>
                {weeks.map((week) => {
                    key++
                    return React.createElement("tr", {key: `row-${key}`}, week.map((i) => i))
                })}
            </tbody>
        )
    }

    /**
     * Attatch window resize handler.
     * @returns {void} void
     */
    public componentDidMount = (): void => {
        window.addEventListener('resize', this.onWindowResize)
    }

    public render = (): JSX.Element => {
        return (
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
        );
    }
    
}

export default Calendar;
