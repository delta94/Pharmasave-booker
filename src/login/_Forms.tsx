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

/* eslint-disable @typescript-eslint/semi */
import {
    makeAgreementField,
    makeButton, 
    makeEmailField,
    makeNameField,
    makePasswordField,
    makePasswordField2
} from "./_Form_components";
import React from "react";
import {auth} from "../firebase";
import firebase from "firebase"
/* eslint-enable @typescript-eslint/semi */


/**
 * Login form
 */
class Login extends React.Component<{}, {[key: string]: string | null}> {

    public constructor (props: {}) {
        super(props)
        this.state = {
            display: "block",
            email: "",
            password: "",
            error: null,
        }
    }

    /**
     * Authentication checking
     * @returns {void} void
     */
    public componentDidMount = (): void => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                window.location.href = "/"
            }
        })
    }

    /**
     * Sign a user in with email and password
     * @param {React.FormEvent<HTMLFormElement>} event - submit event
     * @returns {void} void
     */
    private _signInWithEmailAndPassword = (
        event: React.FormEvent<HTMLFormElement>
    ): void => {
        event.preventDefault()
        auth.signInWithEmailAndPassword(
            typeof(this.state.email) === "string"
                ? this.state.email
                : "",
            typeof(this.state.password) === "string"
                ? this.state.password
                : "",
        ).catch((err: Error): void => {
            this.setState({error: "Error Signing up with email and password"})
            console.error("Error signing in with password and email", err)
            alert(`Unable to sign you in. Please try again later. ${err.message}`)
        })
    }

    /**
     * On form change
     * @param {React.FormEvent<HTMLInputElement>} event - submit event
     * @returns {void} void
     */
    public onChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const {name, value} = event.currentTarget

        switch (name) {
        case "email":
            this.setState({email: value})
            break
        case "password":
            this.setState({password: value})
            break
        default:
            break
        }
    }

    /**
     * Render login form
     * @returns {JSX.Element} login form
     */
    public render = (): JSX.Element => (
        <form style={
            this.state.display ? {display: this.state.display} : {}
        } onSubmit = {this._signInWithEmailAndPassword}
        className = "login-form">
            <div className="form-group">
                {makeEmailField(this, "login")}
            </div>
            <div className="form-group">
                {makePasswordField(this, "login")}
            </div>
            <a data-toggle="modal" data-target="#reset-modal">
                Forgot your password?
            </a>
            {makeButton("Login")}
        </form>
    )

}

/**
 * Registration form
 */
class Reg extends React.Component
    <{}, {[key: string]: string | null | boolean}> {

    public constructor (props: {}) {
        super(props)
        this.state = {
            display: "none",
            email: "",
            password: "",
            password2: "",
            displayName: "",
            agreement1: false,
            agreement2: false,
            error: null,
        }
    }

    /**
     * Verifies everything is good to go for registration
     * @returns {boolean} false if error true if success
     */
    private _verifyReg = (): boolean => {
        if (this.state.password !== this.state.password2) {
            alert("Passwords do not match")

            return false
        }

        if (!this.state.agreement1 && !this.state.agreement2) {
            /* eslint-disable-next-line */
            alert("Please make sure you have read and agree to the terms and conditions")

            return false
        }

        return true
    }

    /**
     * Sign a user in with email and password
     * @param {React.FormEvent<HTMLFormElement>} event - submit event
     * @returns {void} void
     */
    private _signUpWithEmailAndPassword = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<any> => {
        event.preventDefault()

        try {
            if (!this._verifyReg()) {
                return
            }

            const {user} = await auth.createUserWithEmailAndPassword(
                typeof(this.state.email) === "string"
                    ? this.state.email
                    : "",
                typeof(this.state.password) === "string"
                    ? this.state.password
                    : "",
            )

            await Promise.resolve(user).then((
                newUser: firebase.User | null
            ): Promise<void> | void => {

                if (newUser) {
                    return newUser.sendEmailVerification().then(() => {
                        alert(`Please verify your email at ${this.state.email}`)
                        // eslint-disable-next-line
                        window.open("/")
                    })
                        .catch((err: Error): void => {
                            throw err
                        })
                }

                return undefined
            })
        } catch (error) {
            this.setState({error: "Error Signing up with email and password"})
            alert(`Error registering you. ${(error as Error).message}`)
            console.log(error)
        }
    }

    /**
     * On form change
     * @param {React.FormEvent<HTMLInputElement>} event - submit event
     * @returns {void} void
     */
    public onChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const {name, value} = event.currentTarget

        switch (name) {
        case "displayName":
            this.setState({displayName: value})
            break
        case "email":
            this.setState({email: value})
            break
        case "password":
            this.setState({password: value})
            break
        case "password2":
            this.setState({password2: value})
            break
        case "agreement1":
            this.setState({
                agreement1: (event.target as HTMLInputElement).checked
            })
            break
        case "agreement2":
            this.setState({
                agremeent2: (event.target as HTMLInputElement).checked
            })
            break
        default: break
        }
    }

    /**
     * Render resitration form
     * @returns {JSX.Element} reg form
     */
    public render = (): JSX.Element => (
        <form style={
            typeof(this.state.display) === "string"
                ? {display: this.state.display}
                : {}
        } onSubmit = {this._signUpWithEmailAndPassword}
        className = "reg-form">
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
    )

}

export {
    Reg,
    Login,
}
