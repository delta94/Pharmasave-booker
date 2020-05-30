/**
 * Define global constants for easy changing later
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
/* eslint-disable no-magic-numbers */

export const hours: {[key: number]: null | number[]} = { // Business hours
    0: null, // Sunday to Saturday
    1: [9, 18], // 24 hour time
    2: [9, 20],
    3: [9, 18],
    4: [9, 20],
    5: [9, 18],
    6: [9, 15],
}

const globals = {
    hours,
}

Object.freeze(globals)

export default globals
