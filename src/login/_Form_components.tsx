/**
 * Partial which defines forms components for authentication
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

/**
 * Google sign in button
 */
class GoogleSignInButton extends React.Component {

    /**
     * Updates button on hover
     * @param {string} state - current state of button
     * @param {React.MouseEvent<HTMLImageElement, MouseEvent>} event - event
     * @returns {void} voic
     */
    private buttonState = (
        state: string,
        event: React.MouseEvent<HTMLImageElement, MouseEvent>,
    ): void => {
        (event.target as HTMLInputElement).setAttribute(
            "src",
            `../pictures/btn_google_signin_dark_${state}_web.png`,
        )
    }

    /**
     * Renders Google sign in button
     * @returns {JSX.Element} Google sign in button
     */
    public render = (): JSX.Element => {
        return (
            <div className="google-sign-in">
                <img
                    alt = "google-sign-in"
                    src = "../pictures/btn_google_signin_dark_normal_web.png"
                    onMouseEnter = {(event) => {
                        this.buttonState("focus", event)
                    }}
                    onMouseLeave = {(event) => {
                        this.buttonState("normal", event)
                    }}
                />
            </div>
        );
    }

}


/**
 * Creates a button for authentication.
 * @param {"Register" | "Login"} type - "login" or "register"
 * @returns {JSX.Element} regristration or login button
 */
export const makeButton = (type: "Register" | "Login"): JSX.Element => {
    return (
        <div className="row">
            <div className="col-6">
                <button type="submit" className="btn btn-secondary">
                    {type}
                </button>
            </div>
            <div className="col-6">
                <GoogleSignInButton/>
            </div>
        </div>
    );
}


/**
 * Creates a form field for authentication.
 * @param {"reg" | "login"} type  - "reg" or "login" email feild
 * @returns {JSX.Element} regristration or login email field
 */
/* eslint-disable one-var */
export const makeEmailField = (type: "reg" | "login"): JSX.Element => {
    /* eslint-enable one-var */
    return (
        <label>
            Email
            <input
                type = "email"
                className = "form-control"
                id = {`login-${type}`}
                aria-describedby = "emailHelp"
                placeholder = "Enter email"
            />

            <small
                id = "emailHelp"
                className = "form-text text-muted"
            >
                    We&apos;ll never share your email with anyone else.
            </small>
        </label>
    );
}
