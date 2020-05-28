/**
 * Defines component for authentication
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
/* eslint-disable @typescript-eslint/semi */
import {Login, Reg} from "./_Forms";
import React from "react";
import {makeModal} from "./_Reset_modal";
/* eslint-enable @typescript-eslint/semi */


export default class Auth extends React.Component<{}, {[key: string]: string}> {

    public constructor (props: {}) {
        super(props)
        this.state = {
            loginButton: "none",
            regButton: "block",
            current: "Login"
        }
    }

    private _regRef = React.createRef<Reg>()

    private _loginRef = React.createRef<Login>()

    private _switchLogin = (): JSX.Element => (
        <div id="switch-login" style={{display: this.state.loginButton}}>
            <p>Already have an account?</p>
            <button
                className = "btn btn-primary"
                onClick = {(): void => {
                    this._regRef!.current!.setState({display: "none"})
                    this._loginRef!.current!.setState({display: "block"})
                    this.setState({
                        loginButton: "none",
                        regButton: "block",
                        current: "Login"
                    })
                }}
            >Login</button>
        </div>
    )

    private _switchReg = (): JSX.Element => (
        <div id="switch-reg" style={{display: this.state.regButton}}>
            <p>Don&apos;t have an account?</p>
            <button
                className = "btn btn-primary"
                onClick = {(): void => {
                    this._regRef!.current!.setState({display: "block"})
                    this._loginRef!.current!.setState({display: "none"})
                    this.setState({
                        loginButton: "block",
                        regButton: "none",
                        current: "Register"
                    })
                }}
            >Register</button>
        </div>
    )

    private _switchButtons = (): JSX.Element => (
        <div id="switch-btns">
            {this._switchLogin()}
            {this._switchReg()}
        </div>
    )

    public render = (): JSX.Element => (
        <div className="auth-container container">
            {this._switchButtons()}
            {makeModal(
                <h5>Reset your Password</h5>,
                <label>
                    Email
                    <input
                        type = "email"
                        name = "email"
                        className = "form-control"
                        id = "reset-email"
                        aria-describedby = "emailHelp"
                        placeholder = "Enter email"
                    />
                </label>,
            )}
            <div className="back-container"></div>
            <div
                className = {
                    `form-container ${this.state.current}-container`
                }
            >
                <h1 className="container">{this.state.current}</h1>
                <Login ref={this._loginRef}/>
                <Reg ref={this._regRef}/>
            </div>
        </div>
    )

}
