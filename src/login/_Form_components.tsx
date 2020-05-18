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

import {signInWithGoogle} from "../firebase";
import {Login, Reg} from "./_Forms";
import {Link} from "react-router-dom";
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
                    onClick = {signInWithGoogle}
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
 * @param {Login | Reg} self - bind with this
 * @param {"reg" | "login"} type  - "reg" or "login" email feild
 * @returns {JSX.Element} regristration or login email field
 */
export const makeEmailField = (
    self: Login | Reg,
    type: "reg" | "login"
): JSX.Element => {
    return (
        <label>
            Email
            <input
                type = "email"
                name = "email"
                className = "form-control"
                id = {`${type}-email`}
                aria-describedby = "emailHelp"
                placeholder = "Enter email"
                onChange = {(event) => {
                    self.onChange(event)
                }}
                value = {
                    typeof(self.state.email) === "string" ?
                    self.state.email : ""
                }
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

/**
 * Creates a form field for authentication.
 * @param {Login | Reg} self - bind with this
 * @param {"reg" | "login"} type  - "reg" or "login" email feild
 * @returns {JSX.Element} regristration or login email field
 */
export const makePasswordField = (
    self: Login | Reg,
    type: "reg" | "login"
): JSX.Element => {
    return (
        <label>
            Password
            <input
                type = "password"
                name = "password"
                className = "form-control"
                id = {`${type}-password`}
                placeholder = "Password"
                onChange = {(event) => {
                    self.onChange(event)
                }}
                value = {
                    typeof(self.state.password) === "string" ?
                    self.state.password : ""
                }
            />
        </label>
    );
}

/**
 * Makes a name field
 * @param {Reg} self bind to this
 * @returns {JSX.Element} name field
 */
export const makeNameField = (self: Reg): JSX.Element => {
    return (
        <label>
            Full, legal name
            <input
                type = "text"
                name = "displayName"
                className = "form-control"
                id = "reg-name"
                aria-describedby = "emailHelp"
                placeholder = "Full, legal name"
                onChange = {(event) => {
                    self.onChange(event)
                }}
                value = {
                    typeof(self.state.displayName) === "string" ?
                    self.state.displayName : ""
                }
            />
        </label>
    );
}

/**
 * Create confirm password field
 * @param {Reg} self - bind to this
 * @returns {JSX.Element} confirm password field
 */
export const makePasswordField2 = (self: Reg): JSX.Element => {
    return (
        <label>
            Confirm your Password
            <input
                type = "password"
                name = "password2"
                className = "form-control"
                id = "reg-password-2"
                placeholder = "Retype password"
                onChange = {(event) => {
                    self.onChange(event)
                }}
                value = {
                    typeof(self.state.password2) === "string" ?
                    self.state.password2 : ""
                }
            />
        </label>
    );
}

const agreementHeader = (
    <p>By signing up, you agree to our
        <Link to="/Legal">Terms and Conditions</Link>
        and
        <Link to="/Privacy-policy">Privacy Policy</Link>
    </p>
);

/**
 * Create agree to terms and conditions and privacy policy field
 * @param {Reg} self - bind to this
 * @returns {JSX.Element} terms and conditions and priv policy field
 */
export const makeAgreementField = (self: Reg): JSX.Element => {
    return (
        <div className="form-group">{agreementHeader}
            <label id="tandc">I have read, and agree to the
                <Link to="/Legal">Terms and Conditions</Link>
                <input
                    type = "checkbox"
                    className = "form-check-input"
                    id = "tandc-check"
                    name = "agreement1"
                    onChange = {(event) => {
                        self.onChange(event)
                    }} 
                ></input></label>
            <label id="ppolicy">I have read, and agree to the
                <Link to="/Privacy-policy">Privacy Policy</Link>
                <input
                    type = "checkbox"
                    className = "form-check-input"
                    id = "ppolicy-check"
                    name = "agreement2"
                    onChange = {(event) => {
                        self.onChange(event)
                    }}
                ></input></label></div>
    );
}
