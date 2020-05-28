/**
 * Partial which defines forms components for authentication
 */

/* eslint-disable one-var */

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
 * This program is distributed in the hope that it will be usefu
 * but WITHOUT ANY WARRANTY; without even the implied warranty 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public Licence
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

/* eslint-disable @typescript-eslint/semi */
import {Login, Reg} from "./_Forms";
import {Link} from "react-router-dom";
import React from "react";
import {signInWithGoogle} from "../firebase";
/* eslint-enable @typescript-eslint/semi */


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
    private _buttonState = (
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
    public render = (): JSX.Element => (
        <div className="google-sign-in">
            <img
                alt = "google-sign-in"
                src = "../pictures/btn_google_signin_dark_normal_web.png"
                onMouseEnter = {(event): void => {
                    this._buttonState("focus", event)
                }}
                onMouseLeave = {(event): void => {
                    this._buttonState("normal", event)
                }}
                onClick = {signInWithGoogle}
            />
        </div>
    )

}


/**
 * Creates a button for authentication.
 * @param {"Register" | "Login"} type - "login" or "register"
 * @returns {JSX.Element} regristration or login button
 */
export const makeButton = (type: "Register" | "Login"): JSX.Element => (
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
)


/**
 * Creates a form field for authentication.
 * @param {Login | Reg} self - bind with this
 * @param {"reg" | "login"} type  - "reg" or "login" email feild
 * @returns {JSX.Element} regristration or login email field
 */
export const makeEmailField = (
    self: Login | Reg,
    type: "reg" | "login"
): JSX.Element => (
    <label>
        Email
        <input
            type = "email"
            name = "email"
            className = "form-control"
            id = {`${type}-email`}
            aria-describedby = "emailHelp"
            placeholder = "Enter email"
            onChange = {(event): void => {
                self.onChange(event)
            }}
            value = {
                typeof(self.state.email) === "string"
                    ? self.state.email
                    : ""
            }
        />

        <small
            id = "emailHelp"
            className = "form-text text-muted"
        >
                We&apos;ll never share your email with anyone else.
        </small>
    </label>
)

/**
 * Creates a form field for authentication.
 * @param {Login | Reg} self - bind with this
 * @param {"reg" | "login"} type  - "reg" or "login" email feild
 * @returns {JSX.Element} regristration or login email field
 */
export const makePasswordField = (
    self: Login | Reg,
    type: "reg" | "login"
): JSX.Element => (
    <label>
        Password
        <input
            type = "password"
            name = "password"
            className = "form-control"
            id = {`${type}-password`}
            placeholder = "Password"
            onChange = {(event): void => {
                self.onChange(event)
            }}
            value = {
                typeof(self.state.password) === "string"
                    ? self.state.password
                    : ""
            }
        />
    </label>
)

/**
 * Makes a name field
 * @param {Reg} self bind to this
 * @returns {JSX.Element} name field
 */
export const makeNameField = (self: Reg): JSX.Element => (
    <label>
        Full, legal name
        <input
            type = "text"
            name = "displayName"
            className = "form-control"
            id = "reg-name"
            aria-describedby = "emailHelp"
            placeholder = "Full, legal name"
            onChange = {(event): void => {
                self.onChange(event)
            }}
            value = {
                typeof(self.state.displayName) === "string"
                    ? self.state.displayName
                    : ""
            }
        />
    </label>
)

/**
 * Create confirm password field
 * @param {Reg} self - bind to this
 * @returns {JSX.Element} confirm password field
 */
export const makePasswordField2 = (self: Reg): JSX.Element => (
    <label>
        Confirm your Password
        <input
            type = "password"
            name = "password2"
            className = "form-control"
            id = "reg-password-2"
            placeholder = "Retype password"
            onChange = {(event): void => {
                self.onChange(event)
            }}
            value = {
                typeof(self.state.password2) === "string"
                    ? self.state.password2
                    : ""
            }
        />
    </label>
)


/**
 * Creates checks for privacy policy and 
 * @param {Array.<Array.<string>>} checkTypes array with terms and conditions and privacy policy
 * @param {Reg} self bind to this
 * @returns {Array.<JSX.Element>} array of agreement checks
 */
const makeAgreementChecks = (
    checkTypes: string[][], self: Reg
): JSX.Element[] => {
    const output = []

    for (const type of checkTypes) {
        output.push(
            <label id={type[0]}>I have read, and agree to the
                <Link to={`/${type[1]}`}>{type[3]}</Link>
                <input
                    type = "checkbox"
                    className = "form-check-input"
                    id = {`${type[0]}-check`}
                    name = {`agreement${type[2]}`}
                    onChange = {(event): void => {
                        self.onChange(event)
                    }} 
                ></input>
            </label>
        )
    }

    return output
}

/**
 * Create agree to terms and conditions and privacy policy field
 * @param {Reg} self - bind to this
 * @returns {JSX.Element} terms and conditions and priv policy field
 */
export const makeAgreementField = (self: Reg): JSX.Element => {
    const checkTypes = [
            ["tandc", "Legal", "1", " Terms and Conditions "],
            ["ppolicy", "Privacy-policy", "2", " Privacy Policy "],
        ],
        agreementField = makeAgreementChecks(checkTypes, self),
        agreementHeader = (
            <p>By signing up, you agree to our
                <Link to="/Legal">Terms and Conditions </Link>
                and
                <Link to="/Privacy-policy"> Privacy Policy </Link>
            </p>
        )

    
    return (
        <div className="form-group">
            {agreementHeader}{agreementField[0]}{agreementField[1]}
        </div>
    )
}
