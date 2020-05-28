/**
 * Defines the custom date class
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
 * but WITHOUT ANY WARRANTY without even the implied warranty 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See t
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public Licen
 * 
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


export default class CustomDate extends Date {

    /**
     * Formats date
     * @param {string} year - year
     * @param {string} month - month
     * @param {string} day - day
     * @param {string} seperator - char to seperate date with
     * @returns {string} formatted date
     */
    private static _calcDate = (
        year: string,
        month: string,
        day: string,
        seperator: string,
    ): string => {
        let newMonth = month,
            newDay = day

        if (newMonth.length < 2) {
            newMonth = '0' + month
        }
        if (newDay.length < 2) {
            newDay = '0' + day
        }
    
        return [year, newMonth, newDay].join(seperator)
    }

    /**
     * Format date in the form yyyy mm dd
     * @param {Date | CustomDate} date - date to format
     * @param {string} seperator - char to seperate date with
     * @returns {string} formatted date
     */
    public static formatDate = (date: Date | CustomDate, seperator: string = "/"): string => {
        let d = new Date(date),
            month = (d.getMonth() + 1).toString(),
            day = d.getDate().toString(),
            year = d.getFullYear().toString()
    
        return CustomDate._calcDate(year, month, day, seperator)
    }

     /**
     * Format date in the form yyyy mm dd
     * @param {string} seperator - char to seperate date with
     * @returns {string} formatted date
     */
    public formatDate = (seperator: string = "/"): string => {
        let year = this.getFullYear().toString(),
            month = this.getMonth().toString(),
            day = this.getDate.toString()
    
        return CustomDate._calcDate(year, month, day, seperator)
    }

}
