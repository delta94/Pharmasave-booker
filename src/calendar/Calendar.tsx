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

    private daysInMonth = (year: number, month: number): number => {
        return 32 - new Date(year, month, 32).getDate()
    }

    public render = (): JSX.Element => {
        return (
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Sun</th>
                    <th scope="col">Mon</th>
                    <th scope="col">Tues</th>
                    <th scope="col">Wed</th>
                    <th scope="col">Thurs</th>
                    <th scope="col">Fri</th>
                    <th scope="col">Sat</th>
                    </tr>
                </thead>
            </table>
        );
    }
    
}

export default Calendar;
