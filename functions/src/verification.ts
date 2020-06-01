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
/* eslint-disable @typescript-eslint/semi */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
/* eslint-enable @typescript-eslint/semi */

/**
 * Verify context and token to make sure it isn't malicious
 * @param {functions.https.CallableContext} context context to be verified 
 * @returns {Promise<boolean>} if validated
 */
const verifyContext = async (context: functions.https.CallableContext): Promise<boolean> => {
    let failed = false

    if (!context.auth || !context.auth.uid) { // Check if auth even exists
        return false
    }

    await admin.auth().verifyIdToken(context.auth.uid, true) // Check if token is signed
        .then(() => {
            failed = false
        }).catch(() => {
            failed = true
        })
    
    if (failed) {
        return false
    }


    return true // Passed all checks
}

export default verifyContext
