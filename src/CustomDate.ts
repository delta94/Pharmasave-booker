/**
 * Defines the custom date class
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


export default class CustomDate extends Date {

    /**
     * Format date in the form yyyy mm dd
     * @param {Date | CustomDate} date - date to format
     * @param {string} seperator - char to seperate date with
     * @returns {string} formatted date
     */
    public static formatDate = (
        date: Date | CustomDate,
        seperator: string = "/"
    ): string => {
        
        const newDate = new Date(date),
            month = (newDate.getMonth() + 1).toString(),
            day = newDate.getDate().toString(),
            year = newDate.getFullYear().toString()
    
        return [year, month, day].join(seperator)
    }

    /**
     * Format date in the form yyyy mm dd
     * @param {string} seperator - char to seperate date with
     * @returns {string} formatted date
     */
    public formatDate = (seperator: string = "/"): string => {
        const year = this.getFullYear().toString(),
            month = this.getMonth().toString(),
            day = this.getDate().toString()
    
        return [year, month, day].join(seperator)
    }

}
