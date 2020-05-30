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
import React from "react";
/* eslint-enable @typescript-eslint/semi */


export default class Agenda extends React.Component
    <{}, {[key: string]: string}> {

    public constructor (props: {}) {
        super(props)
        this.state = {
            selected: ""
        }
    }

    /**
     * Formats selected day
     * @returns {string} selected day
     */
    private _selectedDay = (): string => {
        const days = this.state?.selected.split("/")

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
     * Changes selected day of agenda
     * @param {string} day - day to change to
     * @returns {void} void
     */
    public changeDay = (day: string): void => {
        const test = this.setState({selected: day})

        Promise.resolve(test).then(() => {
            console.log("AGENDA", this.state?.selected)
        })
    }

    public render = (): JSX.Element => (
        <div className="container" id="agenda">
            <h1>{this._selectedDay()}</h1>
        </div>
    )

}
