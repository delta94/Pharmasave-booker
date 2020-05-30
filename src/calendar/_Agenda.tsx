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
import CustomDate from "../CustomDate"
import {hours} from "../globals"
import React from "react";
/* eslint-enable @typescript-eslint/semi */


export default class Agenda extends React.Component
    <{}, {[key: string]: string | number | Date}> {

    public constructor (props: {}) {
        super(props)
        this.state = {
            selected: "",
            dayOfWeek: 0,
            month: 0,
            date: new Date(),
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
     * Changes selected day of agenda
     * @param {string} day - day to change to
     * @returns {void} void
     */
    public changeDay = (day: string): void => {
        const dateData = day.split("/").map((data) => Number(data)),
            date = new Date(dateData[0], dateData[1], dateData[2])

        this.setState({
            selected: `${dateData[0]}/${Number(dateData[1])+1}/${dateData[2]}`,
            dayOfWeek: date.getDay(),
            month: date.getMonth(),
            date,
        })
    }

    public render = (): JSX.Element => (
        <div id="agenda">
            <p className="text-center">
                {/* eslint-disable-next-line */}
                {`${CustomDate.getWordDay(this.state.dayOfWeek as number)} ${CustomDate.getWordMonth(this.state.month as number)} ${(this.state.date as Date).getDate()}, ${(this.state.date as Date).getFullYear()}`}
            </p>
            <hr className="clearfix w-100 d-md-none pb-3"/>
        </div>
    )

}
