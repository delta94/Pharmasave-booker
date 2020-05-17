/**
 * Defines component for authentication
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
import {Login, Reg} from "./_Forms";

import React from "react";

class Auth extends React.Component<{}, {[key: string]: string}> {

    constructor (props: {}) {
        super(props)
        this.state = {
            loginButton: "none",
            regButton: "block",
            current: "Login"
        }
    }

    private regRef = React.createRef<any>()

    private loginRef = React.createRef<any>()

    private switchLogin = (): JSX.Element => {
        return (
            <div id="switch-login" style={{display: this.state.loginButton}}>
                <p>Already have an account?</p>
                <button
                    className = "btn btn-primary"
                    onClick = {() => {
                        this.regRef.current.setState({display: "none"})
                        this.loginRef.current.setState({display: "block"})
                        this.setState({
                            loginButton: "none",
                            regButton: "block",
                            current: "Login"
                        })
                    }}
                >Login</button>
            </div>
        );
    }

    private switchReg = (): JSX.Element => {
        return (
            <div id="switch-reg" style={{display: this.state.regButton}}>
                <p>Don&apos;t have an account?</p>
                <button
                    className = "btn btn-primary"
                    onClick = {() => {
                        this.regRef.current.setState({display: "block"})
                        this.loginRef.current.setState({display: "none"})
                        this.setState({
                            loginButton: "block",
                            regButton: "none",
                            current: "Register"
                        })
                    }}
                >Register</button>
            </div>
        );
    }

    private switchButtons = (): JSX.Element => {
        return (
            <div id="switch-btns">
                {this.switchLogin()}
                {this.switchReg()}
            </div>
        );
    }

     /**
     * Authentication checking
     * @returns {void} void
     */
    componentDidMount = (): void => {
        auth.onAuthStateChanged((user) => {
            if (Boolean(user)) {
                window.location.href = "/";
            }
        })
    }

    public render = (): JSX.Element => {
        return (
            <div className="auth-container container">
                {this.switchButtons()}
                <div className="back-container"></div>
                <div
                    className = {
                        `form-container ${this.state.current}-container`
                    }
                >
                    <h1 className="container">{this.state.current}</h1>
                    <Login ref={this.loginRef}/>
                    <Reg ref={this.regRef}/>
                </div>
            </div>
        );
    }

}

export default Auth;
