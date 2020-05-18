/**
 * Defines modal for authentication
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

import {auth} from "../firebase";
import React from "react";


/**
 * Create modal header
 * @param {JSX.Element} title - Modal title
 * @returns {JSX.Element} modal header
 */
const modalHeader = (title: JSX.Element): JSX.Element => {
    return (
        <div className="modal-header">
            {title}
            <button
                type = "button"
                className = "close"
                data-dismiss = "modal"
                aria-label = "Close"
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
}


const modalFooter = (
    <div className="modal-footer">
        <button
            type = "submit"
            className = "btn btn-secondary"
            // data-dismiss = "modal"
        >
            Send Reset Email
        </button>
    </div>
)


const sendResetEmail = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const email = (event.target as HTMLInputElement).querySelector("input")!.value
    auth.sendPasswordResetEmail(email).then(() => {
        alert("An email has been sent")
    }).catch((err: {}) => {
        alert(`Error resetting password`)
    })
}


/**
 * Create password reset modal
 * @param {JSX.Element} title - Modal title
 * @param {JSX.Element} body - Modal body
 * @returns {JSX.Element} modal
 */
export const makeModal = (
    title: JSX.Element = <h5></h5>,
    body: JSX.Element = <div className="modal-body"></div>,
) => {
    return (
        <div className="modal fade" id="reset-modal" tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    {modalHeader(title)}
                    <form onSubmit={sendResetEmail}>
                        {body}
                        {modalFooter}
                    </form>
                </div>
            </div>
        </div>
    );
}
