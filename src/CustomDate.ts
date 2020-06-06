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

    private static _daysReference: {[key: number]: string} = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
    }

    private static _monthsReference: {[key: number]: string} = {
        0: "January",
        1: "Feburary",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December",
    }

    private static _halfwayPoint = 12

    /**
     * Format date in the form yyyy mm dd
     * @param {Date | CustomDate} date - date to format
     * @param {string} seperator - char to seperate date with
     * @returns {string} formatted date
     */
    public static formatDate = (
        date: Date | CustomDate,
        seperator = "/"
    ): string => {
        
        const newDate = new Date(date),
            month = (newDate.getMonth() + 1).toString(),
            day = newDate.getDate().toString(),
            year = newDate.getFullYear().toString()
    
        return [year, month, day].join(seperator)
    }

    /**
     * Converts numerical day of week into string form (e.g "Monday")
     * @param {number} numerical - numerical day of week, 0 indexed (0-6)
     * @returns {string} stringed day of week
     */
    public static getWordDay = (
        numerical: number
    ): string => CustomDate._daysReference[numerical]

    /**
     * Converts numerical month into string form (e.g "January")
     * @param {number} numerical - numerical day of week, 0 indexed (0-11)
     * @returns {string} stringed worded month
     */
    public static getWordMonth = (
        numerical: number
    ): string => CustomDate._monthsReference[numerical]

    /**
     * Add's 0s to the dates
     * @param {string} date - date to format
     * @param {string} seperator - char the date is seperatred by
     * @returns {string} - date with zeros
     */
    public static addZeros = (date: string, seperator: string = "/"): string => {
        let newDate = `${date.split(seperator)[0]}${seperator}`

        if (date.split(seperator)[1].length < 2) {
            newDate += `0${date.split(seperator)[1]}${seperator}`
        } else {
            newDate += `${date.split(seperator)[1]}${seperator}`
        }

        if (date.split(seperator)[2].length < 2) {
            newDate += `0${date.split(seperator)[2]}`
        } else {
            newDate += date.split(seperator)[2]
        }

        return newDate
    }

    /**
     * Converts 12 hours time to 24 hour time
     * @param {string} time - time to convert
     * @returns {string} converted time
     */
    public static to24Hour = (time: string): string => {
        const isafternoon = time.includes("Pm")

        let newTime = time.replace(/Noon/gu, "")
            .replace(/Pm/gu, "")
            .replace(/Am/gu, "")
            .replace(/ /gu, "")

        if (isafternoon && newTime.split(":")[0] !== "12") {
            newTime = 
                `${Number(newTime.split(":")[0]) + CustomDate._halfwayPoint}:${newTime.split(":")[1]}`
        }

        return newTime
    }

    /**
     * Offset for zero indexed month
     * @param {string} date - date to format
     * @param {string} seperator - char the date is seperated by
     * @returns {string} - date with zeros
     */
    public static offsetZero = (
        date: string,
        seperator: string = "/",
    ): string => {
        // eslint-ignore-next-line
        const [year, month, day] = date.split(seperator),
            newDate = `${year}${seperator}${Number(month) + 1}${seperator}${day}`
        
        return newDate
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

    /**
     * Converts numerical day of week into string form (e.g "Monday")
     * @param {number} numerical - numerical day of week, 0 indexed (0-6)
     * @returns {string} stringed day of week
     */
    public getWordDay = (): string => CustomDate._daysReference[this.getDay()]

    /**
     * Converts numerical month into string form (e.g "January")
     * @param {number} numerical - numerical day of week, 0 indexed (0-11)
     * @returns {string} stringed worded month
     */
    public getWordMonth = (): string => (
        CustomDate._monthsReference[this.getMonth()]
    )

    /**
     * Add's 0s to the dates
     * @param {string} seperator - char the date is seperated by
     * @returns {string} - date with zeros
     */
    public addZeros = (seperator: string = "/"): string => {
        // eslint-ignore-next-line
        const date = `${this.getFullYear()}${seperator}${this.getMonth()}${seperator}${this.getDate()}`
        
        return CustomDate.addZeros(date, seperator)
    }

}
