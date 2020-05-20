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

class Calendar extends React.Component {

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
    private renderCalendar = (): JSX.Element => {
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
                    week.push(<td key={`calendar-${day.toString()}`}>{day}</td>)
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

    public render = (): JSX.Element => {
        return (
            <table className="table table-bordered">
                <thead>
                    <tr key="table-header">
                        <th className="calendar-header" scope="col">Sun</th>
                        <th className="calendar-header" scope="col">Mon</th>
                        <th className="calendar-header" scope="col">Tues</th>
                        <th className="calendar-header" scope="col">Wed</th>
                        <th className="calendar-header" scope="col">Thurs</th>
                        <th className="calendar-header" scope="col">Fri</th>
                        <th className="calendar-header" scope="col">Sat</th>
                    </tr>
                </thead>
                <this.renderCalendar/>
            </table>
        );
    }
    
}

export default Calendar;
