/**
 * Partial which defines forms for authentication
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

import {
    makeAgreementField,
    makeButton, 
    makeEmailField,
    makeNameField,
    makePasswordField,
    makePasswordField2,
} from "./_Form_components";
import React from "react";

/**
 * Login form
 */
class Login extends React.Component<{}, {[key: string]: string | null}> {

    constructor (props: {}) {
        super(props)
        this.state = {
            display: "block",
            email: "",
            password: "",
            error: null,
        }
    }

    /**
     * Sign a user in with email and password
     * @param {React.FormEvent<HTMLInputElement>} event - submit event
     * @param {string} email - email of user
     * @param {string} password - password of user
     * @returns {void} void
     */
    private signInWithEmailAndPassword = (
        event: React.FormEvent<HTMLInputElement>,
        email: string,
        password: string,
    ): void => {
        event.preventDefault()
    }

    /**
     * On form change
     * @param {React.FormEvent<HTMLInputElement>} event - submit event
     * @returns {void} void
     */
    public onChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const {name, value} = event.currentTarget;

        if (name === "userEmail") {
            this.setState({email: value})
        } else if (name === "userPassword") {
            this.setState({password: value})
        }
    }

    /**
     * Render login form
     * @returns {JSX.Element} login form
     */
    public render = (): JSX.Element => {
        return (
            <form style={
                this.state.display ? {display: this.state.display} : {}
            }>
                <div className="form-group">
                    {makeEmailField(this, "login")}
                </div>
                <div className="form-group">
                    {makePasswordField(this, "login")}
                </div>
                <a href="#!">Forgot your password?</a>
                {makeButton("Login")}
            </form>
        );
    }

}


/**
 * Registration form
 */
class Reg extends React.Component<{}, {[key: string]: string}> {

    constructor (props: {}) {
        super(props)
        this.state = {
            display: "none"
        }
    }

    /**
     * Sign a user in with email and password
     * @param {React.FormEvent<HTMLInputElement>} event - submit event
     * @param {string} email - email of user
     * @param {string} password - password of user
     * @returns {void} void
     */
    private signUpWithEmailAndPassword = (
        event: React.FormEvent<HTMLInputElement>,
        email: string,
        password: string,
    ): void => {
        event.preventDefault()
    }

    /**
     * On form change
     * @param {React.FormEvent<HTMLInputElement>} event - submit event
     * @returns {void} void
     */
    public onChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const {name, value} = event.currentTarget;

        if (name === "userEmail") {
            this.setState({email: value})
        } else if (name === "userPassword") {
            this.setState({password: value})
        }
    }

    /**
     * Render resitration form
     * @returns {JSX.Element} login form
     */
    public render = (): JSX.Element => {
        return (
            <form style={{display: this.state.display}}>
                <div className="form-group">
                    {makeNameField(this)}
                </div>
                <div className="form-group">
                    {makeEmailField(this, "reg")}
                </div>
                <div className="form-group">
                    {makePasswordField(this, "reg")}
                </div>
                <div className="form-group">
                    {makePasswordField2(this)}
                </div>
                {makeAgreementField(this)}
                {makeButton("Register")}
            </form>
        );
    }

}

export {
    Reg,
    Login,
};
